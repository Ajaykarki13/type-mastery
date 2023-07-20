

import React,{createRef, useState,useRef, useEffect, useMemo } from 'react';
import UpperMenu from './UpperMenu';
import { generate } from "random-words";
import { useTestMode } from '../Context/TestContext';
import Stats from './Stats';

function TypingBox() {

    const [ wordsArray, setWordsArray ] = useState(generate(50));
    

    const inputRef = useRef(0);
    const{testTime} = useTestMode();
    const[countDown,setCountDown] = useState(testTime)
const[testStart,setTestStart] =useState(false);
const[testEnd,setTestEnd] = useState(false);
const[intervalId,setIntervalId]= useState(null)

const [correctChars,setCorrectChars] = useState(0)
const[incorrectChars,setIncorrectChars] = useState(0);
const[missedChars,setMissedChars] = useState(0);
const[extraChars,setExtraChars] = useState(0);
const[correctWords,setCorrectWords] = useState(0);



    //states for indexes of word's char
    const[currWordIndex,setCurrWordIndex] = useState(0) ;
    const[currCharIndex,setCurrCharIndex] = useState(0) ;

    //making reference to every word by creating a array of same length of wordsArray

    const wordsSpanRef = useMemo(()=>{
        return Array(wordsArray.length).fill(0).map(i=>createRef(null)) 
        //createRef is a function but it's functionality is same as useRef hooks
    },[wordsArray]);
    


    ////timer function start stop
const startTimer = ()=>{
    const intervalId = setInterval(timer,1000);
   setIntervalId(intervalId)
    function timer(){
        setCountDown((LatestCountDown)=>{
            if(LatestCountDown===1){
                setTestEnd(true);
                clearInterval(intervalId);
return 0;
            }
            return LatestCountDown-1;
        });
    }
}

const resetTest = ()=>{
    clearInterval(intervalId)
    setCountDown(testTime);
    setCurrWordIndex(0);
    setCurrCharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(generate(50));
    focusInput();
    resetWordSpanRefClassname();
}
//to reset wordspan ref to rest whatever we have typed

const resetWordSpanRefClassname = () =>{
    wordsSpanRef.forEach(i=> {
        Array.from(i.current.childNodes).forEach(j=>{ //convert childnodes to array using aray.from
            j.className='';
        })  //convert nodelist to array first for the iteration
});
    wordsSpanRef[0].current.childNodes[0].className = 'current' ;
}

//////////////////////
    const handleUserInput = (e)=>{

        if(!testStart){
            startTimer();
            setTestStart(true)
        }


        //char are present in the childnodes
        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes ;

        if(e.keyCode === 32)
        {
            //get all correct characters
            let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');
            if(correctCharsInWord.length === allCurrChars.length)
            {
                setCorrectWords(correctWords+1) ;
            }

            //logic for space key
            if(allCurrChars.length<=currCharIndex){
            //remove cursor from last place in  a word
                allCurrChars[currCharIndex-1].classList.remove('current-right')
        }
        else{
            //remove cursor from in between of the word
            setMissedChars(missedChars + (allCurrChars.length -  currCharIndex)) ;
            allCurrChars[currCharIndex].classList.remove('current')


        }
            wordsSpanRef[currWordIndex+1].current.childNodes[0].className='current';
            setCurrWordIndex(currWordIndex+1);
            setCurrCharIndex(0);
            return;
        }
    //backspace logic
    if(e.keyCode === 8){
        if(currCharIndex !== 0)
        {
            if(allCurrChars.length === currCharIndex){
 
                if(allCurrChars[currCharIndex-1].className.includes('extra'))
                {
                    allCurrChars[currCharIndex-1].remove();
                      allCurrChars[currCharIndex-2].className += ' current-right'
                }
                else{
                    allCurrChars[currCharIndex-1].className = 'current'
                }

                setCurrCharIndex(currCharIndex-1) ;
                return ;
            }

            allCurrChars[currCharIndex].className = '' ;
            allCurrChars[currCharIndex-1].className= 'current' ;
            setCurrCharIndex(currCharIndex-1) ;
        }
        return;
    }
        //logic for if user is not clicking space or clicking other keywords

        if(currCharIndex === allCurrChars.length)
        {
            let newSpan = document.createElement('span');
            newSpan.innerText = e.key ;
            newSpan.className = 'incorrect extra current-right';
            allCurrChars[currCharIndex-1].classList.remove('current-right');
            wordsSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex+1);
            setExtraChars(extraChars+1) 
            return;    
        }



        if(e.key === allCurrChars[currCharIndex].innerText){
            allCurrChars[currCharIndex].className ='correct '
            setCorrectChars(correctChars+1) ;
        }
        else{
            allCurrChars[currCharIndex].className ='incorrect '
            setIncorrectChars(incorrectChars+1)
        }
        
        if(currCharIndex+1 === allCurrChars.length){      
            allCurrChars[currCharIndex].className += 'current-right'
        }
        else{
        allCurrChars[currCharIndex+1].className = 'current'
        }

        setCurrCharIndex(currCharIndex+1)
    }
////////////////// test speed coorect words
const calculateWPM = () => {
    return Math.round((correctChars/5)/(testTime/60))
}
/// accuracy

const calculateAcc = () => {
    return Math.round((correctWords/currWordIndex)*100)
}
//////
    const focusInput =()=>{ 
        inputRef.current.focus();
    }
//whenever test time changes this useeffect will run
    useEffect(()=>{
resetTest()   ; 
// eslint-disable-next-line react-hooks/exhaustive-deps
},[testTime])
//////////////
    useEffect(()=>{
        focusInput();
        wordsSpanRef[0].current.childNodes[0].className = 'current';
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]) 
////////////
  return (
    <div>
                    <UpperMenu countDown={countDown}/>

        {(testEnd)?(
             <Stats  
        wpm={calculateWPM()}
         accuracy={calculateAcc()}
         correctChars = {correctChars}
         incorrectChars = {incorrectChars}
         missedChars = {missedChars}
         extraChars = {extraChars}
         />
          ):(
            <>
        <div className='type-box' onClick={focusInput}>
            <div className='words'>
                {
                    wordsArray.map((word,index)=>(
                        <span className='word' ref = {wordsSpanRef[index]}>
                            {word.split('').map(char=>(
                                <span >{char}</span>
                            ))}
                        </span>
                    ))
                }
            </div>
        </div>
        </>
  )}
        <input
        type='text'
        onKeyDown={handleUserInput}
        className='hidden-input'
        ref={inputRef}
        />
    </div>
  )
}

export default TypingBox
