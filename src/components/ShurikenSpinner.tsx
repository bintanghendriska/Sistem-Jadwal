// ============================================================
// ShurikenSpinner — bintang 4 sisi (bentuk generik, digambar
// sendiri dengan react-native-svg) yang berputar terus memakai
// Reanimated. Dipakai di ListEmptyComponent Halaman Pertemuan.
// ShurikenStar (statis) dipakai sebagai ornamen separator.
// ============================================================

import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';
import { COLORS } from '../constants/theme';

interface ShurikenStarProps {
  size?: number;
  color?: string;
  holeColor?: string;
}

// Versi statis (tanpa animasi)
export function ShurikenStar({ size = 14, color = COLORS.panelBorder, holeColor = COLORS.nightNavy }: ShurikenStarProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M50 2 L61 39 L98 50 L61 61 L50 98 L39 61 L2 50 L39 39 Z"
        fill={color}
      />
      <Circle cx="50" cy="50" r="8" fill={holeColor} />
    </Svg>
  );
}

interface ShurikenSpinnerProps {
  size?: number;
  color?: string;
  duration?: number;
}

// Versi berputar (Reanimated: withRepeat + withTiming, easing linear)
export default function ShurikenSpinner({ size = 56, color = COLORS.naruOrange, duration = 1400 }: ShurikenSpinnerProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration, easing: Easing.linear }),
      -1, // ulang tanpa henti
      false
    );
  }, [duration, rotation]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={spinStyle}>
      <ShurikenStar size={size} color={color} holeColor={COLORS.nightNavy} />
    </Animated.View>
  );
}
