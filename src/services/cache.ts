import redis from 'redis';
import mongoose from "mongoose";
import util from "util";

declare module 'mongoose' {
    interface DocumentQuery<
        T,
        DocType extends import('mongoose').Document,
        QueryHelpers = {}
    > {
        mongooseCollection: {
            name: any;
        };
        cache(): DocumentQuery<T[], Document> & QueryHelpers;
        useCache: boolean;
        hashKey: string;
    }

    interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType>
        extends DocumentQuery<any, any> {}
}

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
    },
});

const exec = mongoose.Query.prototype.exec;
// @ts-ignore
redisClient.hGet = util.promisify(redisClient.hGet);
// @ts-ignore
redisClient.hSet = util.promisify(redisClient.hSet);


mongoose.Query.prototype.cache = function(options = { time: 60, key: "default" }) {
    this.useCache = true;
    this.time = options.time;
    this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);

    return this;
};

mongoose.Query.prototype.exec = async function() {
    if (!this.useCache) {
        return await exec.apply(this, arguments);
    }

    const key = JSON.stringify({
        ...this.getQuery()
    });

    const cacheValue = await redisClient.hGet(this.hashKey, key);

    if (cacheValue) {
        const doc = JSON.parse(cacheValue);

        console.log("Response from Redis");
        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    }

    const result = await exec.apply(this, arguments);
    console.log(this.time);
    redisClient.hSet(this.hashKey, key, JSON.stringify(result));
    redisClient.expire(this.hashKey, this.time);

    console.log("Response from MongoDB");
    return result;
};