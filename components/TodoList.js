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

import {Alert, ScrollView} from "react-native";
import styled, {css} from "@emotion/native";

import {useState, useEffect} from "react";
import Todo from "../components/Todo";
import SubmitTodo from "../components/SubmitTodo";
import Tap from "../components/Tap";

function TodoList() {
  const [todo, setTodo] = useState([]);
  const [category, setCategory] = useState("js");
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
      <Tap category={category} setCategory={setCategory} />
      <SubmitTodo
        todoInput={todoInput}
        onChangeTodo={onChangeTodo}
        onSubmitTodo={onSubmitTodo}
      />
      <ScrollView>
        <StView>
          {todo
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
    </StSafeAreaView>
  );
}

export default TodoList;

const StSafeAreaView = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
`;

const StView = styled.View`
  flex: 1;
  align-items: center;
  text-align: center;
`;
