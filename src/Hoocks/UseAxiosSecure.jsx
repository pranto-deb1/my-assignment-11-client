import axios from "axios";
import React, { useEffect } from "react";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const UseAxiosSecure = () => {
  const { user, logOut, loading } = UseAuth();

  useEffect(() => {
    if (loading || !user?.accessToken) return;
    // console.log(user.accessToken);
    const requestInterseptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
      }
    );

    const resInterseptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {});
        }

        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(requestInterseptor);
      axiosSecure.interceptors.response.eject(resInterseptor);
    };
  }, [user, logOut, loading]);

  return axiosSecure;
};

export default UseAxiosSecure;
