import axios from 'axios';

export const fetchInstance = () => {
  return axios.create({
    baseURL: `https://api.p2pquake.net`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};