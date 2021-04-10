import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { HomeStackScreen, ProfileStackScreen, SearchStackScreen } from './src/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();
const Tab = createBottomTabNavigator();
// Create stack navigators for the 3 pages
// Each tab will have routes associated with them (ie. the specific kanji pages and such)

export default function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [waniKey, setWaniKey] = useState('');
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    useEffect(() => {
        const getKey = async () => {
            try {
                const key = await AsyncStorage.getItem('waniKey');

                if (key === null) {
                    setModalVisible(true);
                } else {
                    setWaniKey(key);
                }
            } catch (e) {
                // error
            }
        }

        getKey();
    }, [])

    return (
        <NavigationContainer>
            <Tab.Navigator 
                screenOptions={({ route }) => ({ 
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => {
                        let iconName = 'home';
                        if (route.name === 'ProfileStackScreen') {
                            iconName = 'person';
                        } else if (route.name === 'SearchStackScreen') {
                            iconName = 'search';
                        }

                        return <Icon size={40} color={color} name={iconName} />
                    },
                    tabBarButton: (props) => <TouchableHighlight {...props} underlayColor="#DDDDDD" />
                })}
            >
                <Tab.Screen
                    name='HomeStackScreen'
                    component={HomeStackScreen}
                    options={{ tabBarShowLabel: false }}
                />
                <Tab.Screen
                    name='ProfileStackScreen'
                    component={ProfileStackScreen}
                    options={{ tabBarShowLabel: false }}
                />
                <Tab.Screen
                    name='SearchStackScreen'
                    component={SearchStackScreen}
                    options={{ tabBarShowLabel: false }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        padding: 20
    },
    tabBarItem: {
        
    }
});
