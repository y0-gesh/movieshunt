import { icons } from "@/constants/icons";
import { getCurrentUser, logoutUser } from "@/services/appwrite";
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

  const [userName, setUserName] = React.useState("");
  const [userMail, setUserMail] = React.useState("");

  React.useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await getCurrentUser();
        setUserName(user.name);
        setUserMail(user.email);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex mt-10">
        <View className="flex-row items-center gap-4">
          <View className="bg-blue-400 rounded-full p-5">
            <Image source={icons.person} className="size-10" tintColor="#fff" />
          </View>
          <View className="font-medium text-white">
            <Text className="text-white font-bold text-lg">{userName}</Text>
            <Text className="text-sm text-gray-400">{userMail}</Text>
          </View>
        </View>
      </View>
      {/* <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <View className="bg-amber-400 rounded-full p-5">
          <Image source={icons.person} className="size-10" tintColor="#fff" />
        </View>
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
              Sign Up{" "}
            </Link>

            <View className="flex-row gap-2">
              <Button title="Logout" onPress={handleLogout} />
            </View>
            
        </View>
      </View> */}
    </View>
  );
};

export default Profile;
