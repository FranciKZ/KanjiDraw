import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ISubject } from '../../models'
import { WaniWrapper } from '../../util/WaniWrapper';
import { CollapsibleSection } from '../shared/CollapsibleSection';
import { Markup } from '../shared/Markup';

interface ISubjectDetailsProps {
    route: any;
    navigation: any;
}

export function SubjectDetails({ route, navigation }: ISubjectDetailsProps) {
    const { subjectId } = route.params;
    const [subject, setSubject] = useState<ISubject | undefined>();

    useEffect(() => {
        const getSubject = async () => {
            // once this returns, we'll have to fetch study materials, and all amalgamation/component/visual similar subjects
            const subject = await WaniWrapper.getSubject(subjectId);
            setSubject(subject);
        };

        getSubject();
    }, [])

    const renderSections = (): JSX.Element => {
        let result: JSX.Element = <></>;

        if (subject) {
            if (subject.object === 'radical') {
                result = renderRadical();
            } else if (subject.object === 'kanji') {
                result = renderKanji();
            } else {
                result = renderVocab();
            }
        }

        return result;
    }

    const renderRadical = () => {
        return (
            <CollapsibleSection iconSize={30}>
                <Text>Name</Text>
                <View>
                    <Text>Primary: {subject!.data.meanings[0].meaning}</Text>
                    <Text>Meaning: <Markup>{subject!.data.meaning_mnemonic}</Markup></Text>
                </View>
            </CollapsibleSection>
        );
    }

    const renderKanji = () => {
        return (
            <CollapsibleSection iconSize={30}>
                <Text>Meaning</Text>
                <View>
                    <Text>Primary: {subject!.data.meanings[0].meaning}</Text>
                    <Text>Meaning: <Markup>{subject!.data.meaning_mnemonic}</Markup></Text>
                </View>
            </CollapsibleSection>
        );
    }

    const renderVocab = () => {
        return (
            <CollapsibleSection iconSize={30}>
                <Text>Meaning</Text>
                <View>
                    <Text>Primary: {subject!.data.meanings[0].meaning}</Text>
                    <Text>Explanation: <Markup>{subject!.data.meaning_mnemonic}</Markup></Text>
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
