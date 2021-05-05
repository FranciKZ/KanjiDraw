import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ISubject } from '../../models';
import { WaniWrapper } from '../../util/WaniWrapper';
import Card from '../shared/Card';
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
        const filtered = levelData
            .filter((val: ISubject) => val.object === 'radical' && !val.data.hidden_at);
        return filtered
            .map((val: ISubject, index: number) => {
                return <SubjectButton key={index} item={val} navigation={navigation} />
            });
    }

    const displayKanji = () => {
        return levelData
            .filter((val: ISubject) => val.object === 'kanji' && !val.data.hidden_at)
            .map((val: ISubject, index: number) => {
                return <SubjectButton key={index} item={val} navigation={navigation} />
            });
    }

    const displayVocab = () => {
        return levelData
            .filter((val: ISubject) => val.object === 'vocabulary' && !val.data.hidden_at)
            .map((val: ISubject, index: number) => {
                return <SubjectButton key={index} item={val} navigation={navigation} />
            });
    }

    return (
        <SafeAreaView edges={['right', 'left', 'top']} style={{ marginRight: 5, marginLeft: 5 }}>
            <ScrollView>
                <Card style={style.viewRow}> 
                    <Text style={{ fontSize: 30 }}>Level: {levelNumber}</Text>
                </Card>
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
                    <View>
                        {levelData && displayVocab()}
                    </View>
                </CollapsibleSection>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
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
