import axios from "axios";
import { CSGOFLOAT_API_KEY } from "@/utilities/config";
import { BASE_CS_FLOAT } from "@/utilities/api-path";

axios.interceptors.request.use(
  (req: any) => {
    req.headers["Content-Type"] = "application/json";
    if (req.url.includes(BASE_CS_FLOAT)) {
      req.headers["Authorization"] = CSGOFLOAT_API_KEY;
    }
    // if (req.method.toLowerCase() === "get") {
    //   req.url = req.url.concat(
    //     `?key=${config.api_key}&steamids=${config.steam_id}`
    //   );
    // }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res;
  },
  (error) => {
    console.log(`${error.response.status} ${error.response.statusText}`);
    return Promise.reject(error);
  }
);

export class API {
  constructor() {}

  post = (url: string, data: any) => {
    return axios.post(url, data);
  };

  get = (url: string) => {
    return axios.get(url, { withCredentials: true });
  };
}
