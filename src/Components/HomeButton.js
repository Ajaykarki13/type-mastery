
import React from 'react'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import { useNavigate } from 'react-router';

const HomeButton = () => {
  const navigate = useNavigate()
  return (
    <div className='homebutton' style={{
     display:'flex', justifyContent:'flex-start',margin:'2rem 0 0 1.5rem'
    }}>
        <HomeTwoToneIcon style={{transform:'scale(2.5)',cursor:'pointer'}} onClick={()=> navigate('/')} />
    </div>
  )
}

export default HomeButton