import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { HomeStackScreen, ProfileStackScreen, SearchStackScreen } from './screens';
import AppStorage from './util/AppStorage';
import { KeyPrompt } from './components';
import { ThemeContext, themes } from './util/Theme';
import store from './redux/store';

Icon.loadFont();

const Tab = createBottomTabNavigator();

const memoizedTabBarButton = (props: any) => <TouchableHighlight {...props} underlayColor="#DDDDDD" />;

const memoizedIcon = (
  { color, route }: { color: string, route: RouteProp<ParamListBase, string> },
) => {
  let iconName = 'home';
  if (route.name === 'ProfileStackScreen') {
    iconName = 'person';
  } else if (route.name === 'SearchStackScreen') {
    iconName = 'search';
  }

  return <Icon size={40} color={color} name={iconName} />;
};

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const setKey = async (key: string) => {
    await AppStorage.setSecureItem('waniKey', key);

    setModalVisible(false);
  };

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
    };

    getKey();
  }, []);

  return (
    <Provider store={store}>
      {
        modalVisible
          ? <KeyPrompt modalVisible={modalVisible} setKey={setKey} />
          : (
            <SafeAreaProvider>
              <ThemeContext.Provider value={themes.light}>
                <NavigationContainer>
                  <Tab.Navigator
                    screenOptions={({ route }) => ({
                      headerShown: false,
                      tabBarIcon: ({ color }) => memoizedIcon({ color, route }),
                      tabBarButton: memoizedTabBarButton,
                    })}
                  >
                    <Tab.Screen
                      name="HomeStackScreen"
                      component={HomeStackScreen}
                      options={{ tabBarShowLabel: false }}
                    />
                    <Tab.Screen
                      name="ProfileStackScreen"
                      component={ProfileStackScreen}
                      options={{ tabBarShowLabel: false }}
                    />
                    <Tab.Screen
                      name="SearchStackScreen"
                      component={SearchStackScreen}
                      options={{ tabBarShowLabel: false }}
                    />
                  </Tab.Navigator>
                </NavigationContainer>
              </ThemeContext.Provider>
            </SafeAreaProvider>
          )
      }
    </Provider>
  );
}
