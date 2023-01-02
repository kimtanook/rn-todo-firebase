import styled, {css} from "@emotion/native";
import {TouchableOpacity, StyleSheet, Text} from "react-native";

function Tap({category, setCategory}) {
  return (
    <StTopContainer>
      <TouchableOpacity>
        <StTextView
          style={{
            backgroundColor: category === "JavaScript" ? "#a1d2ff" : "gray",
          }}
        >
          <StText onPress={() => setCategory("JavaScript")}>Javascript</StText>
        </StTextView>
      </TouchableOpacity>
      <TouchableOpacity>
        <StTextView
          style={{
            backgroundColor: category === "React" ? "#a1d2ff" : "gray",
          }}
        >
          <StText onPress={() => setCategory("React")}>React</StText>
        </StTextView>
      </TouchableOpacity>
      <TouchableOpacity>
        <StTextView
          style={{
            backgroundColor: category === "React Native" ? "#a1d2ff" : "gray",
          }}
        >
          <StText onPress={() => setCategory("React Native")}>
            React Native
          </StText>
        </StTextView>
      </TouchableOpacity>
      <TouchableOpacity>
        <StTextView
          style={{
            backgroundColor: category === "" ? "#a1d2ff" : "gray",
          }}
        >
          <StText onPress={() => setCategory("")}>전체보기</StText>
        </StTextView>
      </TouchableOpacity>
    </StTopContainer>
  );
}

export default Tap;

const StTopContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
const StTextView = styled.View`
  padding: 0px 5px 0px 5px;
  border-radius: 10px;
`;
const StText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  height: 40px;
  line-height: 40px;
`;
