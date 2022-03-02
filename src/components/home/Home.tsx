import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { ISummaryData, ISummaryResponse } from '../../models';
import { fetchUserSummary } from '../../redux/reducers/summaryReducer';
import { RootState } from '../../redux/store';
import { useTheme } from '../../util/Theme';
import { WaniWrapper } from '../../util/WaniWrapper';

export function Home() {
  const { summary, loading } = useSelector((state: RootState) => state.summaryState)
  const dispatch = useDispatch();
  const theme = useTheme();

  const fetchSummary = async () => {
    dispatch(fetchUserSummary())
  }

  useEffect(() => {
    fetchSummary();
  }, [])

  const calculateReviews = () => {
    let total = 0;
    if (summary?.data) {
      total = summary.data.reviews[0].subject_ids.length;
    }

    return total;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.mainView} refreshControl={<RefreshControl refreshing={loading} />}>
        <TouchableOpacity
          style={{ ...styles.touchable, backgroundColor: theme.primaryKanji.color, ...theme.secondaryBorder }}
        >
          <Text style={[styles.touchableMainText, theme.secondaryText]}>Lessons</Text>
          <View style={{...styles.itemCountView, backgroundColor: theme.secondaryText.color }}>
            <Text style={[theme.primaryText, styles.itemCountText]}>{
              summary
              ? summary.data.lessons[0].subject_ids.length
              : 0
            }</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.touchable, backgroundColor: theme.primaryRadical.color, ...theme.secondaryBorder }}
        >
          <Text style={[styles.touchableMainText, theme.secondaryText]}>Reviews</Text>
          <View style={{...styles.itemCountView, backgroundColor: theme.secondaryText.color }}>
              <Text style={[theme.primaryText, styles.itemCountText]}>{calculateReviews()}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainView: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        height: 200
    },
    touchable: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 140,
        borderRadius: 70
    },
    touchableMainText: {
        fontSize: 22
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
        fontSize: 20
    }
})