import axios from "axios";
import { SetupInterceptors } from "./SetupInterceptors";

let apiClient = axios.create({
  baseURL: 'http://95.111.227.78:85/api'
});


SetupInterceptors(apiClient);

export default apiClient;