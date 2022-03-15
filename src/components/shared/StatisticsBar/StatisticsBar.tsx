import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';

type StatisticsBarProps = {
  total: number;
  actualCorrect: number;
  displayAdditionalText?: boolean;
  totalBarStyle?: object;
  actualBarStyle?: object;
};

function StatisticsBar({
  total, actualCorrect, displayAdditionalText = true, totalBarStyle = {}, actualBarStyle = {},
}: StatisticsBarProps) {
  const percentageCorrect = `${((actualCorrect / total) * 100).toFixed(0)}%`;
  return (
    <>
      <View style={{ ...styles.totalBar, ...totalBarStyle }}>
        <View
          style={{
            ...styles.actualBar,
            width: `${percentageCorrect}`,
            ...actualBarStyle,
          }}
        >
          { displayAdditionalText && <Text style={styles.actualBarText}>{percentageCorrect}</Text>}
        </View>
      </View>
      {
        displayAdditionalText && (
          <View style={styles.rangeText}>
            <Text>0</Text>
            <Text>{total}</Text>
          </View>
        )
      }
    </>
  );
}

export default StatisticsBar;
