import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function PostsScreen({ navigation }) {
 
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <TouchableOpacity
        style={styles.avatarWrapper}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Profile")}
      >
        <View style={{ overflow: "hidden", borderRadius: 16 }}>
          <ImageBackground
            style={styles.avatar}
            source={require("../../assets/images/avatar.jpg")}
          ></ImageBackground>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    // height: 80,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "flex-end",
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
});
