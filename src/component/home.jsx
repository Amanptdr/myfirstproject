import {useEffect, useState} from "react";
import axios from "axios";
// Define the Login function.
export const Home = () => {
     const [message, setMessage] = useState('');

     const testAPI = async () => {
       await axios.get("http://localhost:8000/app/test", {
         headers: {
           "Content-Type": "application/json",
         },
       });
     };
     useEffect(() => {
       if (localStorage.getItem("access_token") === null) {
         testAPI();
         //  window.location.href = "/login";
       } else {
         (async () => {
           try {
             const { data } = await axios.get("http://localhost:8000/home/", {
               headers: {
                 "Content-Type": "application/json",
               },
             });
             setMessage(data.message);
           } catch (e) {
             console.log("not auth");
           }
         })();
       }
     }, []);
     return (

      <div className="form-signin mt-5 text-center">
      <h3>Hi {message}</h3>
    </div>
     )
}