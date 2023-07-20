import React from 'react'
import { useTestMode } from '../Context/TestContext'

function UpperMenu({countDown}) {

    const {setTestTime} = useTestMode()

    const updateTime = (e)=> {
        setTestTime(Number(e.target.id))
    }


  return (
    <div className='upper-menu'>

    <div className='counter'>
     00:{countDown}s
    </div>
    <div className='modes'>
<div className='test-mode' id={15} onClick={updateTime}>15s</div>
<div className='test-mode' id={30}onClick={updateTime}>30s</div>
<div className='test-mode'id ={60}onClick={updateTime}>60s</div>
    </div>

    </div>
  )
}

export default UpperMenu