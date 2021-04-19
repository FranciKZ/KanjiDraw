import React, { useEffect, useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ISubject } from '../../models'
import { WaniWrapper } from '../../util/WaniWrapper';

interface ISubjectDetailsProps {
    route: any;
    navigation: any;
}

export function SubjectDetails({ route, navigation }: ISubjectDetailsProps) {
    const { subjectId } = route.params;
    const [subject, setSubject] = useState<ISubject | undefined>();

    useEffect(() => {
        const getSubject = async () => {
            const subject = await WaniWrapper.getSubject(subjectId);
            setSubject(subject);
        };

        getSubject();
    }, [])

    const getText = () => {
        if (subject) {
            const split = subject.data.meaning_mnemonic.split(/<\/?[\w]+>(.*?)<\/?[\w]+>/g);
            debugger;


            return subject.data.meaning_mnemonic
        } 
        return '';
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>
                    {
                        subject 
                        ? <Text>{getText()}</Text>
                        : <></>
                    }
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}
