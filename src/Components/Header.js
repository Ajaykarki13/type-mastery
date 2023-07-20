
import React from 'react' ;
import { AccountCircle } from './AccountCircle';

const Header = () => {

  const handleClick = () => window.location.reload();

  return (
    <div className='header'>

<div className='logo' onClick={handleClick}>Typing Master</div>
<div className='user-icon'>
<AccountCircle/>
</div>


    </div>
  )
}

export default Header