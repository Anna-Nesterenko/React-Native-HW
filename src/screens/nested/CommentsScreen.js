import { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function CommentsScreen({ route }) {
  const { postId, photo } = route.params;
  //   console.log(route.params);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
console.log(allComments.length);
  const { name, avatar } = useSelector((state) => state.auth);

  //   перевірка клавіатури
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
  };
  //   створення коментарів
  const createComment = () => {
    sendCommentToServer();
    setComment("");
    keyboardHide();
  };
  //   завантаження коментарів на firebase
  const sendCommentToServer = async () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    try {
      const dbRef = doc(db, "posts", postId);
      await addDoc(collection(dbRef, "comments"), {
        comment,
        name,
        date,
        time,
      });
    } catch (error) {
      console.log("error.message", error.message);
    }
  };
  //   выдображення коментарів на сторінці
  const getAllComments = async () => {
    try {
      const dbRef = doc(db, "posts", postId);
      //   console.log(dbRef);
      onSnapshot(collection(dbRef, "comments"), (docSnap) =>
        setAllComments(docSnap.docs.map((doc) => ({ ...doc.data() })))
      );
    } catch (error) {
      console.log(`getAllComments`, error);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginTop: 32,
          flexDirection: "row",
        }}
      >
        <Image source={{ uri: avatar }} style={styles.avatarIcon} />
        <View style={styles.comment}>
          <Text style={{ fontSize: 16 }}>User: {name}</Text>
          <Text>{item.comment}</Text>
          <Text style={styles.date}>
            {item.date} | {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ ...styles.container }}>
        <Image
          source={{ uri: photo }}
          style={{ height: 240, borderRadius: 8 }}
        />

        <FlatList
          data={allComments}
          keyExtractor={allComments.id}
          renderItem={renderItem}
        />

        <View style={styles.inputContainer}></View>
        <View>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Add comment"
            onFocus={() => setIsShowKeyboard(true)}
            style={{
              ...styles.submitBtn,
              fontFamily: "Roboto",
            }}
          />

          <TouchableOpacity
            style={styles.addCommentBtn}
            activeOpacity={0.7}
            onPress={createComment}
          >
            <AntDesign name="arrowup" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  avatarIcon: { height: 40, width: 40, borderRadius: 100 },
  comment: {
    marginLeft: 16,
    padding: 10,
    width: 300,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  date: {
    fontSize: 12,
    textAlign: "right",
    color: "grey",
  },
  submitBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    padding: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "rgba(189, 189, 189, 1)",
    backgroundColor: "#E8E8E8",
  },
  addCommentBtn: {
    position: "absolute",
    right: 6,
    bottom: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
  //   inputContainer: {
  //     marginHorizontal: 10,
  //     marginBottom: 20,
  //   },
  //   input: {
  //     borderBottomWidth: 1,
  //     borderBottomColor: "#E8E8E8",
  //     height: 50,
  //     fontSize: 16,
  //   },
});
