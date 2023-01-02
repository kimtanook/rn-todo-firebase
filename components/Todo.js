import {StyleSheet, TextInput, TouchableOpacity} from "react-native";

import {AntDesign} from "@expo/vector-icons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {FontAwesome} from "@expo/vector-icons";

import styled, {css} from "@emotion/native";

function Todo({
  item,
  confirmTodo,
  deleteTodo,
  editTodoToggle,
  onSubmitUpdateTodo,
  editTodoInput,
  onChangeUpdateTodo,
}) {
  return (
    <StTodoView>
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
            styles.taps,
            item.isDone ? {textDecorationLine: "line-through"} : null,
          ]}
        >
          {item.text}
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
  );
}

export default Todo;

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
  taps: {},
});
