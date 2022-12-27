import { useState } from "react";
import imageBg from "../assets/images/PhotoBG.png";
import Avatar from "../components/Avatar";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function RegisterPage({ changePage }) {
  const [state, setState] = useState(initialState);
  const [hidePassword, setHidePassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  //   const [isFocused, setIsFocused] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  const submitForm = () => {
    setState(initialState);
    keyboardHide();
  };

  const switchPage = () => {
    changePage("Login");
  };
  const handleFocus = () => {
    setIsShowKeyboard(true);
    // setIsFocused(true);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={imageBg} style={styles.image}>
          <View
            style={{
              ...styles.form,
              paddingBottom: isShowKeyboard ? 30 : 45,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <Avatar />
              <Text style={styles.pageTitle}>Реєстрація</Text>
              <TextInput
                style={{ ...styles.input }}
                //   borderColor: isFocused ? "#FF6C00" : "#E8E8E8",
                onFocus={handleFocus}
                // onBlur={() => setIsFocused(false)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, name: value }))
                }
                value={state.name}
                placeholder="Введіть iм'я"
              />
              <TextInput
                style={styles.input}
                onFocus={handleFocus}
                // onBlur={() => setIsFocused(false)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                value={state.email}
                placeholder="Введіть email"
              />
              <View>
                <TextInput
                  style={styles.input}
                  onFocus={handleFocus}
                  //   onBlur={() => setIsFocused(false)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  value={state.password}
                  secureTextEntry={hidePassword}
                  placeholder="Введіть пароль"
                />
                <TouchableOpacity
                  style={styles.showPassBtn}
                  onPress={() => setHidePassword((prevState) => !prevState)}
                >
                  <Text style={styles.switchTextPassword}>
                    {hidePassword ? "Показати" : "Сховати"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.formBtn}
                onPress={submitForm}
              >
                <Text style={styles.formBtnText}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={switchPage}>
                <Text style={styles.switchLink}>Вже є аккаунт? Увійти</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff0",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  pageTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 32,
    marginTop: 50,
    textAlign: "center",
    color: "#212121",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  formBtn: {
    marginTop: 27,
    marginBottom: 16,
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  formBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    width: "100%",
    padding: 15,
    marginBottom: 16,
  },
  showPassBtn: {
    position: "absolute",
    right: 16,
    top: "30%",
  },
  switchTextPassword: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  switchLink: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    textDecorationLine: "underline",
  },
});
