import { useState, useEffect } from "react";
import imageBg from "../../../assets/images/PhotoBG.png";
import Avatar from "../../components/Avatar";
import Input from "../../components/Input";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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

export default function RegisterPage({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const dispatch = useDispatch();

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
    keyboardHide();
    dispatch(authSignUpUser(state));
    console.log("submitFormRegister", state);

    // navigation.navigate("Home", {
    //   screen: "Posts",
    //   params: {
    //     email: "nura_arh@ukr.net",
    //     password: "123456",
    //   },
    // });
  };
  const handleInput = (type, value) => {
    setState((prevState) => ({ ...prevState, [type]: value }));
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
              <Input
                onFocus={() => setIsShowKeyboard(true)}
                value={state.name}
                onChangeText={(value) => handleInput("name", value)}
                placeholder="Введіть iм'я"
              />
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
                    <Text style={styles.formBtnText}>Зареєструватися</Text>
                  </TouchableOpacity>

                  <View style={styles.authFooter}>
                    <Text style={styles.switchText}>Вже є аккаунт? </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text style={styles.switchLink}>Увійти</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
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
