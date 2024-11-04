import axios from "axios";

export const fetchImages = async (page: number, token: string | null) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
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
