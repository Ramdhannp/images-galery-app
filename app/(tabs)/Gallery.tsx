import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import tw from "twrnc";
import { fetchImages } from "../../services/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import searchImages from "../../services/searchApi";
import { addBookmark, removeBookmark } from "../../Redux/slices/bookmarkSlice";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

const Gallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const numColumns = 2;
  const bookmarks = useSelector((state: RootState) => state.bookmark.bookmarks);

  useEffect(() => {
    loadImages(page);
  }, []);

  const loadImages = async (pageNumber: number) => {
    if (query) {
      try {
        const newImages = await searchImages(pageNumber, query);
        setImages((prevImages) => [...prevImages, ...newImages]);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    } else {
      const token = await AsyncStorage.getItem("token");

      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const newImages = await fetchImages(pageNumber, token);
        setImages((prevImages) => [...prevImages, ...newImages]);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  const handleSearch = () => {
    if (query) {
      setImages([]);
    } else if (query === "") {
      setImages([]);
    }
    loadImages(page);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    loadImages(page + 1);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#64748b" />;
  }

  const isBookmarked = (id: string) =>
    bookmarks.some((bookmark) => bookmark.id === id);

  const toggleBookmark = (image: any) => {
    if (isBookmarked(image.id)) {
      dispatch(removeBookmark(image.id));
    } else {
      dispatch(addBookmark(image));
    }
  };

  return (
    <View style={tw`flex-1 px-3`}>
      <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
      <View
        style={tw`flex-row flex-none bg-white items-center h-10 shadow-md mt-3 mb-3 rounded-full  border-zinc-400`}
      >
        <TouchableOpacity
          onPressIn={handleSearch}
        >
          <Ionicons
            name="search"
            size={18}
            style={tw`ml-4`}
            color={"background-color: rgb(100 116 139)"}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Search.."
          value={query}
          onChangeText={setQuery}
          style={tw`ml-2 flex-1`}
          enterKeyHint={"search"}
          inputMode="search"
          onEndEditing={handleSearch}
        />
        <TouchableOpacity
          onPressIn={() => {
            setQuery("")
          }}
          onPressOut={handleSearch}
        >
          {query ? (
            <Ionicons
              name="close-circle"
              size={18}
              style={tw`mr-4`}
              color={"#64748b"}
            />
          ) : null}
        </TouchableOpacity>
      </View>

      <FlatList
        style={tw`pt-2`}
        data={images}
        key={`${numColumns}`}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        keyboardDismissMode="interactive"
        contentInsetAdjustmentBehavior="automatic"
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={tw`flex-2 m-1 p-2 bg-white shadow-md rounded-lg`}>
            <Image
              source={{ uri: item.largeImageURL }}
              style={tw`w-full h-40 rounded-lg`}
            />
            <View style={tw`flex-2 flex-row items-center mt-2`}>
              <View style={tw`flex-2 flex-col`}>
                <View style={tw`flex-row items-center mt-2`}>
                  {item.userImageURL ? (
                    <Image
                      source={{ uri: item.userImageURL }}
                      style={tw`w-7 h-7 rounded-full mr-2`}
                    />
                  ) : (
                    <Image
                      source={require("../../assets/default-avatar.png")}
                      style={tw`w-7 h-7 rounded-full mr-2`}
                    />
                  )}
                  <Text style={tw`text-[11px] font-bold`}>{item.user}</Text>
                </View>
                <View style={tw`flex-2 flex-row mt-3 items-center`}>
                  <AntDesign name="tags" size={12} style={tw`mr-1 mt-[2px]`} />
                  <Text
                    style={tw`flex-2 text-[10px] items-center text-zinc-700`}
                  >
                    {item.tags}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => toggleBookmark(item)}>
                {isBookmarked(item.id) ? (
                  <Ionicons
                    name="bookmark"
                    size={24}
                    style={tw`text-blue-500`}
                  />
                ) : (
                  <Ionicons name="bookmark-outline" size={24} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" color="#64748b" />
          ) : (
            <ActivityIndicator size="small" color="#64748b" />
          )
        }
      />
    </View>
  );
};

export default Gallery;
