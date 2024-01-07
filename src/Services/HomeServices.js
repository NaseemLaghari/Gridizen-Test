import React , { useState } from "react";
import axios from 'axios';


export const getPosts = (signal) => {
    const API = "https://jsonplaceholder.typicode.com/";
    // const cancelToken = signal ? signal.token : undefined;

    return new Promise((resolve, reject) => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`, {
            // headers: {
            //     'Accept': 'application/json'
            // },
            // cancelToken: cancelToken,
        })
        .then((success) => {
            console.log("🚀 ~ file: HomeServices.js:14 ~ .then ~ success:", success);
            resolve({
                status: success.status,
                data: success.data
            });
        })
        .catch((error) => {
            if (axios.isCancel(error)) {
                return;
            }

            if (error.response) {
                switch (error.response.status) {
                    case 0:
                        reject({
                            status: error.response.status,
                            message: 'Network Error: Connection Failed!',
                            url: error.config.url
                        });
                        break;
                    case 404:
                        reject({
                            status: error.response.status,
                            message: 'Not Found'
                        });
                        break;
                    case 429:
                        reject({
                            status: error.response.status,
                            message: error.response.data.message
                        });
                        break;
                    case 400:
                        reject({
                            status: error.response.status,
                            message: error.response.data.message,
                            data: error.response.data.data
                        });
                        break;
                    case 401:
                        reject({
                            status: error.response.status,
                            message: error.response.data.message
                        });
                        break;
                    case 405:
                        reject({
                            status: error.response.status,
                            message: 'Request Failed',
                            data: {
                                message: error.response.data.message,
                                url: error.response.config.url
                            }
                        });
                        break;
                    default:
                        reject({
                            status: error.response.status,
                            message: 'Unknown Error!'
                        });
                }
            } else if (error.code === 'ERR_NETWORK') {
                reject({
                    status: 0,
                    message: 'Network Error: Connection Failed!',
                    url: error.config.url
                });
            } else {
                reject({
                    status: error.message,
                    message: 'Unknown Error!'
                });
            }
        });
    });
};
