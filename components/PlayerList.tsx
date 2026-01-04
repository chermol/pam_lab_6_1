import { FlatList, StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import players from '../data/players';

const ROLES = ['All', 'Batter', 'Bowler', 'All Rounder', 'Wicket Keeper'];

export default function PlayerList() {
  const router = useRouter();
  const { search, filter } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState((search as string) || '');
  const [selectedRole, setSelectedRole] = useState((filter as string) || 'All');
  const [filteredPlayers, setFilteredPlayers] = useState(players);

  useEffect(() => {
    // Update filtered players when search query or role filter changes
    let filtered = players;

    // Apply role filter
    if (selectedRole !== 'All') {
      filtered = filtered.filter((player) => player.style === selectedRole);
    }

    // Apply search filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((player) =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPlayers(filtered);
  }, [searchQuery, selectedRole]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    // Update URL query parameter
    if (text.trim() === '') {
      router.setParams({ search: undefined });
    } else {
      router.setParams({ search: text });
    }
  };

  const handleRoleFilter = (role: string) => {
    setSelectedRole(role);
    // Update URL query parameter
    if (role === 'All') {
      router.setParams({ filter: undefined });
    } else {
      router.setParams({ filter: role });
    }
  };

  const handlePlayerPress = (index: number) => {
    // Find the original index in the full players array
    const playerName = filteredPlayers[index].name;
    const originalIndex = players.findIndex((p) => p.name === playerName);
    router.push(`/player/${originalIndex}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
       View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {ROLES.map((role) => (
            <TouchableOpacity
              key={role}
              style={[
                styles.filterButton,
                selectedRole === role && styles.filterButtonActive,
              ]}
              onPress={() => handleRoleFilter(role)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedRole === role && styles.filterButtonTextActive,
                ]}
              >
                {role}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      < <TextInput
          style={styles.searchInput}
          placeholder="Search players..."
          value={searchQuery}
          onChangeText={handleSearchChange}
          autoCapitalize="words"
          autoCorrect={false}
          clearButtonMode="while-editing"
  filterContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 12,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#138808',
    borderColor: '#138808',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
        />
      </View>
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
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    height: 48,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listContent: {
    paddingVertical: 8,
  },
});