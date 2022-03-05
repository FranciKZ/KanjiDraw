import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from '../../../util/Theme';
import styles from './style';

type ILevelSelector = {
  navigation: any;
};

function LevelSelector({ navigation }: ILevelSelector) {
  const theme = useTheme();
  const navigate = (levelNumber: number) => {
    navigation.navigate('SearchStackScreen', {
      screen: 'LevelDetail',
      params: { levelNumber },
    });
  };

  const generateLevels = () => {
    const elements: JSX.Element[] = [];
    const difficulties = ['快 PLEASANT', '苦 PAINFUL', '死 DEATH', '地獄 HELL', '天国 PARADISE', '現実 REALITY'];
    for (let i = 1; i <= 60; i += 1) {
      if ((i % 10 === 1 || i === 1)) {
        elements.push(
          <View key={`${i}-difficulties`} style={{ flexDirection: 'row', flexBasis: '100%' }}>
            <Text>{ i === 1 ? difficulties[0] : difficulties[((i - 1) / 10)]}</Text>
          </View>,
        );
      }
      elements.push(
        <TouchableWithoutFeedback
          key={i}
          style={[styles.individualItem, theme.primaryBorder, theme.primaryItemBackground]}
          onPress={() => navigate(i)}
        >
          <Text style={theme.primaryText}>{i}</Text>
        </TouchableWithoutFeedback>,
      );
    }

    return elements;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={theme.viewRow}>
        {generateLevels()}
      </View>
    </ScrollView>
  );
}

export default LevelSelector;
