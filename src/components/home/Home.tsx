import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ISummaryData, ISummaryResponse } from '../../models';
import { useTheme } from '../../util/Theme';
import { WaniWrapper } from '../../util/WaniWrapper';

export function Home() {
    const [summary, setSummary] = useState<ISummaryResponse | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    
    const getSummary = async () => {
        setLoading(true);
        const response = await WaniWrapper.getSummary();

        if (response) {
            setSummary(response);
        }

        setLoading(false);
    }

    useEffect(() => {

        getSummary();
    }, [])

    const calculateReviews = () => {
        let total = 0;
        if (summary) {
            total = summary.data.reviews[0].subject_ids.length;
        }

        return total;
    }

    const onRefresh = () => {
        getSummary();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.mainView} refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh}/>}>
                <TouchableOpacity
                    style={{ ...styles.touchable, backgroundColor: theme.primaryKanji.color, ...theme.secondaryBorder }}
                >
                    <Text style={[styles.touchableMainText, theme.secondaryText]}>Lessons</Text>
                    <View style={{...styles.itemCountView, backgroundColor: theme.secondaryText.color }}>
                        <Text style={[theme.primaryText, styles.itemCountText]}>{
                            summary
                            ? summary.data.lessons[0].subject_ids.length
                            : 0
                        }</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.touchable, backgroundColor: theme.primaryRadical.color, ...theme.secondaryBorder }}
                >
                    <Text style={[styles.touchableMainText, theme.secondaryText]}>Reviews</Text>
                    <View style={{...styles.itemCountView, backgroundColor: theme.secondaryText.color }}>
                        <Text style={[theme.primaryText, styles.itemCountText]}>{calculateReviews()}</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        height: 200
    },
    touchable: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 140,
        borderRadius: 70
    },
    touchableMainText: {
        fontSize: 22
    },
    itemCountView: {
        fontSize: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    itemCountText: {
        fontSize: 20
    }
})