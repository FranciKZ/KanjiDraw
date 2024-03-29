import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from '../components';

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileScreen" component={Profile} />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;
