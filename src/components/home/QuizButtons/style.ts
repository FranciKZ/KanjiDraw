import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    height: 200,
  },
  touchable: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  touchableMainText: {
    fontSize: 22,
  },
  itemCountView: {
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  itemCountText: {
    fontSize: 20,
  },
});

export default styles;
