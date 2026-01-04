import { FlatList, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import PlayerCard from './PlayerCard';
import players from '../data/players';
import { useResponsive } from '../hooks/useResponsive';

interface FilteredPlayerListProps {
  role?: string;
}

export default function FilteredPlayerList({ role }: FilteredPlayerListProps) {
  const router = useRouter();
  const { isDesktop, width } = useResponsive();

  const filteredPlayers = role 
    ? players.filter((player) => player.style === role)
    : players;

  const handlePlayerPress = (index: number) => {
    // Find the original index in the full players array
    const playerName = filteredPlayers[index].name;
    const originalIndex = players.findIndex((p) => p.name === playerName);
    router.push(`/player/${originalIndex}`);
  };

  // Calculate number of columns based on screen width
  const getNumColumns = () => {
    if (width >= 1440) return 4;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  };

  const numColumns = getNumColumns();

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPlayers}
        key={numColumns} // Force re-render when columns change
        numColumns={numColumns}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={[
            styles.cardWrapper,
            { width: isDesktop ? `${100 / numColumns}%` : '100%' }
          ]}>
            <PlayerCard
              name={item.name}
              onPress={() => handlePlayerPress(index)}
            />
          </View>
        )}
        contentContainerStyle={[
          styles.listContent,
          isDesktop && styles.listContentDesktop
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cardWrapper: {
    padding: 0,
  },
  listContent: {
    paddingVertical: 8,
  },
  listContentDesktop: {
    paddingHorizontal: 16,
    maxWidth: 1440,
    alignSelf: 'center',
    width: '100%',
  },
});
