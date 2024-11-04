import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const searchImages = async (page: number, query: string) => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${token}&q=${query}`, {
      params: {
        key: token,
        per_page: 10,
        page,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error("Error ", error);
    return [];
  }
};

export default searchImages;
