import { useState } from "react";
import imageBg from "../assets/images/PhotoBG.png";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginPage({ changePage }) {
  const [state, setState] = useState(initialState);
  const [hidePassword, setHidePassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

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
    changePage("Registration");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground source={imageBg} style={styles.image}>
        <View
          style={{
            ...styles.form,
            paddingBottom: isShowKeyboard ? 30 : 110,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <Text style={styles.pageTitle}>Вхід</Text>
            <TextInput
              style={styles.input}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
              value={state.email}
              placeholder="Введіть email"
            />
            <View>
              <TextInput
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
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
              <Text style={styles.formBtnText}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={switchPage}>
              <Text style={styles.switchLink}>
                Немає аккаунта? Зареєструватися
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
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
    textAlign: "center",
    color: "#212121",
  },
  form: {
    position: "relative",
    paddingBottom: 78,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
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
