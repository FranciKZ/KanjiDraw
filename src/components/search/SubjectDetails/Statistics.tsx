import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchStatisticsBySubjectId } from '../../../redux/reducers/statisticsReducer';
import { RootState } from '../../../redux/store';
import { CollapsibleSection, Loading } from '../../shared';
import styles from './style';

type StatisticsProps = {
  subjectId: number;
};
const ICON_SCALING = 0.9;

function Statistics({ subjectId }: StatisticsProps) {
  const { data, loading } = useSelector((state: RootState) => (
    {
      data: state.statisticsState.statistics[subjectId],
      loading: state.statisticsState.loading[subjectId],
    }
  ));
  const dispatch = useAppDispatch();
  const renderHeaderText = (text: string) => <Text style={styles.headingText}>{text}</Text>;

  useEffect(() => {
    dispatch(fetchStatisticsBySubjectId(subjectId));
  }, [subjectId, dispatch]);

  useEffect(() => {
    console.log({ data });
  }, [data]);
  return (
    <Loading loading={loading}>
      <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
        {renderHeaderText('Statistics')}
        <Text>{`Percentage Correct: ${data.data.percentage_correct}`}</Text>
      </CollapsibleSection>
    </Loading>
  );
}

export default Statistics;
