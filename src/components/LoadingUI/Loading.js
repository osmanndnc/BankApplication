import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const Bubble = ({ delay }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
//????????
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    />
  );
};

const Loading = () => {
  return (
    <View style={styles.container}>
      <Bubble delay={0} />
      <Bubble delay={200} />
      <Bubble delay={400} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#f5f7fa",
    width: "100%",
    padding: 20,
  },
  bubble: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: "#0e4aeeff",
    margin: 5,
    
  },
});
