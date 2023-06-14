
import './App.css';
import {Cartprovider} from './components/Contextreducer.js';
import Home from './components/screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Login from './components/screens/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Signup from './components/screens/Signup';
import Myorder from './components/screens/Myorder';
import ForgotPassword from './components/screens/ForgotPassword';
import PasswordReset from './components/screens/Passwordreset';

function App() {
  return (
    <Cartprovider>
    <Router>
    <div >
      <Routes>
      <Route exact path="/" element={<Home/>}/>
       <Route exact path="/login" element={<Login/>}/> 
       <Route exact path="/createuser" element={<Signup/>}/> 
       <Route exact path="/password-reset" element={<PasswordReset/>}/>
       <Route exact path="/forgotpassword/:id/:token" element={<ForgotPassword/>}/>
       <Route exact path='/myorder' element={<Myorder/>}/>
     </Routes>
    </div>
    </Router>
    </Cartprovider>
  );
}

export default App;
