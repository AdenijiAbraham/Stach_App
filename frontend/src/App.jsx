// app.js
import React, { useEffect, useState } from "react";
import Interface from "./components/Interface";
import Toast from "./components/Toast";
import "./stylesheets/App.css";
import "./stylesheets/components.css";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_LINK}account/`,
        {
          headers: {
            token: token, // Changed from Authorization to token header
          },
          withCredentials: true,
        }
      );
      if (data) {
        return true;
      }
    } catch (e) {
      console.error("API Error:", e);
      return false;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const ok = await fetchData();
      if (ok) {
        setLoaded(true);
      } else {
        setError(true);
      }
    };
    loadData();
  }, []);

  if (error) {
    return <h1>Failed to load data. Please log in again.</h1>;
  }

  if (!loaded) {
    return <h1>Please wait, the server is loading...</h1>;
  }

  return (
    <>
      <Toast />
      <Interface />
    </>
  );
};

export default App;








//app.js

// import React, { useEffect } from "react";
// import Interface from "./components/Interface";
// import Toast from "./components/Toast";
// import "./stylesheets/App.css";
// import "./stylesheets/components.css";
// import theme from "./theme";
// import axios from "axios";
// import { useTheme } from "@mui/material/styles";
// import "react-toastify/dist/ReactToastify.css";

// const App = () => {
//   const theme = useTheme();

//   const fetchData = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_LINK}account/`,
//         {
//           headers: {
//             token: token,
//           },
//           withCredentials: true, // Include credentials
//         }
//       );
//       if (data) {
//         return true;
//       }
//     } catch (e) {
//       console.log(e);
//       return false;
//     }
//   };

//   if (fetchData()) {
//     return (
//       <>
//         <Toast />
//         <Interface />
//       </>
//     );
//   }

//   return (
//     <>
//       <h1>Please wait, the server is loading</h1>
//     </>
//   );
// };

// export default App;
