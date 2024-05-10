import { Image, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Waveform from '@/components/Waveform';
const testWave = {
  height: 140,
  samples: [
    0, 0, 0, 8.379642675984895, 27.777996956546236, 55.00031311252638,
    64.75048758578414, 74.99994588178558, 105.14081284510081,
    109.92485878250433, 93.39546726450226, 66.87249632547483, 35.73351732000641,
    18.9572620058029, 12.346729523046934, 16.09141472770986, 32.13422485834748,
    52.791805687608104, 60.41526591577348, 56.96425591690224,
    58.563606609246605, 58.2422171928167, 58.634249446555806, 65.4395889177743,
    71.08466400061607, 74.22557886925003, 75.33690334915889, 71.66441099228715,
    43.45050608124912, 25.801889339992343, 16.226638201723194,
    11.846182881423243, 8.353891596331323, 19.483884223841052,
    46.157753694170026, 89.78928532300644, 98.42144071068944,
    100.43985756226635, 80.19504034758211, 73.62941626119591, 48.32005151535158,
    26.67034311369219, 13.754071839093754, 6.4306981228798925,
    13.264437620028907, 31.8361025642576, 62.653515015545516, 62.85599705448329,
    61.92820472797547, 49.333998564157596, 57.34467057140635, 51.66222746009865,
    51.38929464262916, 56.40289072694001, 72.51036862850675, 75.25872131932648,
    90.2032880279122, 77.95721862974007, 79.70058176166002, 81.3438462400931,
    101.64797478738454, 104.95866224015165, 100.28595380279287,
    100.09730848956345, 105.03808555100667, 108.17025210814496,
    92.86225753030078, 81.87100298631115, 66.27830973925471, 56.89748887131269,
    32.511665569464, 15.33732307227076, 7.059589877332531, 3.3287414107492923,
    2.2520118788339714, 7.1491214211753435, 18.63793652281012,
    30.494358819593042, 32.37076734359277, 30.570493894247946,
    41.343810525018625, 33.043852871282276, 30.377628693229433,
    25.23613452130168, 19.626110676053038, 12.308809723157637,
    10.116894321774351, 10.428953658221838, 11.46283608225405,
    13.784973892506573, 12.795241216610755, 9.373078093942484,
    5.051688704452884, 2.1640506114275833, 1.0421988808120055,
    0.4720498192279549, 0.22069983547421282, 0.10149438779737563,
    0.04707651234099601, 0.021738601386596404, 0.010061523901576535,
  ],
};

const barWidth = 4;
const barMargin = 1;
export default function HomeScreen() {
  const {width} = useWindowDimensions()
  const [loaded, setLoaded] = useState(false)
  const waveformWidth = React.useMemo(() => {
    return testWave.samples.length * (barWidth + barMargin);
  }, [testWave.samples.length , barWidth, barMargin]);
  const waveFormProgress = useSharedValue(100)

  useEffect(()=>{
    setLoaded(true)
  },[])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <Waveform
        containerWidth={width}
        waveform={testWave}
        progress={waveFormProgress}
        width={waveformWidth}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
