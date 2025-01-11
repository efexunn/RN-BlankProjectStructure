import {
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL, useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type LoginScreenNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();
  const navigation = useNavigation<LoginScreenNavProp>();

  useEffect(() => {
    const testCall = async () => {
      const result = await axios.get(`${API_URL}/users`);
      console.log(`test call for users get API result is : ${result}`);
    };
    testCall();
  }, []);

  async function login() {
    const result = await onLogin!(email, password);

    if (result && result.error) {
      alert(result.msg);
    }
    //navigation.navigate("Deneme");
  }

  async function register() {
    const result = await onRegister!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inner}>
          <Text style={styles.header}>Click the TextInput below:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            keyboardType="visible-password"
            autoCapitalize="none"
            autoComplete="off"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.login_button} onPress={login}>
            <Text style={styles.login_button_text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.login_button} onPress={register}>
            <Text style={styles.login_button_text}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 200,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "80%",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  login_button: {
    backgroundColor: "black",
    width: "80%",
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  login_button_text: {
    color: "white",
    fontSize: 16,
  },
});
