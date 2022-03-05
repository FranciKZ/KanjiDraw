import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../components';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={Home} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
