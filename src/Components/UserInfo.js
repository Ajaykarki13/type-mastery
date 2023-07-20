
import { AccountCircleOutlined } from '@mui/icons-material'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'

const UserInfo = ({totalTestsTaken}) => {
    const [user] = useAuthState(auth)

  return (
    <div className='user-profile' >
        <div className='user'>
            <div className='picture'>
                <AccountCircleOutlined style={{transform:'scale(2)'}}/>
            </div>
            <div className='info'>
                <div className='email'> {user.email}</div>
                <div className='joined-at'>Joined : {user.metadata.creationTime}</div>
                <div className='total-tests'>
    <span>Total Test Taken : {totalTestsTaken}</span>
</div>
            </div>
        </div>

    </div>
  )
}

export default UserInfo