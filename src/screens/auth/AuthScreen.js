import { createStackNavigator } from "@react-navigation/stack";

import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";
import HomeScreen from "../main/HomeScreen";

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegisterScreen}
        />
        {/* <AuthStack.Screen
            options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        /> */}
      </AuthStack.Navigator>
    );
  }
  return <HomeScreen></HomeScreen>;
};
