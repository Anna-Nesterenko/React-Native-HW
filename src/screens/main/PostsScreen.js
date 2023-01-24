import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { Octicons, AntDesign } from "@expo/vector-icons";

import DefaultPostsScreen from "../Nested/DefaultPostsScreen";
import CommentsScreen from "../Nested/CommentsScreen";
import MapScreen from "../Nested/MapScreen";
import { authSignOutUser } from "../../redux/auth/authOperations";

const NestedScreen = createNativeStackNavigator();

export default function PostsScreen() {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

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
          title: "The Publications",
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Octicons name="sign-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => ({
          title: "The Comments",
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
          title: "Map & location",
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
}

// export default PostsScreen;
