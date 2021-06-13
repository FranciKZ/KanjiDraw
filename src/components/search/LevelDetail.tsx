import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ISubject } from '../../models';
import { useTheme } from '../../util/Theme';
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
    const theme = useTheme();

    useEffect(() => {
        const getData = async () => {
            const response = await WaniWrapper.getLevel(levelNumber);
            setLevelData(response.data);
        }

        getData();
    }, []);

    const displaySection = React.useMemo(() => (filter: string, sectionText: string) => {
        let result = <></>;
        if (levelData) {
            const buttons = levelData
                .filter((val: ISubject) => val.object === filter && !val.data.hidden_at)
                .map((val: ISubject, index: number) => {
                    return <SubjectButton key={index} item={val} navigation={navigation} />
                });

            if (buttons.length) {
                result = (
                    <CollapsibleSection
                        iconSize={style.sectionHeaderText.fontSize * ICON_SCALING}
                    >
                        <View style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={style.sectionHeaderText}>{sectionText}</Text>
                            <Text>{buttons.length} subjects</Text>
                        </View>
                        <View style={ filter !== 'vocabulary' ? style.viewRow : {}}>
                            {buttons}
                        </View>
                    </CollapsibleSection>
                )
            }
        }

        return result;
    }, [levelData])


    return (
        <SafeAreaView edges={['right', 'left', 'top']} style={{ marginRight: 5, marginLeft: 5 }}>
            <ScrollView>
                <Card style={style.viewRow}>
                    <Text style={{ ...theme.primaryText, fontSize: 30 }}>Level: {levelNumber}</Text>
                </Card>
                {
                    displaySection('radical', 'Radicals')
                }
                {
                    displaySection('kanji', 'Kanji')
                }
                {
                    displaySection('vocabulary', 'Vocabulary')
                }
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
