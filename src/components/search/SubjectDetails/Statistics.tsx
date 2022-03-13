import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { IStatisticData } from '../../../models';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchStatisticsBySubjectId } from '../../../redux/reducers/statisticsReducer';
import { RootState } from '../../../redux/store';
import { CollapsibleSection, Loading } from '../../shared';
import StatisticsBar from '../../shared/StatisticsBar/StatisticsBar';
import styles from './style';

type StatisticsProps = {
  subjectId: number;
};
const ICON_SCALING = 0.9;

type StatisticsDataState = {
  data: IStatisticData;
  loading: boolean;
};

function Statistics({ subjectId }: StatisticsProps) {
  const { data, loading } = useSelector<RootState, StatisticsDataState>((state) => (
    {
      data: state.statisticsState.statistics[subjectId]?.data,
      loading: state.statisticsState.loading[subjectId],
    }
  ));
  const dispatch = useAppDispatch();
  const renderHeaderText = (text: string) => <Text style={styles.headingText}>{text}</Text>;

  useEffect(() => {
    dispatch(fetchStatisticsBySubjectId(subjectId));
  }, [subjectId, dispatch]);

  const barSection = () => {
    const combinedTotal = data.meaning_correct + data.meaning_incorrect
      + data.reading_correct + data.reading_incorrect;
    const readingTotal = data.reading_correct + data.reading_incorrect;
    const meaningTotal = data.meaning_correct + data.meaning_incorrect;
    return (
      <>
        <Text style={{ paddingTop: '2%' }}>Combined Correct</Text>
        <StatisticsBar
          total={combinedTotal}
          actualCorrect={data.meaning_correct + data.reading_correct}
        />
        <Text style={{ paddingTop: '2%' }}>Meaning Correct</Text>
        <StatisticsBar
          total={meaningTotal}
          actualCorrect={data.meaning_correct}
        />
        <Text style={{ paddingTop: '2%' }}>Reading Correct</Text>
        <StatisticsBar
          total={readingTotal}
          actualCorrect={data.reading_correct}
        />
      </>
    );
  };

  return (
    <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
      {renderHeaderText('Statistics')}
      <Loading loading={loading}>
        <View style={{ width: '100%' }}>
          {
            !data
              ? <Text>No statistical data for this subject</Text>
              : barSection()
          }
        </View>
      </Loading>
    </CollapsibleSection>
  );
}

export default Statistics;
