
import React,{useEffect, useState} from 'react';
import { db,auth } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { CircularProgress } from '@mui/material';
import TableUserData from '../Components/TableUserData';
import UserInfo from '../Components/UserInfo';
import HomeButton from '../Components/HomeButton';

const UserPage = () => {

const[data,setData] = useState([]);
const [user,loading] = useAuthState(auth);
const navigate = useNavigate();

const fetchData = () => {
  const resultRef = db.collection('Results');
  const {uid} = auth.currentUser;
  let tempData = [] ;

  resultRef.where('userId','==',uid).get().then((snapshot)=>{
    snapshot.docs.forEach((doc)=>
    {
      tempData.push({...doc.data()});
    }
    )
    setData(tempData)

  })

}

useEffect(()=>{
  if(!loading){
  fetchData()
  }
  if(!loading && !user){
    navigate('/');
  }
}) ;

//loader 
if(loading){
  return <div className='center-screen'>
      <CircularProgress size={200}/>
  </div>
}

 return (
  <div>
    <HomeButton />
    <div className='canvas'> 
    <UserInfo totalTestsTaken={data.length}/>
  <TableUserData data={data}/>

</div>
</div>
  )
}

export default UserPage