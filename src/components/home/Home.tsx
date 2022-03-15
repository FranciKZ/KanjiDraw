import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { ISummaryResponse, IUser } from '../../models';
import { fetchUserSummary } from '../../redux/reducers/summaryReducer';
import { fetchUserData } from '../../redux/reducers/userReducer';
import { RootState } from '../../redux/store';
import { Loading } from '../shared';
import LevelBreakdown from './LevelBreakdown/levelBreakdown';
import QuizButtons from './QuizButtons/QuizButtons';

type HomeData = {
  summary?: ISummaryResponse;
  user: IUser;
  loading: boolean;
};

type HomeSection = {
  section: string;
  id: string;
};

const homeSections: HomeSection[] = [
  { section: 'quizButtons', id: 'quizButtonsSection' },
  { section: 'levelBreakdown', id: 'levelBreakdownSection' },
];

function Home() {
  const { summary, loading, user } = useSelector<RootState, HomeData>((state) => (
    {
      summary: state.summaryState.summary,
      user: state.userState.user,
      loading: state.summaryState.loading || state.userState.loading,
    }
  ));
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    dispatch(fetchUserSummary());
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const sectionRenderer = (item: HomeSection) => {
    switch (item.section) {
      case 'quizButtons':
        return <QuizButtons summary={summary} />;
      case 'levelBreakdown':
        return (
          <View>
            <LevelBreakdown level={user?.data?.level} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loading loading={loading}>
        <FlatList
          onRefresh={loadData}
          refreshing={loading}
          data={homeSections}
          renderItem={({ item }: { item: HomeSection }) => sectionRenderer(item)}
        />
      </Loading>
    </SafeAreaView>
  );
}

export default Home;
