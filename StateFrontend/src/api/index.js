import toast from "react-hot-toast";
import apiClient from "./axios";

const getReq = async (path) => {
  try {
    const response = await apiClient.get(path);
    return response;
  } catch (error) {
    console.log("Error getting", error);
  }
};
const postReq = async (path, data) => {
  try {
    const response = await apiClient.post(path, data);
    toast.success(response?.data?.message);
    

    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log("Error posting ", error);
  }
};

const deleteReq = async (path, id) => {
  try {
    const response = await apiClient.delete(path, id);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const putReq = async (path, data) => {
  try {
    const response = await apiClient.put(path, data);
    return response;
  } catch (error) {
    console.log("Error  puting request", error);
  }
};

export { getReq, postReq, deleteReq, putReq };
