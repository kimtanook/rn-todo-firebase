import {StatusBar} from "expo-status-bar";
import {dbService} from "../firebase";
import {
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  onSnapshot,
  collection,
  query,
  addDoc,
} from "firebase/firestore";

import {Alert, KeyboardAvoidingView, ScrollView, Platform} from "react-native";
import styled, {css} from "@emotion/native";

import {useState, useEffect} from "react";
import Todo from "./Todo";
import SubmitTodo from "./SubmitTodo";
import Tap from "./Tap";

function MainView() {
  const [todo, setTodo] = useState([]);
  const [category, setCategory] = useState("");
  const [todoInput, setTodoInput] = useState("");
  const [editTodoInput, setEditTodoInput] = useState("");

  useEffect(() => {
    try {
      const q = query(
        collection(dbService, "post"),
        orderBy("createAt", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        const dataBaseTodo = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodo(dataBaseTodo);
      });
    } catch (error) {
      console.log("error : ", error);
    }
  }, []);

  const onChangeTodo = (e) => {
    setTodoInput(e);
  };

  const onSubmitTodo = async () => {
    try {
      if (todoInput === "") {
        alert("Todo를 입력해주세요.");
        return;
      }
      await addDoc(collection(dbService, "post"), {
        createAt: Date.now(),
        text: todoInput,
        isDone: false,
        isUpdate: false,
        category: category,
      });
    } catch (error) {
      console.log(error);
    }
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
        onPress: async () => {
          await deleteDoc(doc(dbService, `post/${id}`));
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

  const onSubmitUpdateTodo = async (id) => {
    try {
      if (editTodoInput === "") {
        alert("수정할 내용을 입력해주세요.");
        return;
      }
      await updateDoc(doc(dbService, `post/${id}`), {
        text: editTodoInput,
      });
    } catch (error) {
      console.log("error : ", error);
    }
    setEditTodoInput("");
  };

  return (
    <StSafeAreaView>
      <StatusBar style="auto" />
      <ScrollView>
        <StView>
          {category === ""
            ? todo.map((item) => (
                <Todo
                  key={item.id + 1}
                  item={item}
                  confirmTodo={confirmTodo}
                  deleteTodo={deleteTodo}
                  editTodoToggle={editTodoToggle}
                  onSubmitUpdateTodo={onSubmitUpdateTodo}
                  onChangeUpdateTodo={onChangeUpdateTodo}
                  editTodoInput={editTodoInput}
                />
              ))
            : todo
                .filter((item) => item.category === category)
                .map((item) => (
                  <Todo
                    key={item.id + 1}
                    item={item}
                    confirmTodo={confirmTodo}
                    deleteTodo={deleteTodo}
                    editTodoToggle={editTodoToggle}
                    onSubmitUpdateTodo={onSubmitUpdateTodo}
                    onChangeUpdateTodo={onChangeUpdateTodo}
                    editTodoInput={editTodoInput}
                  />
                ))}
        </StView>
      </ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
        <SubmitTodo
          category={category}
          todoInput={todoInput}
          onChangeTodo={onChangeTodo}
          onSubmitTodo={onSubmitTodo}
        />
      </KeyboardAvoidingView>
      <Tap category={category} setCategory={setCategory} />
    </StSafeAreaView>
  );
}

export default MainView;

const StSafeAreaView = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
`;

const StView = styled.View`
  flex: 1;
  align-items: center;
  text-align: center;
`;
