import React from "react";
import { Animated, PanResponder, View } from "react-native";

// Fork this sandbox and add example code
// to reproduce the issue.
//
// Please check the versions of dependencies
// in package.json

const pan = new Animated.Value(0);
const panResponder = PanResponder.create({
  onMoveShouldSetPanResponder: (_, { dy }) => {
    const threshold = 15;
    return Math.abs(dy) > threshold;
  },
  onPanResponderGrant: () => {
    pan.setOffset(pan["_value"]);
  },
  onPanResponderMove: Animated.event([null, { dy: pan }]),
  onPanResponderRelease: () => {
    pan.flattenOffset();
  }
});

class App extends React.Component {
  render() {
    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          width: 100,
          height: 100,
          position: "absolute",
          backgroundColor: "blue",
          transform: [
            {
              translateY: pan
            }
          ]
        }}
      ></Animated.View>
    );
  }
}

export default App;
