import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  individualItem: {
    minWidth: 80,
    margin: 1,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  alignTextElements: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  alignTextElementsRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
  },
  notVocab: {
    minHeight: 80,
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  charactersWithExtraContent: {
    fontSize: 35,
  },
  charactersWithoutExtraContent: {
    fontSize: 50,
  },
  readingAndMeaningText: {
    fontSize: 15,
    paddingTop: 3,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    zIndex: 10,
    position: 'absolute',
    top: 5,
    left: 5,
  },
});

export default styles;
