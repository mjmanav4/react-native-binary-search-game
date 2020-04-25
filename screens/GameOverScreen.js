import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>gAME OVER</Text>
      <Image
        source={require("../assets/original.png")}
        // source={{
        //   uri: "https://www.pexels.com/photo/yellow-sunflower-541484/"
        // }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text> Number of rounds {props.roundsNumber}</Text>
      <Text> Number was {props.userNumber}</Text>
      <MainButton
        onPress={() => {
          props.onRestart();
        }}
      >
        RESTART
      </MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "50%",
    height: "50%"
  }
});

export default GameOverScreen;
