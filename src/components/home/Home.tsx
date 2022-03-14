import React, { useEffect } from 'react';
import {
  RefreshControl, SafeAreaView, Text, View,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSummary } from '../../redux/reducers/summaryReducer';
import { RootState } from '../../redux/store';
import { useTheme } from '../../util/Theme';
import LevelBreakdown from './LevelBreakdown/levelBreakdown';
import styles from './style';

function Home() {
  const { summary, loading } = useSelector((state: RootState) => state.summaryState);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchUserSummary());
  }, [dispatch]);

  const calculateReviews = () => {
    let total = 0;
    if (summary?.data) {
      total = summary.data.reviews[0].subject_ids.length;
    }

    return total;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.mainView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => dispatch(fetchUserSummary())} />
        }
      >
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
        <LevelBreakdown />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
