import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';

type StatisticsBarProps = {
  total: number;
  actualCorrect: number;
};

function StatisticsBar({ total, actualCorrect }: StatisticsBarProps) {
  const percentageCorrect = `${((actualCorrect / total) * 100).toFixed(0)}%`;

  return (
    <>
      <View style={styles.totalBar}>
        <View
          style={{
            ...styles.actualBar,
            width: `${percentageCorrect}`,
          }}
        >
          <Text style={styles.actualBarText}>{percentageCorrect}</Text>
        </View>
      </View>
      <View style={styles.rangeText}>
        <Text>0</Text>
        <Text>{total}</Text>
      </View>
    </>
  );
}

export default StatisticsBar;
