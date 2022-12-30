import {StatusBar} from "expo-status-bar";
import {
  Alert,
  SafeAreaView,
  SafeAreaViewBase,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styled, {css} from "@emotion/native";
import {AntDesign} from "@expo/vector-icons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {FontAwesome} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState, useEffect} from "react";

export default function App() {
  const [todo, setTodo] = useState([]);
  const [category, setCategory] = useState("js");
  const [todoInput, setTodoInput] = useState("");
  const [editTodoInput, setEditTodoInput] = useState("");

  const setCategoryStorage = async (categoryName) => {
    setCategory(categoryName);
    await AsyncStorage.setItem("category", categoryName);
  };
  useEffect(() => {
    const saveTodo = async () => {
      const todoData = JSON.stringify(todo);
      await AsyncStorage.setItem("todos", todoData);
      console.log("todoData : ", todoData);
    };
    if (todo.length > 0) saveTodo();
  }, [todo]);

  useEffect(() => {
    const getTodo = async () => {
      const stringTodo = await AsyncStorage.getItem("todos");
      const storageCategory = await AsyncStorage.getItem("category");
      const objectTodo = JSON.parse(stringTodo);
      setTodo(objectTodo);
      setCategory(storageCategory);
    };
    getTodo();
  }, []);

  const onChangeTodo = (e) => {
    setTodoInput(e);
  };

  const todoData = {
    id: Date.now(),
    title: todoInput,
    isDone: false,
    isUpdate: false,
    category,
  };

  const onSubmitTodo = () => {
    setTodo((currentToDo) => [todoData, ...currentToDo]);
    setTodoInput("");
  };

  const confirmTodo = (id) => {
    const newTodo = todo.map((item) => {
      if (id === item.id) {
        return {...item, isDone: !item.isDone};
      } else {
        return {...item};
      }
    });
    setTodo(newTodo);
  };

  // - 튜터님 로직
  // const setIsDone = (id) => {
  //   const newTodo = [...todo];
  //   const idx = newTodo.findIndex((todo) => todo.id === id);
  //   newTodo[idx].isDone = !newTodo[idx].isDone;
  //   setTodo(newTodo);
  // };
  const deleteTodo = (id) => {
    Alert.alert("Todo Delete", "정말 삭제하시겠습니까?", [
      {text: "Cancel", style: "cancel"},
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const deletedTodo = todo.filter((item) => id !== item.id);
          setTodo(deletedTodo);
        },
      },
    ]);
  };
  const editTodoToggle = (id) => {
    const newTodo = todo.map((item) => {
      if (id === item.id) {
        return {...item, isUpdate: !item.isUpdate};
      } else {
        return {...item};
      }
    });
    setTodo(newTodo);
  };

  const onChangeUpdateTodo = (e) => {
    setEditTodoInput(e);
  };

  const onSubmitUpdateTodo = (id) => {
    const editTodo = todo.map((item) => {
      if (id === item.id) {
        return {...item, title: editTodoInput, isUpdate: false};
      } else {
        return {...item};
      }
    });
    setTodo(editTodo);
    setEditTodoInput("");
  };
  return (
    <StSafeAreaView>
      <StatusBar style="auto" />
      <StTopContainer>
        <TouchableOpacity>
          <StText
            onPress={() => setCategoryStorage("js")}
            style={[
              styles.tap,
              {
                backgroundColor: category === "js" ? "blue" : "gray",
                ...styles.tap,
              },
            ]}
          >
            Javascript
          </StText>
        </TouchableOpacity>
        <TouchableOpacity>
          <StText
            onPress={() => setCategoryStorage("react")}
            style={[
              styles.tap,
              {
                backgroundColor: category === "react" ? "blue" : "gray",
                ...styles.tap,
              },
            ]}
          >
            React
          </StText>
        </TouchableOpacity>
        <TouchableOpacity>
          <StText
            onPress={() => setCategoryStorage("ct")}
            style={[
              styles.tap,
              {
                backgroundColor: category === "ct" ? "blue" : "gray",
                ...styles.tap,
              },
            ]}
          >
            Coding Test
          </StText>
        </TouchableOpacity>
      </StTopContainer>
      <StTextInput
        value={todoInput}
        onChangeText={onChangeTodo}
        onSubmitEditing={onSubmitTodo}
        placeholder="입력 후 엔터"
      />
      <ScrollView>
        <StView>
          {todo
            .filter((item) => item.category === category)
            .map((item) => (
              <StTodoView key={item.id}>
                {item.isUpdate ? (
                  <TextInput
                    style={{flex: 1, backgroundColor: "white", marginLeft: 10}}
                    value={editTodoInput}
                    onChangeText={onChangeUpdateTodo}
                    onSubmitEditing={() => onSubmitUpdateTodo(item.id)}
                    placeholder="수정할 내용"
                  />
                ) : (
                  <StItemText
                    style={[
                      styles.tap,
                      item.isDone ? {textDecorationLine: "line-through"} : null,
                    ]}
                  >
                    {item.title}
                  </StItemText>
                )}
                <TouchableOpacity>
                  <AntDesign
                    onPress={() => confirmTodo(item.id)}
                    name="checksquare"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    onPress={() => editTodoToggle(item.id)}
                    name="square-edit-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome
                    onPress={() => deleteTodo(item.id)}
                    name="trash-o"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </StTodoView>
            ))}
        </StView>
      </ScrollView>
    </StSafeAreaView>
  );
}

const StSafeAreaView = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
`;
const StTopContainer = styled.View`
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-around;
`;
const StText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
  text-align: center;
`;
const StTextInput = styled.TextInput`
  height: 40px;
  border: 1px solid black;
  margin: 30px;
  padding-left: 10px;
`;

const StView = styled.View`
  flex: 1;
  align-items: center;
  text-align: center;
`;
const StTodoView = styled.View`
  flex: 1;
  align-items: center;
  text-align: center;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 15px;
  margin: 10px;
  background-color: #bfbfbf;
  height: 100px;
  width: 80%;
`;
const StItemText = styled.Text`
  font-size: 25px;
  margin-right: 10px;
`;
const styles = StyleSheet.create({
  tap: {},
});
