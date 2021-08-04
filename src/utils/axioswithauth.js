import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: "https://fitnesstrac-kr.herokuapp.com/api",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
};

export default axiosWithAuth;
