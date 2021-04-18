import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { LevelDetail, SearchHome, SubjectDetails } from '../components';

const SearchStack = createStackNavigator();

export function SearchStackScreen() {
    return (
        <SearchStack.Navigator screenOptions={{ headerShown: false }}>
            <SearchStack.Screen name='SearchHome' component={SearchHome} />
            <SearchStack.Screen name='LevelDetail' component={LevelDetail} />
            <SearchStack.Screen name='SubjectDetails' component={SubjectDetails}/>
        </SearchStack.Navigator>
    );
}