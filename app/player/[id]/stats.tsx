import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import players from '../../../data/players';

export default function PlayerStatsScreen() {
  const { id } = useLocalSearchParams();
  const playerIndex = parseInt(id as string);
  const player = players[playerIndex];

  if (!player || !player.stats) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Stats not available</Text>
      </View>
    );
  }

  const { stats } = player;

  return (
    <>
      <Stack.Screen
        options={{
          title: `${player.name} - Stats`,
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: player.image }}
            style={styles.playerImage}
            resizeMode="contain"
          />
          <Text style={styles.playerName}>{player.name}</Text>
          <Text style={styles.playerRole}>{player.style}</Text>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Career Statistics</Text>

          <View style={styles.statCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Matches</Text>
              <Text style={styles.statValue}>{stats.matches}</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Runs</Text>
              <Text style={styles.statValue}>{stats.runs}</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Wickets</Text>
              <Text style={styles.statValue}>{stats.wickets}</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>
                {player.style === 'Bowler' ? 'Bowling Average' : 'Batting Average'}
              </Text>
              <Text style={styles.statValue}>{stats.average.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Strike Rate</Text>
              <Text style={styles.statValue}>{stats.strikeRate.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.performanceSection}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Matches per Year</Text>
            <Text style={styles.metricValue}>
              {(stats.matches / 5).toFixed(1)}
            </Text>
            <Text style={styles.metricSubtext}>
              Based on 5-year career average
            </Text>
          </View>

          {stats.runs > 0 && (
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>Runs per Match</Text>
              <Text style={styles.metricValue}>
                {(stats.runs / stats.matches).toFixed(1)}
              </Text>
              <Text style={styles.metricSubtext}>
                Career average scoring rate
              </Text>
            </View>
          )}

          {stats.wickets > 0 && (
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>Wickets per Match</Text>
              <Text style={styles.metricValue}>
                {(stats.wickets / stats.matches).toFixed(2)}
              </Text>
              <Text style={styles.metricSubtext}>
                Career average wicket rate
              </Text>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  playerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  playerRole: {
    fontSize: 16,
    color: '#138808',
    fontWeight: '600',
  },
  statsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    marginTop: 8,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#138808',
  },
  performanceSection: {
    padding: 16,
    paddingTop: 0,
  },
  metricCard: {
    backgroundColor: '#138808',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  metricTitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  metricSubtext: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
});
