import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import { RootState } from "../../Redux/store";
import { addBookmark, removeBookmark } from "../../Redux/slices/bookmarkSlice";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const BookmarkScreen = () => {
  const bookmarks = useSelector((state: RootState) => state.bookmark.bookmarks);
  const dispatch = useDispatch();

  if (bookmarks.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Tidak ada Bookmark.</Text>
      </View>
    );
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
    <View style={tw``}>
      <FlatList
        style={tw`flex pt-2 px-3`}
        data={bookmarks}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        keyboardDismissMode="interactive"
        contentInsetAdjustmentBehavior="automatic"
        numColumns={2}
        renderItem={({ item }) => (
          <View style={tw`flex-2 m-1 p-2 bg-white shadow-md rounded-lg`}>
            <Image
              source={{ uri: item.largeImageURL }}
              style={tw`w-full h-40 rounded-lg`}
            />
            <View style={tw`flex-row items-center mt-2`}>
              <View style={tw`flex-1 flex-col`}>
                <View style={tw`flex-row flex-1 items-center mt-2`}>
                  {item.userImageURL ? (
                    <Image
                      source={{ uri: item.userImageURL }}
                      style={tw`w-7 h-7 rounded-full mr-2`}
                    />
                  ) : (
                    <Image
                      source={require("../../assets/default-avatar.png")} // Path to a local default avatar
                      style={tw`w-7 h-7 rounded-full mr-2`}
                    />
                  )}
                  <Text style={tw`text-[11px] font-bold`}>{item.user}</Text>
                </View>
                <View style={tw`flex-1 flex-row mt-3`}>
                  <AntDesign name="tags" size={12} style={tw`mr-1 mt-[2px]`} />
                  <Text
                    style={tw`flex-2 text-[10px] items-center text-zinc-700`}
                  >
                    {item.tags}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => toggleBookmark(item)}>
                <Text style={tw`text-blue-500`}>
                  {isBookmarked(item.id) ? (
                    <Ionicons name="bookmark" size={24} />
                  ) : (
                    <Ionicons name="bookmark-outline" size={24} />
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default BookmarkScreen;
