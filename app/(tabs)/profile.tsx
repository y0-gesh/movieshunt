import { icons } from "@/constants/icons";
import React from "react";
import { View, Text, Image } from "react-native";

const Profile = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} className="size-10" tintColor="#fff" />
        <Text className="text-gray-500 font-base">Profile</Text>
      </View>
    </View>
  );
};

export default Profile;
