import axios from "axios";
const instance = axios.create({
  baseURL: "https://react-my-burger-f5c6a.firebaseio.com/"
});
export default instance;
