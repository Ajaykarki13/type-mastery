

import {Box,Button,TextField} from '@mui/material'
import React,{useState} from 'react'
import { auth } from '../firebaseConfig';
import {toast} from 'react-toastify' ;



const SignupForm = ({handleClose}) => {

    const[email,setEmail] = useState('') ;
    const[password,setPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')

        const handleSubmit = () => {
            if(!email || !password || !confirmPassword) 
                {
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
              else if(password !== confirmPassword){
                    toast.warning('🦄 Invalid Password!', {
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

                //////  firebase authentication

                auth.createUserWithEmailAndPassword(email,password).then((res)=>{
                    toast('🦄 Wow Signed Up !', {
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
                }).catch((err)=>toast.error('🦄 Invalid credentials!', {
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

<Box p={4}  style={{display:'flex', flexDirection:'column', gap:'20',
border:'2px solid white'}}>

    <TextField sx={{
        "& .MuiInputBase-root": {
            color: 'white'
        }
    }}
     autoFocus='true' color='warning' variant='standard' type='email' label='Enter Email' 
    onChange={(e)=>setEmail(e.target.value)}/>
    <br/>

    <TextField sx={{
        "& .MuiInputBase-root": {
            color: 'white'
        }
    }}   color='warning' variant='standard' type='password' label='Enter Password'
    onChange={(e)=>setPassword(e.target.value)} />
    <br/>

    <TextField sx={{
        "& .MuiInputBase-root": {
            color: 'white'
        }
    }}    color='warning' variant='standard' type='password' label='Enter Confirm Password'
    onChange={(e)=>setConfirmPassword(e.target.value)} />
        <br/>

    <Button  color='warning' variant='contained' type='submit' size='large'
    onClick={handleSubmit}
    >
        Signup</Button>
</Box>

  )
}

export default SignupForm