import styled, {css} from "@emotion/native";

function SubmitTodo({todoInput, onChangeTodo, onSubmitTodo}) {
  return (
    <StTextInput
      value={todoInput}
      onChangeText={onChangeTodo}
      onSubmitEditing={onSubmitTodo}
      placeholder="입력 후 엔터"
    />
  );
}
export default SubmitTodo;

const StTextInput = styled.TextInput`
  height: 40px;
  border: 1px solid black;
  margin: 30px;
  padding-left: 10px;
`;
