import axios from "axios"; // Install if you don't have it already

import { Property } from "./types";

const api = axios.create({
  baseURL: "/api/properties", // Replace with your actual API base URL
});

// Define functions for each API operation
export const getProperties = () => api.get("/");
export const getProperty = (id: number) => api.get(`/${id}`);
export const addProperty = (property: Property) => api.post("/", property);
