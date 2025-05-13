import { icons } from "@/constants/icons";
import { getCurrentUser, logoutUser } from "@/services/appwrite";
import { Link, router } from "expo-router";
import React from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DATA = [
  {
    title: "Search",
    link: "search",
  },
  {
    title: "Saved",
    link: "save",
  },
  {
    title: "Login",
    link: "auth/login",
  },
  {
    title: "Sign Up",
    link: "auth/register",
  },
];

type ItemProps = { title: string; link: string };

const Item = ({ title, link }: ItemProps) => (
  <Link href={link} className="bg-pink-400 my-[1px] p-5 rounded-lg">
    <TouchableOpacity className="w-32 relative pl-5">
      <Text className="text-white ">{title}</Text>
    </TouchableOpacity>
  </Link>
);

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
      <ScrollView>
        <View className="flex mt-20">
          <View className="flex-row items-center gap-4">
            <View className="bg-blue-400 rounded-full p-5">
              <Image
                source={icons.person}
                className="size-8"
                tintColor="#fff"
              />
            </View>
            <View className="font-medium text-white">
              <Text className="text-white font-bold text-lg">{userName}</Text>
              <Text className="text-sm text-gray-400">{userMail}</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={DATA}
          style={{ marginTop: 50 }}
          className="flex-1 bg-light-300"
          renderItem={({ item }) => (
            <Item title={item.title} link={item.link} />
          )}
          keyExtractor={(item) => item.title}
        />

        <View className="flex flex-row gap-2">
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
