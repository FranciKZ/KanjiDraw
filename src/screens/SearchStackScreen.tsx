import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Search } from '../components';

const SearchStack = createStackNavigator();

export function SearchStackScreen() {
    return (
        <SearchStack.Navigator screenOptions={{ headerShown: false }}>
            <SearchStack.Screen name="SearchScreen" component={Search} />
        </SearchStack.Navigator>
    );
}