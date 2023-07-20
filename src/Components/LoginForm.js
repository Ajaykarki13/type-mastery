
import {Box,Button,TextField} from '@mui/material'
import React,{useState} from 'react'
import { auth } from '../firebaseConfig';
import  {toast}  from 'react-toastify';

const LoginForm = ({handleClose}) => {

    const[email,setEmail] = useState('') ;
    const[password,setPassword] = useState('')

    const handleSubmit = () => {
        if(!email || !password){
            toast.warning('🦄 fill all details!', {
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

        /// firebase authentication for login

        auth.signInWithEmailAndPassword(email,password).then((res)=>{
            toast('🦄 Wow Logged in !', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                handleClose();
        }).catch((err)=>toast.error('🦄 Invalid credentials !', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
        )
    }


  return (
<Box p={6}  style={{display:'flex', flexDirection:'column', gap:'20',
border:'2px solid pink', width:'100%'}}>

    <TextField sx={{
        "& .MuiInputBase-root": {
            color: 'white'
        }
    }}
    autoFocus='true' color='warning' variant='standard' type='email'
     label='Enter Email' 
    onChange={(e)=>setEmail(e.target.value)} />

    <br/>
    <TextField sx={{
        "& .MuiInputBase-root": {
            color: 'white'
        }
    }}
    color='warning' variant='standard' type='password' label='Enter Password'
    onChange={(e)=>setPassword(e.target.value)} />

    <br/>
    <Button  onClick={handleSubmit}  color='warning' variant='contained' type='submit' size='large'>Login</Button>
</Box>

  )
}

export default LoginForm