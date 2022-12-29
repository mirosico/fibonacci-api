const {parentPort} = require("worker_threads");

parentPort.on("message", data => {
    parentPort.postMessage({num: data.num, fib: String(getFib(data.num))});
});

function getFib(n) {

   let first=BigInt(0);
   let snd=BigInt(1);
   let currentNumber;
   let countMax=Math.abs(n)+1;
   let counter=2;
   if(n==0){

      return first;
   }
   else if (n==1||n==-1){

      return snd;
   }
   while(counter<countMax)
   {
      currentNumber=first+snd;
      first=snd;
      snd=currentNumber;
      counter++;
   }
   if((n<0) && (n % 2 ==0))
   {
      return -currentNumber;
   }
   return currentNumber;
}