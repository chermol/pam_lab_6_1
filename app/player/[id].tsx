import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import players from '../../data/players';

export default function PlayerDetailScreen() {
  const { id } = useLocalSearchParams();
  const playerIndex = parseInt(id as string);
  const player = players[playerIndex];

  if (!player) {
    return (
      <View style={styles.container}>
        <Text>Player not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Player Details',
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Image
            source={{ uri: player.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.name}>{player.name}</Text>
          <Text style={styles.age}>Age: {player.age}</Text>
          <Text style={styles.style}>Role: {player.style}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  age: {
    fontSize: 20,
    color: '#666',
    marginBottom: 8,
  },
  style: {
    fontSize: 18,
    color: '#138808',
    fontWeight: '600',
  },
});