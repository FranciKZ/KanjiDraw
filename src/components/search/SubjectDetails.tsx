import React, { useEffect, useMemo } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { IContextSentence, IKanjiReading, IMeaning, IPronunciation, ISubject } from '../../models'
import { useTheme } from '../../util/Theme';
import { CollapsibleSection, Loading, Markup, Subject, SubjectButton, StyledText } from '../shared';
import Icon from 'react-native-vector-icons/Fontisto';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SoundPlayer from 'react-native-sound-player'
import { isKatakana, toHiragana } from 'wanakana';
import { RootState } from '../../redux/store';
import { fetchSubjectById } from '../../redux/reducers/subjectReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
Icon.loadFont();

type ISubjectDetailsProps = {
    route: any;
    navigation: any;
}

type AudioMap = Record<string, IPronunciation[]>;

const ICON_SCALING = 0.9;
type ISubjectDetailsState = {
    subject: ISubject | undefined;
    components: ISubject[];
    amalgamations: ISubject[];
    visuallySimilar: ISubject[];
    loading: boolean;
}

// double loading icon might be because we add to the stack and then transition away
// so current route intiates loading
// open "rndebugger://set-debugger-loc?host=localhost&port=8081"
function SubjectDetails({ route, navigation }: ISubjectDetailsProps) {
    const theme = useTheme();
    const { subjectId } = route.params;
    const { subject, amalgamations, visuallySimilar, components, loading } = useAppSelector((state: RootState) => {
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
        })
        result.subject.data.visually_similar_subject_ids?.forEach((val: number) => {
          result.visuallySimilar.push(state.subjectState.subjects[val]);
        })
      }

      return result;
    })
    const dispatch = useAppDispatch();

    const subjectsAreGood = useMemo(() => {
      const amalgamationsGood = subject?.data.amalgamation_subject_ids ? subject.data.amalgamation_subject_ids?.every((val: number) => !!amalgamations.find((subj: ISubject) => subj && subj.id === val)) : true;
      const componentsGood = subject?.data.component_subject_ids ? subject.data.component_subject_ids.every((val: number) => !!components.find((subj: ISubject) => subj && subj.id === val)) : true;
      const visuallySimGood = subject?.data.visually_similar_subject_ids ? subject.data.visually_similar_subject_ids?.every((val: number) => !!visuallySimilar.find((subj: ISubject) => subj && subj.id === val)) : true;
      return !!subject && !!amalgamationsGood && componentsGood && visuallySimGood;
    }, [subject, amalgamations, components, visuallySimilar])

    useEffect(() => {
      dispatch(fetchSubjectById(subjectId))
    }, [])

    const renderSections = (): JSX.Element => {
        let result: JSX.Element = <></>;

        if (subject!.object === 'radical') {
            result = renderRadical();
        } else if (subject!.object === 'kanji') {
            result = renderKanji();
        } else {
            result = renderVocab();
        }

        return result;
    }

    const playAudio = (url: string) => {
        try {
            SoundPlayer.playUrl(url);
        } catch (e) {
            console.log(e);
        }
    }

    const renderRadical = () => {
        return (
            <>
                <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                    {renderHeaderText('Name')}
                    <View>
                        <StyledText>Primary: {subject!.data.meanings[0].meaning}</StyledText>
                        <StyledText>Meaning: </StyledText><Markup>{subject!.data.meaning_mnemonic}</Markup>
                    </View>
                </CollapsibleSection>
                <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                    {renderHeaderText('Found in Kanji')}
                    <View style={theme.viewRow}>
                        {
                            amalgamations.map((val: ISubject, index: number) => {
                                return <SubjectButton key={index} item={val} navigation={navigation} push={true} />
                            })
                        }
                    </View>
                </CollapsibleSection>
            </>
        );
    }

    const readingConjoiner = (type: string) => {
        return subject!.data.readings!
            .filter((val: IKanjiReading) => val.type === type)
            .reduce((prevValue: string, currVal: IKanjiReading, idx: number) => {
                return idx === 0 ? currVal.reading : prevValue + ', ' + currVal.reading;
            }, '')
    }

    const meaningConjoiner = () => {
        return subject!.data.meanings!
            .filter((val: IMeaning) => !val.primary)
            .reduce((prevValue: string, currVal: IMeaning, idx: number) => {
                return idx === 0 ? currVal.meaning : prevValue + ', ' + currVal.meaning;
            }, '');
    }

    const renderKanji = () => {
        const radicalComponents = components!.map((val: ISubject, index: number) => {
            return <SubjectButton key={index} item={val} navigation={navigation} push={true} />
        });

        const visSim = visuallySimilar!.map((val: ISubject, index: number) => {
            return <SubjectButton key={index} item={val} navigation={navigation} push={true} />
        });

        const foundInVocab = amalgamations!.map((val: ISubject, index: number) => {
            return <SubjectButton key={index} item={val} navigation={navigation} push={true} />
        });

        const primaryMeaning = subject!.data.meanings.filter((val: IMeaning) => val.primary === true)[0].meaning;

        return (
            <>
                <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                    {renderHeaderText('Radical Composition')}
                    <View style={theme.viewRow}>
                        {radicalComponents}
                    </View>
                </CollapsibleSection>
                <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                    {renderHeaderText('Meaning')}
                    <View>
                        <StyledText>Primary: {primaryMeaning}</StyledText>
                        <StyledText>Meaning: </StyledText><Markup>{subject!.data.meaning_mnemonic}</Markup>
                    </View>
                </CollapsibleSection>
                <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                    {renderHeaderText('Readings')}
                    <View>
                        <View style={styles.readingViewRow}>
                            <View>
                                <StyledText>On'yomi</StyledText>
                                <StyledText>
                                    {readingConjoiner('onyomi')}
                                </StyledText>
                            </View>
                            <View>
                                <StyledText>Kun'yomi</StyledText>
                                <StyledText>
                                    {readingConjoiner('kunyomi')}
                                </StyledText>
                            </View>
                            <View>
                                <StyledText>Nanori</StyledText>
                                <StyledText>
                                    {readingConjoiner('nanori')}
                                </StyledText>
                            </View>
                        </View>
                        <View>
                            <StyledText>Mnemonic: </StyledText><Markup>{subject!.data.reading_mnemonic!}</Markup>    
                        </View>
                    </View>
                </CollapsibleSection>
                {
                    visSim!.length > 0 &&
                    <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                        {renderHeaderText('Visual Similar Kanji')}
                        <View style={theme.viewRow}>
                            {visSim}
                        </View>
                    </CollapsibleSection>
                }
                <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                    {renderHeaderText('Found in Vocab')}
                    <View>
                        {foundInVocab}
                    </View>
                </CollapsibleSection>
            </>
        );
    }

    const renderVocab = () => {
        const alternativeMeanings = meaningConjoiner();
        const audioObjectsMap: AudioMap = subject!.data.pronunciation_audios!
            .filter((val: IPronunciation) => val.content_type === 'audio/mpeg')
            .reduce((prev: AudioMap, curVal: IPronunciation, index: number) => (
                {
                    ...prev,
                    [curVal.metadata.pronunciation]: prev[curVal.metadata.pronunciation] ? [...prev[curVal.metadata.pronunciation], curVal] : [curVal]
                }
            ), {});

        const readingViews = subject!.data.readings!.map((val: IKanjiReading, idx: number) => {
            const audioObjects = audioObjectsMap[toHiragana(val.reading)];
            return (
                <View key={idx} style={styles.readingViewRow}>
                    <StyledText>{val.reading}</StyledText>
                    {
                        audioObjects.map((pronunciation: IPronunciation, idx: number) => (
                            <TouchableWithoutFeedback key={`${val.reading}-${idx}`} touchSoundDisabled={true} onPress={() => playAudio(pronunciation.url)}>
                                <Icon size={15} name='playstation' />
                            </TouchableWithoutFeedback>
                        ))
                    }
                </View>
            );
        });

        const contextSentences = subject!.data.context_sentences!.map((val: IContextSentence, idx: number) => (
            <View key={idx} style={styles.rowView}>
                <StyledText>{val.ja}</StyledText>
                <StyledText style={styles.normalText}>{val.en}</StyledText>
            </View>
        ));

        const kanjiComposition = components!.map((val: ISubject, idx: number) => (
            <SubjectButton key={idx} item={val} navigation={navigation} push={true} />
        ));

        return (
            <>
                <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                    {renderHeaderText('Meaning')}
                    <View>
                        <StyledText>Primary: {subject!.data.meanings[0].meaning}</StyledText>
                        {
                            alternativeMeanings !== '' && <StyledText>Alternative: {alternativeMeanings}</StyledText>
                        }
                        <StyledText>Explanation: </StyledText><Markup>{subject!.data.meaning_mnemonic}</Markup>
                    </View>
                </CollapsibleSection>
                <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                    {renderHeaderText('Readings')}
                    <View>
                        {readingViews}
                        <Markup>{subject!.data.reading_mnemonic!}</Markup>
                    </View>
                </CollapsibleSection>
                <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                    {renderHeaderText('Context Sentences')}
                    <View>
                        {contextSentences}
                    </View>
                </CollapsibleSection>
                <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                    {renderHeaderText('Kanji Composition')}
                    <View style={theme.viewRow}>
                        {kanjiComposition}
                    </View>
                </CollapsibleSection>
            </>
        );
    }

    const renderHeaderText = (text: string) => {
        return <Text style={styles.headingText}>{text}</Text>;
    }

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
    )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 20
    },
    normalText: {
        fontSize: 15
    },  
    readingViewRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    subjectHeader: {
        margin: 10
    },
    rowView: {
        flexDirection: 'column'
    }
});

export default SubjectDetails;