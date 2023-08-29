import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./component/login";
import {Home} from "./component/home";
import {Navigation} from './component/navigations';
import {Logout} from './component/logout';
import SignUp from './component/signUp';
function App() {
    return (
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/signUp' element={<SignUp />} />
          <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </BrowserRouter>
    )
}
export default App;