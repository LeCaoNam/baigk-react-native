import React, { useEffect, useRef } from 'react';
import { Animated, Platform } from 'react-native';

export default function Transition({ children }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 280,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: anim,
        transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
      }}
    >
      {children}
    </Animated.View>
  );
}