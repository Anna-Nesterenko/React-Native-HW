import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultPostsScreen from "../nested/DefaultPostsScreen";
import CommentsScreen from "../nested/CommentsScreen";
import MapScreen from "../nested/MapScreen";
import { TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const NestedScreen = createNativeStackNavigator();

const PostsScreen = ({ navigation }) => {
  const logout = () => navigation.navigate("Login");
  return (
    <NestedScreen.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#212121",
          fontFamily: "Roboto-Medium",
          fontSize: 18,
          lineHeight: 22,
          letterSpacing: 0.5,
          paddingLeft: 15,
          paddingRight: 15,
        },
      }}
    >
      <NestedScreen.Screen
        name="DefaultPost"
        component={DefaultPostsScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity onPress={logout}>
              <Octicons name="sign-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => ({
          title: "Коментарі",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33,33,33,0.8)"
              />
            </TouchableOpacity>
          ),
        })}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => ({
          title: "Мапа",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33,33,33,0.8)"
              />
            </TouchableOpacity>
          ),
        })}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
