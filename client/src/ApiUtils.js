import axiosInstance from "./helpers/axiosInstance";

export const getContentDetailsById = async (id) => {
    try{
      const response = await axiosInstance.get(`/content/posts/${id}`);
      console.log(response)
      return response
    } catch (err) {
      return err.response
    }
  }