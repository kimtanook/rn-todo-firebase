import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
    <StView>
      <StTodoContainerView>
        <StCategoryView>
          <Text>{item.category}</Text>
        </StCategoryView>
        <StTodoView>
          <View style={{flex: 2}}>
            {item.isUpdate ? (
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  marginLeft: 10,
                  textAlign: "center",
                }}
                value={editTodoInput}
                onChangeText={onChangeUpdateTodo}
                onSubmitEditing={() => onSubmitUpdateTodo(item.id)}
                placeholder="수정할 내용"
              />
            ) : (
              <Text
                style={[
                  styles.todo,
                  item.isDone ? {textDecorationLine: "line-through"} : null,
                ]}
              >
                {item.text}
              </Text>
            )}
          </View>
          <View
            style={{flex: 1, flexDirection: "row", justifyContent: "center"}}
          >
            <TouchableOpacity>
              <AntDesign
                style={{
                  margin: 5,
                }}
                onPress={() => confirmTodo(item.id)}
                name="checksquare"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                style={{
                  margin: 5,
                }}
                onPress={() => editTodoToggle(item.id)}
                name="square-edit-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome
                style={{
                  margin: 5,
                }}
                onPress={() => deleteTodo(item.id)}
                name="trash-o"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </StTodoView>
        <StDateView>
          <Text style={{fontSize: 10}}>
            {new Date(item.createAt + 9 * 60 * 60 * 1000).toLocaleString(
              "ko-KR",
              {
                timeZone: "UTC",
              }
            )}
          </Text>
        </StDateView>
      </StTodoContainerView>
    </StView>
  );
}

export default Todo;

const StView = styled.View`
  flex: 1;
`;

const StTodoContainerView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  margin: 10px;
  padding: 0px 20px 0px 20px;
  background-color: #bfbfbf;
  width: 80%;
`;
const StCategoryView = styled.View`
  flex: 1;
  justify-content: center;
  height: 40px;
`;
const StTodoView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const StDateView = styled.View`
  flex: 1;
  justify-content: center;
  height: 40px;
`;

const styles = StyleSheet.create({
  todo: {
    textAlign: "center",
    fontSize: 25,
  },
});
