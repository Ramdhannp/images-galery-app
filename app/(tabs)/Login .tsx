import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoginMutation } from "../../services/authApi";
import { setLogin } from "../../Redux/slices/authSlice";
import { Ionicons } from "@expo/vector-icons";

const Login = ({ navigation }: any) => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const onSubmit = async () => {
    if (!password || !username) {
      Alert.alert("Login Gagal", "Masukan username & password", [
        {
          text: "Cancel",
          onPress: () => ("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => ("OK Pressed") },
      ]);
    } else {
      try {
        const result = await login({ username, password }).unwrap();
        dispatch(setLogin(result.token));
        await AsyncStorage.setItem("token", result.token);
        navigation.replace("Gallery");
      } catch (err) {
        Alert.alert("Login Gagal", "Username atau Password salah", [
          {
            text: "Cancel",
            onPress: () => ("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => ("OK Pressed") },
        ]);
      }
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <StatusBar backgroundColor="#ffff" barStyle="dark-content" />

      <Text style={tw`text-xl font-bold mb-4`}>Login</Text>
      <TextInput
        style={tw`h-10 w-80% focus:outline-none border border-slate-400 bg-white shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 px-3 rounded-lg mb-4`}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <View
        style={tw`flex-row items-center h-10 w-80% focus:outline-none border border-slate-400  focus:border-sky-500 focus:ring-1 focus:ring-sky-500 px-3 rounded-lg`}
      >
        <TextInput
          style={tw`flex-1 h-10 focus:outline-none border-slate-400  focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-lg`}
          placeholder="Password"
          value={password}
          secureTextEntry={secureText}
          onChangeText={setpassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          {secureText ? (
            <Ionicons
              name="eye-off"
              size={18}
              color={"background-color: rgb(100 116 139)"}
            />
          ) : (
            <Ionicons
              name="eye"
              size={18}
              color={"background-color: rgb(100 116 139)"}
            />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onSubmit}
        style={tw`flex items-center bg-sky-400 h-10 w-80% py-2 px-4 my-5 rounded-lg shadow-lg`}
      >
        <Text style={tw`text-zinc-50 font-bold active:text-zinc-900`}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
