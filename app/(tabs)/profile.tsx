import { icons } from "@/constants/icons";
import { logoutUser } from "@/services/appwrite";
import { Link, router } from "expo-router";
import React from "react";
import { View, Text, Image, Button, Alert } from "react-native";

const Profile = () => {


    const handleLogout = async () => {
      try {
        await logoutUser();
        router.push("/save");
        Alert.alert("Logout successfully!");
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };

  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} className="size-10" tintColor="#fff" />
        <Text className="text-gray-500 font-base">Profile</Text>
        <View className="flex-col gap-6">

            <Link
              href="/auth/login"
              className="text-white font-base text-lg bg-amber-700">
              Login{" "}
            </Link>

            <Link
              href="/auth/register"
              className="text-white font-base text-lg bg-amber-700">
              Sign In{" "}
            </Link>

            <View className="flex-row gap-2">
              <Button title="Logout" onPress={handleLogout} />
            </View>
            
        </View>
      </View>
    </View>
  );
};

export default Profile;
