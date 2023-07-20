
import React,{useEffect} from 'react'
import { toast } from 'react-toastify';
import { auth,db } from '../firebaseConfig';
//stats after test gets over

const Stats = (
    {wpm,accuracy,correctChars,incorrectChars,missedChars,extraChars}
) => {

/// pushing data into database 
  useEffect(()=>{
    if(auth.currentUser){
      pushData();
    }
    else{
      toast.warning('🦄 Login to save results!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  })


  /// pushing data/results to database 

  const pushData = () => {
    const resultRef = db.collection('Results') ;
    //getting user id
    const {uid} = auth.currentUser ;
    resultRef.add({
      wpm:wpm, accuracy:accuracy, timeStamp: new Date(),
       characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
      userId: uid
    }).then((res)=>{
      toast.success('🦄 Results saved!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }).catch(err=>{
      toast.error('Results not saved', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    })
  }

  /// 
 

  return (
    <div className='stats-box'>
<div className='stats'>
    <div className='title'>WPM</div>
    <div className='subtitle'>{wpm}</div>
    <div className='title'>Accuracy</div>
    <div className='subtitle'>{accuracy}</div>
    <div className='title'>Characters</div>
    <div className='subtitle'>
        {`Correct: ${correctChars} `} 
        {`Incorrect: ${incorrectChars} `} 
        {`Missed: ${missedChars} `} 
        {`Extra: ${extraChars} `}
        </div>
</div>



    </div>
  )
}

export default Stats