import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { IKanjiReading, IMeaning, ISubject } from '../../models'
import { ThemeContext, useTheme } from '../../util/Theme';
import { WaniWrapper } from '../../util/WaniWrapper';
import { CollapsibleSection } from '../shared/CollapsibleSection';
import { Markup } from '../shared/Markup';
import { Subject } from '../shared/Subject';
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
                    <Text style={styles.headingText}>Radical Composition</Text>
                    <View style={theme.viewRow}>
                        {radicalComponents}
                    </View>
                </CollapsibleSection>
                <CollapsibleSection>
                    <Text style={styles.headingText}>Meaning</Text>
                    <View>
                        <Text>Primary: {primaryMeaning}</Text>
                        <Text>Meaning: </Text><Markup>{subjectState!.subject!.data.meaning_mnemonic}</Markup>
                    </View>
                </CollapsibleSection>
                <CollapsibleSection>
                    <Text style={styles.headingText}>Readings</Text>
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
                        <Text style={styles.headingText}>Visual Similar Kanji</Text>
                        <View style={theme.viewRow}>
                            {visuallySimilar}
                        </View>
                    </CollapsibleSection>
                }
                <CollapsibleSection>
                    <Text style={styles.headingText}>Found in Vocab</Text>
                    <View>
                        {foundInVocab}
                    </View>
                </CollapsibleSection>
            </>
        );
    }

    const renderVocab = () => {
        return (
            <CollapsibleSection>
                <Text>Meaning</Text>
                <View>
                    <Text>Primary: {subjectState!.subject!.data.meanings[0].meaning}</Text>
                    <Text>Explanation: </Text><Markup>{subjectState!.subject!.data.meaning_mnemonic}</Markup>
                </View>
            </CollapsibleSection>
        );
    }

    return (
        <SafeAreaView edges={['right', 'left', 'top']} style={{ marginRight: 5, marginLeft: 5 }}>
            <ScrollView>
                {
                    subjectState &&
                    <>
                        <View style={theme.viewRow}>
                            <Subject item={subjectState.subject!} />
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
        fontSize: 25
    },
    readingViewRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});