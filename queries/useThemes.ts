import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Theme } from "../models/Theme";

export const getThemes = async () => {
    const response = await axios.get(`${window.location.origin}/api/themes`);
    return response.data;
};

const useThemes = () => useQuery<Theme[]>(["themes"], () => getThemes());

export default useThemes;
