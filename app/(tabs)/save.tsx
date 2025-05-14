import { getSavedMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React from "react";
import { FlatList, Text, View } from "react-native";

const Save = () => {
  // const {
  //   data: savedMovies,
  //   loading: savedLoading,
  //   error: savedError,
  // } = useFetch(getSavedMovies);

  return (
    <View className="bg-primary flex-1 px-10">
      <Text className="text-white text-2xl font-bold">Saved Movies</Text>

      {/* <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-4" />}
        className="mb-4 mt-3"
        data={savedMovies}
        renderItem={({ item, index }) => (
          <Text className="text-white text-sm">{item.title}</Text>
        )}
        keyExtractor={(item) => item.movie_id.toString()}
      /> */}
      
    </View>
  );
};

export default Save;
