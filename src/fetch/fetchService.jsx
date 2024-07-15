import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getProducts = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/products/`);
  return response.data;
};

export const getTopProducts = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/products/topselling`);
  return response.data;
};

export const getTopCustomers = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/api/v1/customers/topCustomers`
  );
  return response.data;
};
