import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import { Button } from "react-native";
import Deneme from "./app/screens/Deneme";
import React from "react";
import { RootStackParamList } from "./app/types/navigation";
import Zeneme from "./app/screens/Zeneme";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerRight: () => (
                  <Button onPress={onLogout} title="Sign Out" />
                ),
              }}
            ></Stack.Screen>
            <Stack.Screen name="Zeneme" component={Zeneme}></Stack.Screen>
            <Stack.Screen name="Deneme" component={Deneme}></Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
