import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#138808',
        tabBarInactiveTintColor: '#666',
        headerStyle: {
          backgroundColor: '#138808',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'All Players',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="batters"
        options={{
          title: 'Batters',
          tabBarIcon: ({ color }) => <TabBarIcon name="dot-circle-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bowlers"
        options={{
          title: 'Bowlers',
          tabBarIcon: ({ color }) => <TabBarIcon name="circle-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="all-rounders"
        options={{
          title: 'All Rounders',
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="keepers"
        options={{
          title: 'Keepers',
          tabBarIcon: ({ color }) => <TabBarIcon name="shield" color={color} />,
        }}
      />
    </Tabs>
  );
}
