import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LevelSelector from './LevelSelector/LevelSelector';

type ISearchHomeProps = {
  navigation: any;
};

function SearchHome({ navigation }: ISearchHomeProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LevelSelector navigation={navigation} />
    </SafeAreaView>
  );
}

export default SearchHome;
