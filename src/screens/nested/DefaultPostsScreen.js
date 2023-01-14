import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function DefaultPostsScreen({ navigation, route }) {
  //   console.log("route", route);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    route.params &&
      setPosts((prevState) => [
        ...prevState,
        { ...route.params.postData, coords: route.params.location },
      ]);
    // console.log("params", route.params);
  }, [route.params]);

  //   console.log("posts", posts);

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <TouchableOpacity
        style={styles.avatarWrapper}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Home", { screen: "Profile" })}
      >
        <View style={{ overflow: "hidden", borderRadius: 16 }}>
          <ImageBackground
            style={styles.avatar}
            source={require("../../../assets/images/defaultAvatar.jpg")}
          ></ImageBackground>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postsContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("Comments", {
                  //   postId: item.id,
                  //   photo: item.photo,
                  //   allComments: item.comments,
                })
              }
            >
              <Image source={{ uri: item.photo }} style={styles.postImage} />
            </TouchableOpacity>
            <View style={styles.postImageWrapper}>
              <Text style={styles.postImageTitle}>{item.description}</Text>
            </View>
            <View style={styles.postInfoContainer}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ ...styles.postInfoBtn, marginRight: 25 }}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("Comments", {
                      //   postId: item.id,
                      //   photo: item.photo,
                      //   allComments: item.comments,
                    })
                  }
                >
                  <FontAwesome
                    name={item.comments?.length ? "comment" : "comment-o"}
                    size={24}
                    color={item.comments?.length ? "#FF6C00" : "#BDBDBD"}
                  />
                  <Text
                    style={{
                      ...styles.postInfoText,
                      color: item.comments?.length ? "#212121" : "#BDBDBD",
                    }}
                  >
                    {item.comments?.length || 0}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.postInfoBtn}
                  activeOpacity={0.7}
                  //   onPress={() => likeUnlike(item.id)}
                >
                  <AntDesign
                    name="like2"
                    size={24}
                    color={item.likes ? "#FF6C00" : "#BDBDBD"}
                  />
                  <Text
                    style={{
                      ...styles.postInfoText,
                      color: item.likes ? "#212121" : "#BDBDBD",
                    }}
                  >
                    {item.likes || 0}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.postInfoBtn}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("Map", {
                    coords: {
                      latitude: item.coords.latitude,
                      longitude: item.coords.longitude,
                    },
                    title: item.description,
                    description: item.place,
                  })
                }
              >
                <Octicons name="location" size={24} color="#BDBDBD" />
                <Text
                  style={{
                    ...styles.postInfoText,
                    color: "#212121",
                    textDecorationLine: "underline",
                  }}
                >
                  {item.place}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    lineHeight: 22,
    paddingBottom: 11,
    textAlign: "center",
    color: "#212121",
  },
  avatarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 32,
    borderRadius: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  userInfoWrapper: {
    marginLeft: 10,
  },
  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 14,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
  },
  postsContainer: {
    marginHorizontal: 16,
  },
  postImage: {
    height: 240,
    borderRadius: 8,
    resizeMode: "cover",
  },
  postImageWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  postImageTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    marginBottom: 8,
  },
  postInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  postInfoBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  postInfoText: {
    marginLeft: 10,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});
