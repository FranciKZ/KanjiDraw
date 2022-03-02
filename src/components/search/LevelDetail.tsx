import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ISubject } from '../../models';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchLevelByNumber } from '../../redux/reducers/levelReducer';
import { RootState } from '../../redux/store';
import { useTheme } from '../../util/Theme';
import { Card, CollapsibleSection, Loading, SubjectButton } from '../shared';

interface ILevelDetailProps {
    route: any;
    navigation: any;
}

const ICON_SCALING = 0.75;

function LevelDetail({ route, navigation }: ILevelDetailProps) {
    const { levelNumber } = route.params;
    const { data, loading } = useAppSelector((state: RootState) => ({ data: state.levelState.levels[levelNumber], loading: state.levelState.loading[levelNumber] }));
    const dispatch = useAppDispatch();
    const theme = useTheme();

    useEffect(() => {
      dispatch(fetchLevelByNumber(levelNumber));
    }, [])

    const renderSubjectButton = ({ item, index }: { item: ISubject, index: number}) => (
        <SubjectButton key={index} item={item} navigation={navigation} />
    );

    const displaySection = React.useMemo(() => (filter: string, sectionText: string) => {
        let result = <></>;
        if (!loading && data) {
            const buttons = data
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
                        <FlatList
                            data={data.filter((val: ISubject) => val.object === filter && !val.data.hidden_at)}
                            renderItem={renderSubjectButton}
                        />
                        {/* <View style={ filter !== 'vocabulary' ? style.viewRow : {}}>
                            {buttons}
                        </View> */}
                    </CollapsibleSection>
                )
            }
        }

        return result;
    }, [data, loading])


    return (
        <Loading loading={loading}>
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
        </Loading>
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

export default LevelDetail;
