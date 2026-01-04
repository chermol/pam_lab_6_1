import { FlatList, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import PlayerCard from './PlayerCard';
import players from '../data/players';

interface FilteredPlayerListProps {
  role?: string;
}

export default function FilteredPlayerList({ role }: FilteredPlayerListProps) {
  const router = useRouter();

  const filteredPlayers = role 
    ? players.filter((player) => player.style === role)
    : players;

  const handlePlayerPress = (index: number) => {
    // Find the original index in the full players array
    const playerName = filteredPlayers[index].name;
    const originalIndex = players.findIndex((p) => p.name === playerName);
    router.push(`/player/${originalIndex}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPlayers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <PlayerCard
            name={item.name}
            onPress={() => handlePlayerPress(index)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingVertical: 8,
  },
});
