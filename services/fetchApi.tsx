import axios from "axios";
import {BASE_URL} from '@env'

export const fetchImages = async (page: number, token: string | null) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: token,
        per_page: 10,
        page,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};
