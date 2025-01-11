import { View, Text, Button } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useNavigation } from "@react-navigation/native";

type DenemeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Deneme"
>;
const Deneme = () => {
  const navigation = useNavigation<DenemeScreenNavigationProp>();

  return (
    <View>
      <Button
        title="Go to Zeneme paicc"
        onPress={() => navigation.navigate("Zeneme")}
      />
    </View>
  );
};

export default Deneme;
