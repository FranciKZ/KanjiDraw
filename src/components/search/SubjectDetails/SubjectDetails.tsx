import React, { useEffect, useMemo } from 'react';
import {
  ScrollView, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Fontisto';
import { ISubject } from '../../../models';
import { useTheme } from '../../../util/Theme';
import { Loading, Subject } from '../../shared';
import { RootState } from '../../../redux/store';
import { fetchSubjectById } from '../../../redux/reducers/subjectReducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import styles from './style';
import Kanji from './Kanji ';
import Radical from './Radical';
import Vocab from './Vocab';

Icon.loadFont();

type ISubjectDetailsProps = {
  route: any;
};

type ISubjectDetailsState = {
  subject: ISubject | undefined;
  components: ISubject[];
  amalgamations: ISubject[];
  visuallySimilar: ISubject[];
  loading: boolean;
};

// double loading icon might be because we add to the stack and then transition away
// so current route intiates loading
// open "rndebugger://set-debugger-loc?host=localhost&port=8081"
function SubjectDetails({ route }: ISubjectDetailsProps) {
  const theme = useTheme();
  const { subjectId } = route.params;
  const {
    subject, amalgamations, visuallySimilar, components, loading,
  } = useAppSelector((state: RootState) => {
    const result: ISubjectDetailsState = {
      subject: undefined,
      components: [],
      amalgamations: [],
      visuallySimilar: [],
      loading: state.subjectState.loading[subjectId],
    };

    if (!result.loading && !!state.subjectState.subjects[subjectId]) {
      result.subject = state.subjectState.subjects[subjectId];
      result.subject.data.amalgamation_subject_ids?.forEach((val: number) => {
        result.amalgamations.push(state.subjectState.subjects[val]);
      });
      result.subject.data.component_subject_ids?.forEach((val: number) => {
        result.components.push(state.subjectState.subjects[val]);
      });
      result.subject.data.visually_similar_subject_ids?.forEach((val: number) => {
        result.visuallySimilar.push(state.subjectState.subjects[val]);
      });
    }

    return result;
  });
  const dispatch = useAppDispatch();

  const subjectsAreGood = useMemo(() => {
    const amalgamationsGood = subject?.data.amalgamation_subject_ids
      ? subject.data.amalgamation_subject_ids
        .every((val: number) => !!amalgamations.find((subj: ISubject) => subj && subj.id === val))
      : true;
    const componentsGood = subject?.data.component_subject_ids
      ? subject.data.component_subject_ids
        .every((val: number) => !!components.find((subj: ISubject) => subj && subj.id === val))
      : true;
    const visuallySimGood = subject?.data.visually_similar_subject_ids
      ? subject.data.visually_similar_subject_ids
        .every((val: number) => !!visuallySimilar.find((subj: ISubject) => subj && subj.id === val))
      : true;
    return !!subject && !!amalgamationsGood && componentsGood && visuallySimGood;
  }, [subject, amalgamations, components, visuallySimilar]);

  useEffect(() => {
    dispatch(fetchSubjectById(subjectId));
  }, [dispatch, subjectId]);

  const renderRadical = () => (
    <Radical
      subject={subject!}
      amalgamations={amalgamations}
    />
  );

  const renderKanji = () => (
    <Kanji
      subject={subject!}
      amalgamations={amalgamations}
      components={components}
      visuallySimilar={visuallySimilar}
    />
  );

  const renderVocab = () => (
    <Vocab
      subject={subject!}
      components={components}
    />
  );

  const renderSections = (): JSX.Element => {
    let result: JSX.Element;

    if (subject!.object === 'radical') {
      result = renderRadical();
    } else if (subject!.object === 'kanji') {
      result = renderKanji();
    } else {
      result = renderVocab();
    }

    return result;
  };

  return (
    <Loading loading={loading}>
      <SafeAreaView edges={['right', 'left', 'top']} style={{ marginRight: 5, marginLeft: 5 }}>
        <ScrollView>
          {
            subjectsAreGood && (
              <>
                <View style={[theme.viewRow, styles.subjectHeader]}>
                  <View>
                    <Subject item={subject!} displayExtraData={false} />
                  </View>
                </View>
                  {renderSections()}
              </>
            )
          }
        </ScrollView>
      </SafeAreaView>
    </Loading>
  );
}

export default SubjectDetails;
