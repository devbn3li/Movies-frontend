import axios from "./axios";

export const getAllMovies = async () => {
  const res = await axios.get("/movies");
  return res.data;
};
