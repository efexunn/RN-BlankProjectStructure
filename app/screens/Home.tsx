import { Text, ScrollView, Button } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  let [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    const testCall = async () => {
      const result = await axios.get(`${API_URL}/users`);
      setData(result.data);
      console.log(`test call for users get API result is : ${result.data}`);
    };
    testCall();
  }, []);

  return (
    <ScrollView>
      <Button title="Deneme" onPress={() => navigation.navigate("Deneme")} />
      {data.map((user) => (
        <Text key={user._id}>{user._id}</Text>
      ))}
    </ScrollView>
  );
};

export default Home;
