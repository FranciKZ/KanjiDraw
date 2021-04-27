import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ISubject } from '../../models';
import { WaniWrapper } from '../../util/WaniWrapper';
import { CollapsibleSection } from '../shared/CollapsibleSection';
import SubjectButton from '../shared/SubjectButton';

interface ILevelDetailProps {
    route: any;
    navigation: any;
}

const ICON_SCALING = 0.75;

export function LevelDetail({ route, navigation }: ILevelDetailProps) {
    const { levelNumber } = route.params;
    const [levelData, setLevelData] = useState<ISubject[]>([]);
    useEffect(() => {
        const getData = async () => {
            const response = await WaniWrapper.getLevel(levelNumber);
            setLevelData(response.data);
        }

        getData();
    }, []);

    const displayRadicals = () => {
        const filtered =  levelData
        .filter((val: ISubject) => val.object === 'radical');
        return filtered
            .map((val: ISubject, index: number) => {
                return <SubjectButton key={index} item={val} navigation={navigation} />
            });
    }

    const displayKanji = () => {
        return levelData
            .filter((val: ISubject) => val.object === 'kanji')
            .map((val: ISubject, index: number) => {
                return <SubjectButton key={index} item={val} navigation={navigation} />
            });
    }

    const displayVocab = () => {
        return levelData
            .filter((val: ISubject) => val.object === 'vocabulary')
            .map((val: ISubject, index: number) => {
                return <SubjectButton key={index} item={val} navigation={navigation} />
            });
    }

    return (
        <SafeAreaView style={style.container}>
            <ScrollView>
                <CollapsibleSection
                    iconSize={style.sectionHeaderText.fontSize * ICON_SCALING}
                >
                    <Text style={style.sectionHeaderText}>Radicals</Text>
                    <View style={style.viewRow}>
                        {levelData && displayRadicals()}
                    </View>
                </CollapsibleSection>

                <CollapsibleSection
                    iconSize={style.sectionHeaderText.fontSize * ICON_SCALING}
                >
                    <Text style={style.sectionHeaderText}>Kanji</Text>
                    <View style={style.viewRow}>
                        {levelData && displayKanji()}
                    </View>
                </CollapsibleSection>

                <CollapsibleSection
                    iconSize={style.sectionHeaderText.fontSize * ICON_SCALING}
                >
                    <Text style={style.sectionHeaderText}>Vocab</Text>
                    <View style={style.viewRow}>
                        {levelData && displayVocab()}
                    </View>
                </CollapsibleSection>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        margin: 20
    },
    sectionHeader: {
        flex: 1
    },
    sectionHeaderText: {
        fontSize: 25
    },
    viewRow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
});
