import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withDelay 
} from 'react-native-reanimated';

interface PlayerCardProps {
  name: string;
  onPress: () => void;
  index?: number;
}

export default function PlayerCard({ name, onPress, index = 0 }: PlayerCardProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    // Stagger animation based on index
    opacity.value = withDelay(index * 50, withSpring(1, { damping: 15 }));
    translateY.value = withDelay(index * 50, withSpring(0, { damping: 15 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});