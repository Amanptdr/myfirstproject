import {useEffect, useState} from "react";
import axios from "axios";
import ArticalList from "./Articles/List";
// Define the Login function.
export const Home = () => {
  const [response, setResponse] = useState({});

  const testAPI = async () => {
    await axios.get("http://localhost:7000/app/test", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  useEffect(() => {
    testAPI();
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const { data } = await axios.get("http://localhost:7000/app/home/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          setResponse(data);
        } catch (e) {
          console.log("not auth");
        }
      })();
    }
  }, []);
  return (
    <div className="form-signin mt-5 text-center">
      <h3>
        Hi {response?.first_name} {response?.last_name}{" "}
      </h3>
      <ArticalList />
    </div>
  );
};