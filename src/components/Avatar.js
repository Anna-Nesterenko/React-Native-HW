// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { authAvatarChangeUser } from "../redux/auth/authOperations";
// import * as ImagePicker from "expo-image-picker";

// const Avatar = ({}) => {
//   const [avatar, setAvatar] = useState(null);

//   const changedAvatar = () => {
//     console.log("click changeAvatar");
//   };

//   const pickAvatar = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 0,
//     });

//     if (!result.cancelled) {
//       setAvatar(result.uri);
//     }
//   };

//   const deleteAvatar = async () => {
//     setAvatar(null);
//   };
//   return (
//     <View style={styles.avatar}>
//       <TouchableOpacity
//         activeOpacity={0.7}
//         onPress={changedAvatar}
//         style={styles.avatarBtn}
//       >
//         <Text style={styles.avatarBtnText}>+</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Avatar;

// const styles = StyleSheet.create({
//   avatar: {
//     width: 120,
//     height: 120,
//     backgroundColor: "#F6F6F6",
//     borderRadius: 16,
//     position: "absolute",
//     left: "47%",
//     top: "-10%",
//     transform: [{ translateX: -50 }, { translateY: -50 }],
//   },
//   avatarBtn: {
//     position: "absolute",
//     justifyContent: "center",
//     alignItems: "center",
//     width: 25,
//     height: 25,
//     borderRadius: 90,
//     borderColor: "#FF6C00",
//     borderWidth: 1,
//     right: -12.5,
//     bottom: 20,
//   },
//   avatarBtnText: {
//     color: "#FF6C00",
//     fontSize: 26,
//     lineHeight: 26,
//   },
// });
