import { useState, useEffect } from "react";
import imageBg from "../../../assets/images/PhotoBG.png";
import Input from "../../components/Input";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginPage({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsShowKeyboard(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsShowKeyboard(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  const submitForm = () => {
    setState(state);
    keyboardHide();
    navigation.navigate("Home", { screen: "Posts" });
  };

  const handleInput = (type, value) => {
    setState((prevState) => ({ ...prevState, [type]: value }));
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
            <Input
              onFocus={() => setIsShowKeyboard(true)}
              value={state.email}
              onChangeText={(value) => handleInput("email", value)}
              placeholder="Введіть email"
            />
            <Input
              onFocus={() => setIsShowKeyboard(true)}
              value={state.password}
              onChangeText={(value) => handleInput("password", value)}
              placeholder="Введіть пароль"
              password
            />
            {!isShowKeyboard && (
              <>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.formBtn}
                  onPress={submitForm}
                >
                  <Text style={styles.formBtnText}>Увійти</Text>
                </TouchableOpacity>
                <View style={styles.authFooter}>
                  <Text style={styles.switchText}>Немає аккаунта? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.switchLink}>Зареєструватися</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
  authFooter: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  switchText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  switchLink: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textDecorationLine: "underline",
  },
});
