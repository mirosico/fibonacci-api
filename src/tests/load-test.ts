import http from 'k6/http';
import {check, sleep} from 'k6';


export const options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',
    target: 100,

    thresholds: {
        http_req_duration: ['p(69)<1500'], // 69% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://host.docker.internal:3001';

export default () => {
    const randomId = Math.floor(Math.random() * 10);
    const getRes = http.get(`${BASE_URL}/output?ticket=2`);

   check(getRes, {
        'successfully': (resp) => resp.json('success') === 'true',
    });

   const randomNum = Math.floor(Math.random() * 10000);
   const postRes = http.post(`${BASE_URL}/input`, JSON.stringify({number: randomNum}));

    check(postRes, {
        'successfully': (resp) => resp.json('success') === 'true',
    });
};