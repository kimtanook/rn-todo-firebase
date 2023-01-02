import styled, {css} from "@emotion/native";
import {Text, View} from "react-native";

function SubmitTodo({category, todoInput, onChangeTodo, onSubmitTodo}) {
  return (
    <View>
      {category === "" ? (
        <StTextInput
          editable={false}
          placeholder="입력하려면 상단탭을 선택해주세요."
        />
      ) : (
        <StTextInput
          editable={true}
          value={todoInput}
          onChangeText={onChangeTodo}
          onSubmitEditing={onSubmitTodo}
          placeholder="입력 후 엔터"
        />
      )}
    </View>
  );
}
export default SubmitTodo;

const StTextInput = styled.TextInput`
  height: 40px;
  border: 1px solid black;
  margin: 30px;
  padding-left: 10px;
`;
