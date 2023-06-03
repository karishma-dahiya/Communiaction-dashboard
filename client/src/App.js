import {Route,Routes} from 'react-router-dom'
import Loginpage from './views/Loginpage';
import SignupPage from './views/SignupPage';
import Manufacturer from './views/Manufacturer';
import Transporter from './views/Transporter';
import Logout from './views/Logout';


function App() {
  return (
    <Routes>
      <Route path='/' element={<SignupPage/>} />
      <Route path='/login' element={<Loginpage />} />
      <Route path='/manufacturer' element={<Manufacturer />} />
      <Route path='/transporter' element={<Transporter />} />
      <Route path='/logout' element={<Logout/>} />
    </Routes>
  );
}

export default App;
