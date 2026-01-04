import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import players from '../../data/players';
import { useResponsive } from '../../hooks/useResponsive';

export default function PlayerDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isDesktop } = useResponsive();
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
        <View style={[
          styles.content,
          isDesktop && styles.contentDesktop
        ]}>
          <Image
            source={{ uri: player.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.name}>{player.name}</Text>
          <Text style={styles.age}>Age: {player.age}</Text>
          <Text style={styles.style}>Role: {player.style}</Text>

          {player.stats && (
            <View style={[
              styles.statsContainer,
              isDesktop && styles.statsContainerDesktop
            ]}>
              <Text style={styles.statsTitle}>Quick Stats</Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{player.stats.matches}</Text>
                  <Text style={styles.statLabel}>Matches</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{player.stats.runs}</Text>
                  <Text style={styles.statLabel}>Runs</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{player.stats.wickets}</Text>
                  <Text style={styles.statLabel}>Wickets</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.detailedStatsButton}
                onPress={() => router.push(`/player/${id}/stats`)}
              >
                <Text style={styles.detailedStatsButtonText}>
                  View Detailed Statistics
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
  contentDesktop: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 40,
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
    marginBottom: 24,
  },
  statsContainer: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    marginTop: 12,
  },
  statsContainerDesktop: {
    maxWidth: 600,
  },
  statsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#138808',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailedStatsButton: {
    backgroundColor: '#138808',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  detailedStatsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});