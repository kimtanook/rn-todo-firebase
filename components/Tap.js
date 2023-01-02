import styled, {css} from "@emotion/native";
import {TouchableOpacity, StyleSheet} from "react-native";

function Tap({category, setCategory}) {
  return (
    <StTopContainer>
      <TouchableOpacity>
        <StText
          onPress={() => setCategory("js")}
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
          onPress={() => setCategory("react")}
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
          onPress={() => setCategory("ct")}
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
  );
}

export default Tap;

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
const styles = StyleSheet.create({
  tap: {},
});
