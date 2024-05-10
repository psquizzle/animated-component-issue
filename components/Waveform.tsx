import React from "react";
import { View, Text } from "react-native";
import {
  Button,
  useColorScheme,
  Platform,
  View as NativeView,
} from "react-native";
import { ClipPath, Defs, Rect as SVGRect, Svg } from "react-native-svg";
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";


const barWidth = 4;
const barMargin = 1;


const Colors= {
  light: {

    graphOuter: "#f2f2f6",
    waveColor:'#ee742f',//"#ee742f"
   

    
  },
  dark: {
 
    graphOuter: "#1c1c1e",
    waveColor:'#ee742f',//"#ee742f"


  },

};


const AnimatedRect = Animated.createAnimatedComponent(SVGRect);

const Waveform = ({ containerWidth, waveform, progress, width }) => {
  const theme = useColorScheme();
  const color = Colors[theme].waveColor;
  const otherColor =
    Platform.OS === "ios" || theme === "dark"
      ? "white"
      : Colors[theme].graphOuter;
  const offset = containerWidth / 2;
  const height = waveform.height + barMargin + waveform.height * 0.61;

  const translationValue = useDerivedValue(() => {
    const calc = interpolate(
      progress.value,
      [0, width],
      [0, width - offset + 10],
      Extrapolation.CLAMP
    );

    return -calc;
  }, [progress, width]);

  const animatedProps = useAnimatedProps(() => {
    "worklet";
    const calc = interpolate(
      progress.value,
      [0, width],
      [width, 0],
      Extrapolation.CLAMP
    );
    //  runOnJS(captureConsole)(x.value)
    return { x: -calc };
  }, [progress, width, containerWidth]);
  return (
    <View>
   

  
    <Animated.View
      style={{
        width: width + offset,
        height: height,
        transform: [{ translateX: translationValue }],
        backgroundColor: "transparent",
      }}
    >


      <NativeView
        collapsable={false}
        style={{
          backgroundColor: "transparent",
          width: width + offset,
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 2, height: 2 },
          shadowRadius: 3,
          elevation: 1,
        }}
      >
        <NativeView
          style={{
            position: "absolute",
            height,
            width: width + offset,
            backgroundColor: "transparent",
          }}
        >
          <Svg {...{ width: width + offset, height }}>
            <Defs>
              <ClipPath id={"progress"}>
                <AnimatedRect
                  animatedProps={{ value: 0 }}
                  width={width + offset}
                  height={height}
                />
              </ClipPath>
            </Defs>
            {waveform.samples.map((sample, key) => (
              <React.Fragment {...{ key }}>
                <SVGRect
                  clipPath="url(#progress)"
                  y={waveform.height - sample}
                  x={key * (barWidth + barMargin) + offset}
                  fill={otherColor}
                  height={sample}
                  width={barWidth}
                ></SVGRect>
                <SVGRect
                  clipPath="url(#progress)"
                  y={waveform.height + barMargin}
                  x={key * (barWidth + barMargin) + offset}
                  fill={otherColor}
                  opacity={0.5}
                  height={sample * 0.61}
                  width={barWidth}
                />
              </React.Fragment>
            ))}
          </Svg>
        </NativeView>

        <Svg {...{ width: width + offset, height }}>
          <Defs>
            <ClipPath id={"progress"}>
              <AnimatedRect
                animatedProps={animatedProps}
                width={width + offset}
                height={height}
              />
            </ClipPath>
          </Defs>
          {waveform.samples.map((sample, key) => (
            <React.Fragment {...{ key }}>
              <SVGRect
                clipPath="url(#progress)"
                y={waveform.height - sample}
                x={key * (barWidth + barMargin) + offset}
                fill={color}
                height={sample}
                width={barWidth}
              ></SVGRect>
              <SVGRect
                clipPath="url(#progress)"
                y={waveform.height + barMargin}
                x={key * (barWidth + barMargin) + offset}
                fill={color}
                opacity={0.5}
                height={sample * 0.61}
                width={barWidth}
              />
            </React.Fragment>
          ))}
        </Svg>
      </NativeView>
    </Animated.View>


    </View>
  );
};

export default Waveform;
