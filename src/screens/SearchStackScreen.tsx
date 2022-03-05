import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LevelDetail, SearchHome, SubjectDetails } from '../components';
// add cardStyle: { backgroundColor: '#fff' }
// to the screenOptions prop to change background color based on theme
const SearchStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchHome" component={SearchHome} />
      <SearchStack.Screen name="LevelDetail" component={LevelDetail} />
      <SearchStack.Screen name="SubjectDetails" component={SubjectDetails} />
    </SearchStack.Navigator>
  );
}

export default SearchStackScreen;
