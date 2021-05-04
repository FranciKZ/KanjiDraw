import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { IContextSentence, IKanjiReading, IMeaning, IPronunciation, ISubject } from '../../models'
import { useTheme } from '../../util/Theme';
import { WaniWrapper } from '../../util/WaniWrapper';
import { CollapsibleSection } from '../shared/CollapsibleSection';
import { Markup } from '../shared/Markup';
import { Subject } from '../shared/Subject';
import SubjectButton from '../shared/SubjectButton';
import Icon from 'react-native-vector-icons/Fontisto';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SoundPlayer from 'react-native-sound-player'
Icon.loadFont();
interface ISubjectDetailsProps {
    route: any;
    navigation: any;
}

const ICON_SCALING = 0.75;
interface ISubjectDetailsState {
    subject: ISubject | undefined;
    components: ISubject[] | undefined;
    amalgamations: ISubject[] | undefined;
    visuallySimilar: ISubject[] | undefined;
}

export function SubjectDetails({ route, navigation }: ISubjectDetailsProps) {
    const theme = useTheme();
    const { subjectId } = route.params;
    const [subjectState, setSubjectState] = useState<ISubjectDetailsState>();

    useEffect(() => {
        const getSubject = async () => {
            // once this returns, we'll have to fetch study materials, and all amalgamation/component/visual similar subjects
            // Almagamation = this subject is a part of said subject
            // Components = subjects that make up this subject
            const subjectData = await WaniWrapper.getAllSubjectData(subjectId);

            setSubjectState(subjectData);
        };

        getSubject();
    }, [])

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
            debugger;
        } catch (e) {
            console.log(e);
        }
    }

    const renderRadical = () => {
        return (
            <>
                <CollapsibleSection>
                    <Text>Name</Text>
                    <View>
                        <Text>Primary: {subjectState!.subject!.data.meanings[0].meaning}</Text>
                        <Text>Meaning: </Text><Markup>{subjectState!.subject!.data.meaning_mnemonic}</Markup>
                    </View>
                </CollapsibleSection>
                <CollapsibleSection>
                    <Text>Found in Kanji</Text>
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
                <CollapsibleSection>
                    {renderHeaderText('Radical Composition')}
                    <View style={theme.viewRow}>
                        {radicalComponents}
                    </View>
                </CollapsibleSection>
                <CollapsibleSection>
                    {renderHeaderText('Meaning')}
                    <View>
                        <Text>Primary: {primaryMeaning}</Text>
                        <Text>Meaning: </Text><Markup>{subjectState!.subject!.data.meaning_mnemonic}</Markup>
                    </View>
                </CollapsibleSection>
                <CollapsibleSection>
                    {renderHeaderText('Readings')}
                    <View>
                        <View style={styles.readingViewRow}>
                            <View>
                                <Text>On'yomi</Text>
                                <Text>
                                    {readingConjoiner('onyomi')}
                                </Text>
                            </View>
                            <View>
                                <Text>Kun'yomi</Text>
                                <Text>
                                    {readingConjoiner('kunyomi')}
                                </Text>
                            </View>
                            <View>
                                <Text>Nanori</Text>
                                <Text>
                                    {readingConjoiner('nanori')}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text>Mnemonic</Text>
                            <Markup>{subjectState!.subject!.data.reading_mnemonic!}</Markup>
                        </View>
                    </View>
                </CollapsibleSection>
                {
                    subjectState!.visuallySimilar!.length > 0 &&
                    <CollapsibleSection>
                        {renderHeaderText('Visual Similar Kanji')}
                        <View style={theme.viewRow}>
                            {visuallySimilar}
                        </View>
                    </CollapsibleSection>
                }
                <CollapsibleSection>
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

        const readingViews = subjectState!.subject!.data.readings!.map((val: IKanjiReading, idx: number) => {
            // TODO: Move this to a dictionary probably maybe perhaps
            // Audio filtering isn't working exactly because wanikani has the pronunciatiosn entirely in hiragana
            // and some readings are in katakana
            // Audio playback not exactly working at all
            const audioObjects = subjectState!.subject!.data.pronunciation_audios!
                .filter((pronunciation: IPronunciation) => {
                    const contentType = pronunciation.content_type === 'audio/mpeg';
                    const pronuncatiat = pronunciation.metadata.pronunciation === val.reading;
                    return contentType && pronuncatiat;
                });

            return (
                <View key={idx} style={styles.readingViewRow}>
                    <Text>{val.reading}</Text>
                    {
                        audioObjects.map((val: IPronunciation, idx: number) => (
                            <TouchableWithoutFeedback onPress={() => playAudio(val.url)}>
                                <Icon size={15} name='playstation' />
                            </TouchableWithoutFeedback>
                        ))
                    }
                </View>
            );
        });

        const contextSentences = subjectState!.subject!.data.context_sentences!.map((val: IContextSentence, idx: number) => (
            <View key={idx} style={styles.rowView}>
                <Text>{val.ja}</Text>
                <Text>{val.en}</Text>
            </View>
        ));

        const kanjiComposition = subjectState!.components!.map((val: ISubject, idx: number) => (
            <SubjectButton key={idx} item={val} navigation={navigation} push={true} />
        ));

        return (
            <>
                <CollapsibleSection>
                    {renderHeaderText('Meaning')}
                    <View>
                        <Text>Primary: {subjectState!.subject!.data.meanings[0].meaning}</Text>
                        {
                            alternativeMeanings !== '' && <Text>Alternative: {meaningConjoiner()}</Text>
                        }
                        <Text>Explanation: </Text><Markup>{subjectState!.subject!.data.meaning_mnemonic}</Markup>
                    </View>
                </CollapsibleSection>
                <CollapsibleSection>
                    {renderHeaderText('Readings')}
                    <View>
                        {readingViews}
                        <Markup>{subjectState!.subject!.data.reading_mnemonic!}</Markup>
                    </View>
                </CollapsibleSection>
                <CollapsibleSection>
                    {renderHeaderText('Context Sentences')}
                    <View>
                        {contextSentences}
                    </View>
                </CollapsibleSection>
                <CollapsibleSection>
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
        <SafeAreaView edges={['right', 'left', 'top']} style={{ marginRight: 5, marginLeft: 5 }}>
            <ScrollView>
                {
                    subjectState &&
                    <>
                        <View style={[theme.viewRow, styles.subjectHeader]}>
                            <View>
                                <Subject item={subjectState.subject!} displayExtraData={false} />
                            </View>
                        </View>
                        {renderSections()}
                    </>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 20
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