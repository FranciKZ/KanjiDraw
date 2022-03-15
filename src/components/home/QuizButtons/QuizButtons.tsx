import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ISummaryResponse } from '../../../models';
import { useTheme } from '../../../util/Theme';
import styles from './style';

type QuizButtonProps = {
  summary?: ISummaryResponse;
};

function QuizButtons({ summary }: QuizButtonProps) {
  const theme = useTheme();

  const calculateReviews = () => {
    let total = 0;
    if (summary?.data) {
      total = summary.data.reviews[0].subject_ids.length;
    }

    return total;
  };

  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        style={{
          ...styles.touchable,
          backgroundColor: theme.primaryKanji.color,
          ...theme.secondaryBorder,
        }}
      >
        <Text style={[styles.touchableMainText, theme.secondaryText]}>Lessons</Text>
        <View style={{ ...styles.itemCountView, backgroundColor: theme.secondaryText.color }}>
          <Text style={[theme.primaryText, styles.itemCountText]}>
            {
            summary
              ? summary.data.lessons[0].subject_ids.length
              : 0
          }
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.touchable,
          backgroundColor: theme.primaryRadical.color,
          ...theme.secondaryBorder,
        }}
      >
        <Text style={[styles.touchableMainText, theme.secondaryText]}>Reviews</Text>
        <View style={{ ...styles.itemCountView, backgroundColor: theme.secondaryText.color }}>
          <Text style={[theme.primaryText, styles.itemCountText]}>{calculateReviews()}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default QuizButtons;
