import { useEffect, useState } from "react";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure"
}


function useRequestDelay(delayTime = 1000, initialData=[]){
    const [ data, setData] = useState(initialData);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [ error, setError] = useState("");

  const delay = (ms)=> new Promise((resolve)=>setTimeout(resolve, ms))

  useEffect(()=>{
    async function delayFunc(){
      try{
        await delay(delayTime);// codes stops here and wait 2sec
        setRequestStatus(REQUEST_STATUS.SUCCESS)
        setData(data);//then add data
       } catch (e)  {
        setRequestStatus(REQUEST_STATUS.ERROR)
         setError(e);
       }
    }
   delayFunc();
  },[]); // empty array - useEffect will be called only first time of component render

function updateRecord(recordUpdated, doneCallback){
  const originalRecords = [ ...data];//for optimistic UI example
  const newRecords = data.map(function(rec){
    return rec.id === recordUpdated.id ? recordUpdated : rec;
  })

  async function delayFunction(){
    try {
      
      await delay(delayTime);
      if(doneCallback){
        doneCallback();
      }
      setData(newRecords);
      
    } catch(error){
      console.log("error thrown inside delayFunction", error)
    }
    
//for optimistic UI example
    // try {
      //setData(newRecords);
    //   await delay(delayTime);
    //   if(doneCallback){
    //     doneCallback();
    //   }
    //   
      
    // } catch(error){
    //   console.log("error thrown inside delayFunction", error)
    // if(doneCallback){
    //   doneCallback();
    // }
    //setData(originalRecords);
    // }
    
  }
  delayFunction()
}

return { data, requestStatus, error, updateRecord}
}

export default useRequestDelay;

