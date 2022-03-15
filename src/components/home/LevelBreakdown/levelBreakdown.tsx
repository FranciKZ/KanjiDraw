import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlatGrid } from 'react-native-super-grid';
import { IAssignmentData, ISubject } from '../../../models';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchAssignmentsByLevel } from '../../../redux/reducers/assignmentReducer';
import { fetchSubjectsByLevel } from '../../../redux/reducers/subjectReducer';
import { RootState } from '../../../redux/store';
import { Card, Loading, Subject } from '../../shared';
import StatisticsBar from '../../shared/StatisticsBar/StatisticsBar';

type LevelBreakdownProps = {
  level: number;
};

type LevelBreakdownState = {
  assignments: Record<string, IAssignmentData>,
  subjects: ISubject[],
  loading: boolean;
};

function LevelBreakdown({ level }: LevelBreakdownProps) {
  const { assignments, subjects, loading } = useSelector<RootState, LevelBreakdownState>(
    (state) => {
      if (level
        && state.subjectState.loading[level] === false
        && state.assignmentState.loading[level] === false) {
        const assignmentData: Record<string, IAssignmentData> = {};
        const subjectData = Object.keys(state.subjectState.subjects)
          .filter((val: string) => {
            const subject = state.subjectState.subjects[val];
            return subject.data.level === level && (subject.object === 'kanji' || subject.object === 'radical');
          })
          .map((val: string) => {
            assignmentData[val] = state.assignmentState.assignments[val];
            return state.subjectState.subjects[val];
          })
          .sort((a: ISubject, b: ISubject) => b.object.localeCompare(a.object));
        return { subjects: subjectData, assignments: assignmentData, loading: false };
      }
      return { subjects: [], assignments: {}, loading: true };
    },
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (level) {
      dispatch(fetchAssignmentsByLevel(level));
      dispatch(fetchSubjectsByLevel(level));
    }
  }, [dispatch, level]);

  const renderSubject = (subject: ISubject) => (
    <View
      style={{
        width: '10%', display: 'flex', alignContent: 'center',
      }}
    >
      <Subject
        item={subject}
        displayExtraData={false}
        containerStyles={{ minWidth: 40, minHeight: 40 }}
        characterStyles={{ fontSize: 25 }}
      />
      <StatisticsBar
        total={4}
        actualCorrect={
          assignments[subject.id].srs_stage > 4 ? 4 : assignments[subject.id].srs_stage
        }
        displayAdditionalText={false}
        totalBarStyle={{ minHeight: 5, width: 40 }}
        actualBarStyle={{ minHeight: 5, backgroundColor: 'rgb(8, 198, 108)' }}
      />
    </View>
  );

  return (
    <Card style={{ width: '95%', marginLeft: '2.5%' }}>
      <Text>Level Breakdown</Text>
      <Loading loading={loading}>
        <FlatGrid
          itemDimension={40}
          renderItem={({ item }) => renderSubject(item)}
          data={subjects}
          keyExtractor={(item) => `${item.id}`}
          spacing={12}
          scrollEnabled={false}
        />
      </Loading>
    </Card>
  );
}

export default LevelBreakdown;
