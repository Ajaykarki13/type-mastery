

import React, {useState} from 'react' ;
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import Modal from '@mui/material/Modal';
import { AppBar } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import GoogleButton from 'react-google-button';
import { toast } from 'react-toastify';
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth' ;
import { auth } from '../firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth' ;
import { useNavigate } from 'react-router';


export const AccountCircle = () => {

    const [open, setOpen] = useState(false);
    const [value,setValue] = useState(0) ;

  const navigate = useNavigate();
        //get user using react-firebase hooks
    const [user] = useAuthState(auth);


    const handleOpen = () =>{
      if(user)
      {
        navigate('/user')
      }
      else{
        setOpen(true) };
      }
      
    const handleClose = () => setOpen(false);
    const handleValueChange = (e,v) => setValue(v) ;

    const handleLogout = () => { auth.signOut().then((res)=>{
      toast.success('🦄 Logout successful', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
      }
      ).catch((err)=>
      {
      toast.error('Logout Failed', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      }
      )
    
    
    }

  const googleProvider = new GoogleAuthProvider();

    const handleGoogle = () => {
      signInWithPopup(auth,googleProvider).then((res)=>{
        toast.success('🦄 Login successful', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          handleClose()
      }).catch((err)=>
      {
      toast.error('Login Failed', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      }
      )
    }

  return (
    <div>
   
<AccountCircleTwoToneIcon onClick={handleOpen} style={{transform:'scale(1.5)',marginRight:'1.5rem',cursor:'pointer' }}/>

{ user && <LogoutIcon onClick={handleLogout} style={{transform:'scale(1.5)',cursor:'pointer'}}/> }

<Modal open={open}   onClose={handleClose}
 style= {{display:'flex',justifyContent:'center',alignItems:'center'}}>

  <div style={{width:'400'}}>

    <AppBar position='static' style={{background:'transparent'}}>
<Tabs  value={value} variant='fullWidth' onChange={handleValueChange}>
    <Tab label='login' style={{color:'pink'}}></Tab>
    <Tab label='signup' style={{color:'pink'}}></Tab>
</Tabs>
    </AppBar>
    {value === 0 && <LoginForm handleClose={handleClose}/>}
    {value === 1 && <SignupForm handleClose={handleClose}/>}
    <GoogleButton  style={{width:'100%'}}
    onClick={handleGoogle} /> 

    </div>
  
</Modal>

    </div>
  )
}
