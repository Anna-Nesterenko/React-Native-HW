import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderBackButton } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";

const MainTab = createBottomTabNavigator();

export default function Home({ navigation }) {
  const logout = () => navigation.navigate("Login");

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarStyle: styles.tabBarStyle,
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
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }} onPress={logout}>
              <Octicons name="sign-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                ...styles.tabIconWrapperStyle,
                borderBottomColor: focused ? "#212121" : "#ffffff",
              }}
            >
              <Ionicons
                style={{
                  ...styles.tabIconStyle,
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
                name="grid-outline"
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "Створити публікацію",
          //   tabBarHideOnKeyboard: true,
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => navigation.navigate("Home", { screen: "Posts" })}
              backImage={() => (
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color="rgba(33,33,33,0.8)"
                />
              )}
            />
          ),
          tabBarStyle: {
            display: "none",
          },
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                ...styles.tabIconWrapperStyle,
                borderBottomColor: focused ? "#212121" : "#ffffff",
              }}
            >
              <AntDesign
                style={{
                  ...styles.tabIconStyle,
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
                name="plus"
                size={24}
                color={color}
              ></AntDesign>
            </View>
          ),
        })}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                ...styles.tabIconWrapperStyle,
                borderBottomColor: focused ? "#212121" : "#ffffff",
              }}
            >
              <Feather
                style={{
                  ...styles.tabIconStyle,
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
                name="user"
                size={24}
                color={color}
              ></Feather>
            </View>
          ),
        }}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 85,
    paddingLeft: 80,
    paddingRight: 80,
  },
  tabIconWrapperStyle: {
    position: "absolute",
    top: 9,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    paddingBottom: 20,
  },
  tabIconStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 23,
    paddingRight: 23,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
  },
});
