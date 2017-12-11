import axios from "axios";

let instance = axios.create({
  baseURL: "https://burgerbuilder-b5280.firebaseio.com/"
});

export default instance;
