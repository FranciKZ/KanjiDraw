import React, { useEffect } from 'react';
import {
  FlatList, Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ISubject } from '../../../models';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchLevelByNumber } from '../../../redux/reducers/levelReducer';
import { RootState } from '../../../redux/store';
import { useTheme } from '../../../util/Theme';
import {
  Card, Loading,
} from '../../shared';
import LevelDetailSection from './LevelDetailSection';
import style from './style';

type LevelDetailProps = {
  route: any;
};

type Section = {
  filter: string;
  displayText: string;
  id: string;
};

const sectionsList: Section[] = [
  { filter: 'title', displayText: 'title', id: 'title_section' },
  { filter: 'radical', displayText: 'Radicals', id: 'radical_section' },
  { filter: 'kanji', displayText: 'Kanji', id: 'kanji_section' },
  { filter: 'vocabulary', displayText: 'Vocabulary', id: 'vocab_section' },
];

function LevelDetail({ route }: LevelDetailProps) {
  const { levelNumber } = route.params;
  const { data, loading } = useAppSelector((state: RootState) => (
    { data: state.levelState.levels[levelNumber], loading: state.levelState.loading[levelNumber] }
  ));
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchLevelByNumber(levelNumber));
  }, [dispatch, levelNumber]);

  const renderSection = (
    { item }: { item: Section },
  ) => {
    let result = null;
    if (!loading && data) {
      if (item.filter === 'title') {
        <Card style={style.viewRow}>
          <Text style={{ ...theme.primaryText, fontSize: 30 }}>
            {`Level: ${levelNumber}`}
          </Text>
        </Card>;
      } else {
        const items = data
          .filter((val: ISubject) => val.object === item.filter && !val.data.hidden_at);

        result = (
          <LevelDetailSection
            numColumns={item.filter === 'vocabulary' ? 1 : 4}
            items={items}
            sectionText={item.displayText}
          />
        );
      }
    }

    return result;
  };

  return (
    <Loading loading={loading}>
      <SafeAreaView edges={['right', 'left', 'top']} style={{ marginRight: 5, marginLeft: 5 }}>
        <FlatList
          data={sectionsList}
          renderItem={renderSection}
          keyExtractor={(item: Section) => `${item.id}_${levelNumber}`}
        />
      </SafeAreaView>
    </Loading>
  );
}

export default LevelDetail;
