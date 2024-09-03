import './App.css';
import { Routes ,Route } from 'react-router-dom';
import Home from "./components/Home"
import Postadd from './components/Postadd'
import PostEdit from './components/PostEdit'
import ListItemDetailsView from './components/ListItemDetailsView'
import Login from './components/Login'
import Register from './components/Register'
import OTPverification from './components/OTPverification'
import ProtectedRoute from './context/ProtectedRoute'


function App() {
  return (
    <div className="App">
      <Routes>
       <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/" element={<ProtectedRoute> <Home/></ProtectedRoute>}/>
        <Route path='/otp' element={<ProtectedRoute><OTPverification/></ProtectedRoute> }/>
        <Route path="/add" element={<ProtectedRoute><Postadd/></ProtectedRoute>}/>
        <Route path="/edit" element={<ProtectedRoute> <PostEdit/></ProtectedRoute> }/>
        <Route  path="/list/:id" element={<ProtectedRoute><ListItemDetailsView/></ProtectedRoute>} />  
      </Routes>
     </div>
     
  );
}

export default App;
