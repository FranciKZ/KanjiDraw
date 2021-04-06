import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const Home: React.FC = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>Home Text</Text>
        </SafeAreaView>
    )
}

const Welcome: React.FC = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}> 
            <Text>Welcome text</Text>
        </SafeAreaView>
    )
}

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name='Home'
                    component={Home}
                />
                <Tab.Screen
                    name='Welcome'
                    component={Welcome}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        padding: 20
    }
});

export default App;
