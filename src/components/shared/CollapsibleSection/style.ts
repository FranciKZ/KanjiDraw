import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  touchableNoBorder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchableBorder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(80, 80, 80, 0.5)',
  },
  childrenView: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default style;
