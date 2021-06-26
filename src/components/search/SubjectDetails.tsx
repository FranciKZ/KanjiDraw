import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { IContextSentence, IKanjiReading, IMeaning, IPronunciation, ISubject } from '../../models'
import { useTheme } from '../../util/Theme';
import { CollapsibleSection, Loading, Markup, Subject, SubjectButton, StyledText } from '../shared';
import Icon from 'react-native-vector-icons/Fontisto';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SoundPlayer from 'react-native-sound-player'
import { isKatakana, toHiragana } from 'wanakana';
import { RequestSubjects } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { subjectsAreGood } from '../../util/subjectHelpers';
Icon.loadFont();

interface ISubjectDetailsProps extends ReduxProps {
    route: any;
    navigation: any;
}

type AudioMap = Record<string, IPronunciation[]>;

const ICON_SCALING = 0.9;
interface ISubjectDetailsState {
    subject: ISubject | undefined;
    components: ISubject[] | undefined;
    amalgamations: ISubject[] | undefined;
    visuallySimilar: ISubject[] | undefined;
}

function SubjectDetails({ route, navigation, subjects, getSubject }: ISubjectDetailsProps) {
    const theme = useTheme();
    const { subjectId } = route.params;
    const [subjectState, setSubjectState] = useState<ISubjectDetailsState>();
    
    useEffect(() => {
        getSubject(subjectId);
    }, [])

    useEffect(() => {
        if (subjectsAreGood(subjects, subjectId)) {
            const subject = subjects[subjectId];
            const components = subject.data.component_subject_ids?.map((val: number) => subjects[val]);
            const amalgamations = subject.data.amalgamation_subject_ids?.map((val: number) => subjects[val]);
            const visuallySimilar = subject.data.visually_similar_subject_ids?.map((val: number) => subjects[val]);
            setSubjectState({ subject, components, amalgamations, visuallySimilar });
        }
    }, [subjects])

    const renderSections = (): JSX.Element => {
        let result: JSX.Element = <></>;

        if (subjectState!.subject!.object === 'radical') {
            result = renderRadical();
        } else if (subjectState!.subject!.object === 'kanji') {
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
                        <StyledText>Primary: {subjectState!.subject!.data.meanings[0].meaning}</StyledText>
                        <StyledText>Meaning: </StyledText><Markup>{subjectState!.subject!.data.meaning_mnemonic}</Markup>
                    </View>
                </CollapsibleSection>
                <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                    {renderHeaderText('Found in Kanji')}
                    <View style={theme.viewRow}>
                        {
                            subjectState!.amalgamations!.map((val: ISubject, index: number) => {
                                return <SubjectButton key={index} item={val} navigation={navigation} push={true} />
                            })
                        }
                    </View>
                </CollapsibleSection>
            </>
        );
    }

    const readingConjoiner = (type: string) => {
        return subjectState!.subject!.data.readings!
            .filter((val: IKanjiReading) => val.type === type)
            .reduce((prevValue: string, currVal: IKanjiReading, idx: number) => {
                return idx === 0 ? currVal.reading : prevValue + ', ' + currVal.reading;
            }, '')
    }

    const meaningConjoiner = () => {
        return subjectState!.subject!.data.meanings!
            .filter((val: IMeaning) => !val.primary)
            .reduce((prevValue: string, currVal: IMeaning, idx: number) => {
                return idx === 0 ? currVal.meaning : prevValue + ', ' + currVal.meaning;
            }, '');
    }

    const renderKanji = () => {
        const radicalComponents = subjectState!.components!.map((val: ISubject, index: number) => {
            return <SubjectButton key={index} item={val} navigation={navigation} push={true} />
        });

        const visuallySimilar = subjectState!.visuallySimilar!.map((val: ISubject, index: number) => {
            return <SubjectButton key={index} item={val} navigation={navigation} push={true} />
        });

        const foundInVocab = subjectState!.amalgamations!.map((val: ISubject, index: number) => {
            return <SubjectButton key={index} item={val} navigation={navigation} push={true} />
        });

        const primaryMeaning = subjectState!.subject!.data.meanings.filter((val: IMeaning) => val.primary === true)[0].meaning;

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
                        <StyledText>Meaning: </StyledText><Markup>{subjectState!.subject!.data.meaning_mnemonic}</Markup>
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
                            <StyledText>Mnemonic: </StyledText><Markup>{subjectState!.subject!.data.reading_mnemonic!}</Markup>    
                        </View>
                    </View>
                </CollapsibleSection>
                {
                    subjectState!.visuallySimilar!.length > 0 &&
                    <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                        {renderHeaderText('Visual Similar Kanji')}
                        <View style={theme.viewRow}>
                            {visuallySimilar}
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
        const audioObjectsMap: AudioMap = subjectState!.subject!.data.pronunciation_audios!
            .filter((val: IPronunciation) => val.content_type === 'audio/mpeg')
            .reduce((prev: AudioMap, curVal: IPronunciation, index: number) => (
                {
                    ...prev,
                    [curVal.metadata.pronunciation]: prev[curVal.metadata.pronunciation] ? [...prev[curVal.metadata.pronunciation], curVal] : [curVal]
                }
            ), {});

        const readingViews = subjectState!.subject!.data.readings!.map((val: IKanjiReading, idx: number) => {
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

        const contextSentences = subjectState!.subject!.data.context_sentences!.map((val: IContextSentence, idx: number) => (
            <View key={idx} style={styles.rowView}>
                <StyledText>{val.ja}</StyledText>
                <StyledText style={styles.normalText}>{val.en}</StyledText>
            </View>
        ));

        const kanjiComposition = subjectState!.components!.map((val: ISubject, idx: number) => (
            <SubjectButton key={idx} item={val} navigation={navigation} push={true} />
        ));

        return (
            <>
                <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                    {renderHeaderText('Meaning')}
                    <View>
                        <StyledText>Primary: {subjectState!.subject!.data.meanings[0].meaning}</StyledText>
                        {
                            alternativeMeanings !== '' && <StyledText>Alternative: {alternativeMeanings}</StyledText>
                        }
                        <StyledText>Explanation: </StyledText><Markup>{subjectState!.subject!.data.meaning_mnemonic}</Markup>
                    </View>
                </CollapsibleSection>
                <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
                    {renderHeaderText('Readings')}
                    <View>
                        {readingViews}
                        <Markup>{subjectState!.subject!.data.reading_mnemonic!}</Markup>
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
        <Loading>
            <SafeAreaView edges={['right', 'left', 'top']} style={{ marginRight: 5, marginLeft: 5 }}>
                <ScrollView>
                    {
                        (subjectState && subjectState.subject) &&
                        <>
                            <View style={[theme.viewRow, styles.subjectHeader]}>
                                <View>
                                    <Subject item={subjectState.subject} displayExtraData={false} />
                                </View>
                            </View>
                            {renderSections()}
                        </>
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


const mapStateToProps = (state: RootState) => ({
    subjects: state.subjectState.subjects
});

const mapDispatchToProps = (dispatch: any) => ({
    getSubject: (id: number) => dispatch(RequestSubjects(id))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SubjectDetails);