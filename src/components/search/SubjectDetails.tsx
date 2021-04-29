import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { IKanjiReading, ISubject } from '../../models'
import { WaniWrapper } from '../../util/WaniWrapper';
import { CollapsibleSection } from '../shared/CollapsibleSection';
import { Markup } from '../shared/Markup';
import SubjectButton from '../shared/SubjectButton';
interface ISubjectDetailsProps {
    route: any;
    navigation: any;
}

interface ISubjectDetailsState {
    subject: ISubject | undefined;
    components: ISubject[] | undefined;
    amalgamations: ISubject[] | undefined;
    visuallySimilar: ISubject[] | undefined;
}

export function SubjectDetails({ route, navigation }: ISubjectDetailsProps) {
    const { subjectId } = route.params;
    const [subjectState, setSubjectState] = useState<ISubjectDetailsState>();

    useEffect(() => {
        const getSubject = async () => {
            // once this returns, we'll have to fetch study materials, and all amalgamation/component/visual similar subjects
            // Almagamation = this subject is a part of said subject
            // Components = subjects that make up this subject
            const subject = await WaniWrapper.getSubject(subjectId);
            let amalgamations = undefined;
            let components = undefined;
            let visuallySimilar = undefined;

            if (subject.object !== 'vocabulary') {
                const amalgamationsResponse = await WaniWrapper.getSubjects(subject.data.amalgamation_subject_ids!);

                if (subject.object === 'kanji') {
                    const componentResponse = await WaniWrapper.getSubjects(subject.data.component_subject_ids!);
                    const visuallySimilarResponse = await WaniWrapper.getSubjects(subject.data.visually_similar_subject_ids!);
                    components = componentResponse.data;
                    visuallySimilar = visuallySimilarResponse.data;
                }

                amalgamations = amalgamationsResponse.data;
            } else {
                const componentSubjectsResponse = await WaniWrapper.getSubjects(subject.data.component_subject_ids!);
                components = componentSubjectsResponse.data;
            }

            setSubjectState({
                subject,
                components,
                amalgamations,
                visuallySimilar
            });
        };

        getSubject();
    }, [])

    const renderSections = (): JSX.Element => {
        let result: JSX.Element = <></>;

        if (subjectState) {
            if (subjectState.subject!.object === 'radical') {
                result = renderRadical();
            } else if (subjectState.subject!.object === 'kanji') {
                result = renderKanji();
            } else {
                result = renderVocab();
            }
        }

        return result;
    }

    const renderRadical = () => {
        return (
            <>
                <CollapsibleSection iconSize={30}>
                    <Text>Name</Text>
                    <View>
                        <Text>Primary: {subjectState!.subject!.data.meanings[0].meaning}</Text>
                        <Text>Meaning: </Text><Markup>{subjectState!.subject!.data.meaning_mnemonic}</Markup>
                    </View>
                </CollapsibleSection>
                <CollapsibleSection iconSize={30}>
                    <Text>Found in Kanji</Text>
                    <View style={styles.viewRow}>
                        {
                            subjectState!.amalgamations!.map((val: ISubject, index: number) => {
                                return <SubjectButton key={index} item={val} navigation={navigation} push={true}  />
                            })
                        }
                    </View>
                </CollapsibleSection>
            </>
        );
    }

    const renderKanji = () => {
        return (
            <>
                <CollapsibleSection iconSize={30}>
                    <Text>Radical Composition</Text>
                    <View>
                        {
                            subjectState!.components!.map((val: ISubject, index: number) => {
                                return <SubjectButton key={index} item={val} navigation={navigation} push={true} />
                            })
                        }
                    </View>
                </CollapsibleSection>
                <CollapsibleSection iconSize={30}>
                    <Text>Meaning</Text>
                    <View>
                        <Text>Primary: {subjectState!.subject!.data.meanings[0].meaning}</Text>
                        <Text>Meaning: </Text><Markup>{subjectState!.subject!.data.meaning_mnemonic}</Markup>
                    </View>
                </CollapsibleSection>
                <CollapsibleSection iconSize={30}>
                    <Text>Readings</Text>
                    <View>
                        <View style={styles.readingViewRow}>
                            <View>
                                <Text>On'yomi</Text>
                                <Text>
                                    {
                                        subjectState!.subject!.data.readings?.filter((val: IKanjiReading) => val.type === 'onyomi')
                                            .reduce((prevValue: string, currVal: IKanjiReading, idx: number) => {
                                                return idx === 0 ? currVal.reading : prevValue + ', ' + currVal.reading;
                                            }, '')
                                    }
                                </Text>
                            </View>
                            <View>
                                <Text>Kun'yomi</Text>
                                <Text>
                                    {
                                        subjectState!.subject!.data.readings?.filter((val: IKanjiReading) => val.type === 'kunyomi')
                                            .reduce((prevValue: string, currVal: IKanjiReading, idx: number) => {
                                                return idx === 0 ? currVal.reading : prevValue + ', ' + currVal.reading;
                                            }, '')
                                    }
                                </Text>
                            </View>
                            <View>
                                <Text>Nanori</Text>
                                <Text>
                                    {
                                        subjectState!.subject!.data.readings?.filter((val: IKanjiReading) => val.type === 'nanori')
                                            .reduce((prevValue: string, currVal: IKanjiReading, idx: number) => {
                                                return idx === 0 ? currVal.reading : prevValue + ', ' + currVal.reading;
                                            }, '')
                                    }
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text>Mnemonic</Text>
                            <Markup>{subjectState!.subject!.data.reading_mnemonic!}</Markup>
                        </View>
                    </View>
                </CollapsibleSection>
                <CollapsibleSection iconSize={30}>
                    <Text>Visual Similar Kanji</Text>
                    <View>
                        {
                            subjectState!.visuallySimilar!.map((val: ISubject, index: number) => {
                                return <SubjectButton key={index} item={val} navigation={navigation} push={true} />
                            })
                        }
                    </View>
                </CollapsibleSection> 
                <CollapsibleSection iconSize={30}>
                    <Text>Visual Similar Kanji</Text>
                    <View>
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

    const renderVocab = () => {
        return (
            <CollapsibleSection iconSize={30}>
                <Text>Meaning</Text>
                <View>
                    <Text>Primary: {subjectState!.subject!.data.meanings[0].meaning}</Text>
                    <Text>Explanation: </Text><Markup>{subjectState!.subject!.data.meaning_mnemonic}</Markup>
                </View>
            </CollapsibleSection>
        );
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {renderSections()}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    viewRow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    readingViewRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});