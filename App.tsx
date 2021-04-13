import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { HomeStackScreen, ProfileStackScreen, SearchStackScreen } from './src/screens';
import { AppStorage } from './src/util/AppStorage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyPrompt } from './src/components';
Icon.loadFont();

const Tab = createBottomTabNavigator();

export default function App() {
    const [modalVisible, setModalVisible] = useState(false);

    const setKey = async (key: string) => {
        await AppStorage.setSecureItem('waniKey', key);

        setModalVisible(false);
    }

    useEffect(() => {
        const getKey = async () => {
            try {
                const key = await AppStorage.getSecureItem('waniKey');

                if (!key) {
                    setModalVisible(true);
                }
            } catch (e) {
                console.log(e);
            }
        }

        getKey();
    }, [])

    return (
        modalVisible 
        ? <KeyPrompt modalVisible={modalVisible} setKey={setKey} />
        :
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
    }   
});
