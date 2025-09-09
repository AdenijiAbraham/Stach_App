// components/data.js
import { store } from "../store/store";
import axios from "axios";
import {
  loading,
  setAccounts,
  setTransactions,
} from "../store/mainSlice"; // make sure these actions exist in mainSlice

// reusable axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_LINK,
  withCredentials: true,
});

// helper to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { token };
};

// ✅ Fetch both accounts and transactions
export const getDashboardData = async () => {
  try {
    store.dispatch(loading(true));

    const [accountsRes, transactionsRes] = await Promise.all([
      api.get("account", { headers: getAuthHeaders() }),
      api.get("transaction", { headers: getAuthHeaders() }),
    ]);

    // store in Redux
    store.dispatch(setAccounts(accountsRes.data));
    store.dispatch(setTransactions(transactionsRes.data));

    store.dispatch(loading(false));

    return {
      accounts: accountsRes.data,
      transactions: transactionsRes.data,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    store.dispatch(loading(false));
    return null;
  }
};



// //components/data.js
// import { store } from "../store/store";
// import axios from "axios";

// // function to get data from the api
// export const getData = async (input) => {
//   // try {
//   //   store.dispatch(loading(true));
//   //   // only a backup data
//   //   // store.dispatch(newApiData(backupData));
//   //   // real api data
//   //   const { data } = await axios.get(
//   //     `https://api.api-ninjas.com/v1/nutrition?query=${input}`,
//   //     {
//   //       headers: {
//   //         "X-Api-Key": API_KEY,
//   //         "Content-Type": "application/json",
//   //       },
//   //     }
//   //   );
//   //   store.dispatch(loading(false));
//   //   store.dispatch(newApiData(data));
//   // } catch (error) {
//   //   console.log(error);
//   // }
// };
