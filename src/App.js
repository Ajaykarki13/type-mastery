import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyles } from "./Styles/global";
import { Routes, Route } from 'react-router';
import HomePage from './Pages/HomePage';
import UserPage from './Pages/UserPage';

function App() {

  return (
    <>
<ToastContainer />
    <GlobalStyles />

    <Routes>
      <Route path='/' element={<HomePage />}  />
      <Route path='/user' element={<UserPage />}  />
      </Routes>
      
    </>
  );
}
export default App;
