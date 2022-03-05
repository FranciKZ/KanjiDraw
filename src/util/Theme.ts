import { createContext, useContext } from 'react';
import { StyleSheet } from 'react-native';

export const themes = {
  light: StyleSheet.create({
    primaryKanji: {
      color: '#FF00AA',
    },
    primaryRadical: {
      color: '#00AAFF',
    },
    primaryVocab: {
      color: '#AA00FF',
    },
    primaryOther: {
      color: '#474747',
    },
    primaryBorder: {
      borderColor: 'rgba(102, 102, 102, 0.5)',
    },
    secondaryBorder: {
      borderColor: 'rgba(0,0,0,0.1)',
    },
    primaryText: {
      fontSize: 16,
    },
    secondaryText: {
      color: '#fff',
    },
    primaryItemBackground: {
      backgroundColor: '#fff',
    },
    viewRow: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    primaryCardBackground: {
      backgroundColor: '#fff',
    },
    primaryBurned: {
      color: 'rgb(80, 80, 80)',
    },
    primaryLocked: {
      color: 'rgb(205, 92, 92)',
    },
    primaryProgress: {
      color: 'rgb(124, 252, 0)',
    },
  }),
  dark: StyleSheet.create({
    primaryKanji: {
      color: '#FF00AA',
    },
    primaryRadical: {
      color: '#00AAFF',
    },
    primaryVocab: {
      color: '#AA00FF',
    },
    primaryOther: {
      color: '#474747',
    },
    primaryBorder: {
      borderColor: 'rgba(102, 102, 102, 0.5)',
    },
    secondaryBorder: {
      borderColor: 'rgba(0,0,0,0.1)',
    },
    primaryText: {
      color: '#707070',
    },
    primaryItemBackground: {
      backgroundColor: '#fff',
    },
    secondaryText: {
      color: '#fff',
    },
    primaryCardBackground: {
      backgroundColor: '#fff',
    },
    viewRow: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    primaryBurned: {
      color: 'rgb(80, 80, 80)',
    },
    primaryLocked: {
      color: 'rgb(205, 92, 92)',
    },
    primaryProgress: {
      color: 'rgb(124, 252, 0)',
    },
  }),
};

export const ThemeContext = createContext(themes.light);

export const useTheme = () => useContext(ThemeContext);
