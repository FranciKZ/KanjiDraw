import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  totalBar: {
    width: '100%',
    backgroundColor: 'rgb(200,200,200)',
  },
  actualBar: {
    backgroundColor: 'rgb(71,71,71)',
  },
  actualBarText: {
    textAlign: 'right',
    width: '100%',
    color: 'white',
    paddingRight: '2%',
  },
  rangeText: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default styles;
