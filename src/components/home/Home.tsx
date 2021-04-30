import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ISummaryData, ISummaryResponse } from '../../models';
import { useTheme } from '../../util/Theme';
import { WaniWrapper } from '../../util/WaniWrapper';

export function Home() {
    const [summary, setSummary] = useState<ISummaryResponse | undefined>(undefined);
    const theme = useTheme();
    
    useEffect(() => {
        const getSummary = async () => {
            const response = await WaniWrapper.getSummary();
            if (response) {
                setSummary(response);
            }
        }

        getSummary();
    }, [])

    const calculateReviews = () => {
        let total = 0;

        if (summary) {
            summary.data.reviews.forEach((val: ISummaryData) => {
                if (moment(val.available_at).isBefore(moment())) {
                    total += val.subject_ids.length
                }
            })
        }

        return total;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.mainView} >
                <TouchableOpacity
                    style={{ ...styles.touchable, backgroundColor: theme.primaryKanji.color, ...theme.secondaryBorder }}
                >
                    <Text style={[styles.touchableMainText, theme.secondaryText]}>Lessons</Text>
                    <View style={{...styles.itemCountView, borderColor: theme.primaryText.color, backgroundColor: theme.secondaryText.color }}>
                        <Text style={[styles.itemCountText, theme.primaryText]}>{
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
                    <View style={{...styles.itemCountView, borderColor: theme.primaryText.color, backgroundColor: theme.secondaryText.color }}>
                        <Text style={[styles.itemCountText, theme.primaryText]}>{calculateReviews()}</Text>
                    </View>
                </TouchableOpacity>
            </View>
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