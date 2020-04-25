import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Alert, ScrollView } from "react-native";

import NumberContainer from "../components/numberContainer";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import MainButton from "../components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const renderListItems = (guess, index) => {
  return (
    <View key={guess} style={styles.listItems}>
      <Text>#{index}</Text>
      <Text>{guess}</Text>
    </View>
  );
};
const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 99, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  // it validates the hint is correct for the computer

  const nextGuessHandler = direction => {
    console.log(direction);
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don lie", "Please give correct hint", [
        { text: "sorry", style: "cancel" }
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds(rounds => rounds + 1);
    setPastGuesses(currPastGuess => [nextNumber, ...currPastGuess]);
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton
          onPress={() => {
            nextGuessHandler("lower");
          }}
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton
          onPress={() => {
            nextGuessHandler("greater");
          }}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {pastGuesses.map((guess, index) =>
            renderListItems(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  },
  listItems: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginVertical: 15,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  list: {
    flex: 1,
    width: "80%"
  }
});

export default GameScreen;
