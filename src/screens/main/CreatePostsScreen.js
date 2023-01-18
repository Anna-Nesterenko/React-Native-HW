import { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
} from "react-native";

const initialPostData = {
  photo: "",
  description: "",
  place: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [postData, setPostData] = useState(initialPostData);
  const [camera, setCamera] = useState(null);
  const [location, setLocation] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  //   const [isPostDataReady, setIsPostDataReady] = useState(true);

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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      await MediaLibrary.createAssetAsync(photo.uri);

      let location = await Location.getCurrentPositionAsync({});

      setPostData((prevState) => ({ ...prevState, photo: photo.uri }));
      setLocation(location);

      // console.log("location", location);
    } catch (error) {
      console.log(error);
    }
  };

  const retakePhoto = () => {
    setPostData((prevState) => ({ ...prevState, photo: "" }));
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const handleInput = (type, value) => {
    setPostData((prevState) => ({ ...prevState, [type]: value }));
  };
  const sendPost = () => {
    navigation.navigate("DefaultPost", {
      postData,
      location: location.coords,
    });
    console.log("postData", postData);
    setPostData(initialPostData);
    // console.log("initialPostData", initialPostData);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        > */}
        <View style={styles.header} />
        <View style={{ flex: 1 }}>
          {postData.photo ? (
            <View
              style={{
                ...styles.photoContainer,
                // paddingBottom: isShowKeyboard ? 30 : 110,
              }}
            >
              <TouchableOpacity
                style={styles.retakePhotoBtn}
                onPress={retakePhoto}
              >
                <Octicons name="x" size={45} color="#F6F6F6" />
              </TouchableOpacity>
              <Image style={styles.photo} source={{ uri: postData.photo }} />
            </View>
          ) : (
            <Camera
              style={styles.camera}
              type={type}
              flashMode="auto"
              ref={(ref) => setCamera(ref)}
            >
              <TouchableOpacity
                style={styles.cameraTypeBtn}
                onPress={toggleCameraType}
              >
                <Octicons name="sync" size={30} color="#F6F6F6" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cameraSnapBtn}
                onPress={takePhoto}
              >
                <Octicons name="issue-opened" size={50} color="#F6F6F6" />
              </TouchableOpacity>
            </Camera>
          )}
          <View style={{ marginTop: 8, marginHorizontal: 16 }}>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                color: "#BDBDBD",
              }}
            >
              Take new photo
            </Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={{ ...styles.input, marginBottom: 16 }}
              placeholder="Enter a title..."
              onFocus={() => setIsShowKeyboard(true)}
              value={postData.description}
              onChangeText={(value) => handleInput("description", value)}
            />
            <TextInput
              style={{ ...styles.input, paddingLeft: 28 }}
              placeholder="Select a location..."
              onFocus={() => setIsShowKeyboard(true)}
              value={postData.place}
              onChangeText={(value) => handleInput("place", value)}
            />
            <Octicons
              name="location"
              size={24}
              style={{
                position: "absolute",
                top: 77,
                left: 16,
                color: "#CECDCD",
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                ...styles.sendBtn,
                backgroundColor: postData.photo ? "#FF6C00" : "#F6F6F6",
              }}
              disabled={!postData.photo}
              activeOpacity={0.7}
              onPress={sendPost}
            >
              <Text
                style={{
                  ...styles.sendBtnTitle,
                  color: postData.photo ? "#fff" : "#BDBDBD",
                }}
              >
                Publish new post
              </Text>
            </TouchableOpacity>
          </View>
          {!isShowKeyboard && (
            <View style={styles.wrapperTrashItem}>
              <TouchableOpacity
                style={styles.trashItem}
                // disabled={!postData.photo}
                activeOpacity={0.7}
                // onPress={removeAll}
              >
                <Feather name="trash-2" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* </KeyboardAvoidingView> */}
      </View>
    </TouchableWithoutFeedback>
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
  camera: {
    position: "relative",
    height: "33%",
    marginTop: 32,
    marginHorizontal: 16,
    borderRadius: 8,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 35,
  },
  cameraTypeBtn: {
    position: "absolute",
    top: 10,
    right: 13,
    opacity: 0.7,
  },
  cameraSnapBtn: {
    marginBottom: 20,
    opacity: 0.7,
  },
  photoContainer: {
    position: "relative",
    marginHorizontal: 16,
    height: 240,
    marginTop: 32,
  },
  photo: {
    position: "relative",
    height: "100%",
    borderRadius: 8,
    resizeMode: "cover",
  },
  retakePhotoBtn: {
    position: "absolute",
    top: 2,
    right: 11,
    opacity: 0.7,
    zIndex: 1,
  },
  inputWrapper: {
    position: "relative",
    marginTop: 22,
  },
  input: {
    height: 50,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  sendBtn: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 100,
  },
  sendBtnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  wrapperTrashItem: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: 10,
    borderBottomWidth: 5,
    paddingBottom: 20,
  },
  trashItem: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 23,
    paddingRight: 23,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});
