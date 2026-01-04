import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withDelay,
  withTiming
} from 'react-native-reanimated';
import players from '../../../data/players';
import { useResponsive } from '../../../hooks/useResponsive';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function PlayerStatsScreen() {
  const { id } = useLocalSearchParams();
  const { isDesktop } = useResponsive();
  const playerIndex = parseInt(id as string);
  const player = players[playerIndex];

  // Animation values
  const headerOpacity = useSharedValue(0);
  const headerScale = useSharedValue(0.95);
  
  // Create animation values for each stat card
  const statCard1Opacity = useSharedValue(0);
  const statCard1TranslateX = useSharedValue(-20);
  const statCard2Opacity = useSharedValue(0);
  const statCard2TranslateX = useSharedValue(-20);
  const statCard3Opacity = useSharedValue(0);
  const statCard3TranslateX = useSharedValue(-20);
  const statCard4Opacity = useSharedValue(0);
  const statCard4TranslateX = useSharedValue(-20);
  const statCard5Opacity = useSharedValue(0);
  const statCard5TranslateX = useSharedValue(-20);
  
  const metricCard1Opacity = useSharedValue(0);
  const metricCard1Scale = useSharedValue(0.9);
  const metricCard2Opacity = useSharedValue(0);
  const metricCard2Scale = useSharedValue(0.9);
  const metricCard3Opacity = useSharedValue(0);
  const metricCard3Scale = useSharedValue(0.9);

  useEffect(() => {
    // Header animation
    headerOpacity.value = withTiming(1, { duration: 400 });
    headerScale.value = withSpring(1, { damping: 12 });

    // Staggered stat cards
    const animateStatCard = (opacity: any, translateX: any, delay: number) => {
      opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
      translateX.value = withDelay(delay, withSpring(0, { damping: 15 }));
    };

    animateStatCard(statCard1Opacity, statCard1TranslateX, 200);
    animateStatCard(statCard2Opacity, statCard2TranslateX, 300);
    animateStatCard(statCard3Opacity, statCard3TranslateX, 400);
    animateStatCard(statCard4Opacity, statCard4TranslateX, 500);
    animateStatCard(statCard5Opacity, statCard5TranslateX, 600);

    // Metric cards
    const animateMetricCard = (opacity: any, scale: any, delay: number) => {
      opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
      scale.value = withDelay(delay, withSpring(1, { damping: 12 }));
    };

    animateMetricCard(metricCard1Opacity, metricCard1Scale, 700);
    animateMetricCard(metricCard2Opacity, metricCard2Scale, 800);
    animateMetricCard(metricCard3Opacity, metricCard3Scale, 900);
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ scale: headerScale.value }],
  }));

  const createStatCardStyle = (opacity: any, translateX: any) => 
    useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    }));

  const createMetricCardStyle = (opacity: any, scale: any) =>
    useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    }));

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
        <View style={[
          styles.content,
          isDesktop && styles.contentDesktop
        ]}>
          <Animated.View style={[styles.header, headerAnimatedStyle]}>
            <AnimatedImage
              source={{ uri: player.image }}
              style={styles.playerImage}
              resizeMode="contain"
            />
            <Text style={styles.playerName}>{player.name}</Text>
            <Text style={styles.playerRole}>{player.style}</Text>
          </Animated.View>

          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Career Statistics</Text>

            <Animated.View style={[styles.statCard, createStatCardStyle(statCard1Opacity, statCard1TranslateX)]}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Total Matches</Text>
                <Text style={styles.statValue}>{stats.matches}</Text>
              </View>
            </Animated.View>

            <Animated.View style={[styles.statCard, createStatCardStyle(statCard2Opacity, statCard2TranslateX)]}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Total Runs</Text>
                <Text style={styles.statValue}>{stats.runs}</Text>
              </View>
            </Animated.View>

            <Animated.View style={[styles.statCard, createStatCardStyle(statCard3Opacity, statCard3TranslateX)]}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Total Wickets</Text>
                <Text style={styles.statValue}>{stats.wickets}</Text>
              </View>
            </Animated.View>

            <Animated.View style={[styles.statCard, createStatCardStyle(statCard4Opacity, statCard4TranslateX)]}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>
                  {player.style === 'Bowler' ? 'Bowling Average' : 'Batting Average'}
                </Text>
                <Text style={styles.statValue}>{stats.average.toFixed(2)}</Text>
              </View>
            </Animated.View>

            <Animated.View style={[styles.statCard, createStatCardStyle(statCard5Opacity, statCard5TranslateX)]}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Strike Rate</Text>
                <Text style={styles.statValue}>{stats.strikeRate.toFixed(2)}</Text>
              </View>
            </Animated.View>
          </View>

          <View style={styles.performanceSection}>
            <Text style={styles.sectionTitle}>Performance Metrics</Text>
            
            <Animated.View style={[styles.metricCard, createMetricCardStyle(metricCard1Opacity, metricCard1Scale)]}>
              <Text style={styles.metricTitle}>Matches per Year</Text>
              <Text style={styles.metricValue}>
                {(stats.matches / 5).toFixed(1)}
              </Text>
              <Text style={styles.metricSubtext}>
                Based on 5-year career average
              </Text>
            </Animated.View>

            {stats.runs > 0 && (
              <Animated.View style={[styles.metricCard, createMetricCardStyle(metricCard2Opacity, metricCard2Scale)]}>
                <Text style={styles.metricTitle}>Runs per Match</Text>
                <Text style={styles.metricValue}>
                  {(stats.runs / stats.matches).toFixed(1)}
                </Text>
                <Text style={styles.metricSubtext}>
                  Career average scoring rate
                </Text>
              </Animated.View>
            )}

            {stats.wickets > 0 && (
              <Animated.View style={[styles.metricCard, createMetricCardStyle(metricCard3Opacity, metricCard3Scale)]}>
                <Text style={styles.metricTitle}>Wickets per Match</Text>
                <Text style={styles.metricValue}>
                  {(stats.wickets / stats.matches).toFixed(2)}
                </Text>
                <Text style={styles.metricSubtext}>
                  Career average wicket rate
                </Text>
              </Animated.View>
            )}
          </View>
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
  content: {
    flex: 1,
  },
  contentDesktop: {
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
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
