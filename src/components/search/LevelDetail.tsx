import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { ISubject } from '../../models';
import { RequestLevel } from '../../redux/actions';
import { useGetLevelByNumberQuery } from '../../redux/api';
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
    const { data, isLoading } = useGetLevelByNumberQuery(levelNumber)
    const theme = useTheme();

    const renderSubjectButton = ({ item, index }: { item: ISubject, index: number}) => (
        <SubjectButton key={index} item={item} navigation={navigation} />
    );

    const displaySection = React.useMemo(() => (filter: string, sectionText: string) => {
        let result = <></>;
        if (!isLoading && data) {
            const buttons = data.data
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
                            data={data.data.filter((val: ISubject) => val.object === filter && !val.data.hidden_at)}
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
    }, [data, isLoading])


    return (
        <Loading loading={isLoading}>
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
