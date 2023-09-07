// import logo from './logo.svg';
// import './App.css';
// import React from 'react';
// import axios from "axios";

// function App() {
//   const data = [{ "name": "shivam", "age": 20, "class": "12th" },
//   { "name": "Arpit Patidar", "age": 28, "class": "10th" },
//   { "name": "Ajay Patidar", "age": 22, "class": "11th" }];

//   const [apiData, setApiData] = React.useState([]);
//   const getApiData = async () => {
//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/todos/"
//     ).then((response) => response.json());

//     // update the state
//     // setUsers(response);
//   };

//   const pythonApi = async() => {
//     const config = {
//       headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMDQwOTAxLCJpYXQiOjE2OTMwNDAzMDEsImp0aSI6IjhkNGMxYmJkN2RlMDQxZjA4OTk1YzgwMmI2OTE5NjQ4IiwidXNlcl9pZCI6MX0.8KA209aQz4VdmTcf7CbMjANvuobRpWFvg2iRv9dUvYI',
//       },
//       data: {},
//       // params: {
//       //     "post_id": 1
//       // }
//   }
//     axios
//         .get("http://localhost:8000/app/home",config)
//         .then(data => console.log(data,"33333333333333333333333333"))
//         .catch(error => console.log(error));
//   }
//   React.useEffect(() => {
//     // getApiData()
//     pythonApi()
//   })
//   return (
//     <div className="App">
//       TESTING
//       {data.map((item) =>
//         <div>{item.name}</div>
//       )}
//       <button onClick={(e) => getApiData(e)}>function</button>
//     </div>
//   )

// }
// export default App;


import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from "./component/login";
import { Home } from "./component/home";
import { Navigation } from './component/navigations';
import { Logout } from './component/logout';
import SignUp from './component/signUp';
import ArticalList from './component/Articles/List';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './component/chat/Chat';
import Container from 'react-bootstrap/esm/Container';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/article" element={<ArticalList />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
export default App;