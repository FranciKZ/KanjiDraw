import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, ConnectedProps } from 'react-redux';
import { ISubject } from '../../models';
import { LevelActions } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import { useTheme } from '../../util/Theme';
import { WaniWrapper } from '../../util/WaniWrapper';
import Card from '../shared/Card';
import { CollapsibleSection } from '../shared/CollapsibleSection';
import Loading from '../shared/Loading';
import SubjectButton from '../shared/SubjectButton';

interface ILevelDetailProps extends ReduxProps {
    route: any;
    navigation: any;
}

const ICON_SCALING = 0.75;

function LevelDetail({ route, navigation, levels, getLevel, subjects }: ILevelDetailProps) {
    const { levelNumber } = route.params;
    const [levelData, setLevelData] = useState<ISubject[]>([]);
    const theme = useTheme();

    useEffect(() => {
        getLevel(levelNumber);
    }, []);

    useEffect(() => {
        if (levels && levels[levelNumber]) {
            const test = levels[levelNumber].map((val: number) => {
                return subjects[val];
            });
            setLevelData(test);
        }
    }, [levels])

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
        <Loading>
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

const mapStateToProps = (state: RootState) => ({
    levels: state.levelState.levels,
    subjects: state.subjectState.subjects
});

const mapDispatchToProps = (dispatch: any) => ({
    getLevel: (id: number) => dispatch({ type: LevelActions.GET_LEVEL_REQUEST, levelNumber: id })
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(LevelDetail);