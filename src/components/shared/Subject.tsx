import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { ICharacterImage, IKanjiReading, IMeaning, ISubject } from '../../models';
import { useTheme } from '../../util/Theme';
interface IItemProps {
    item: ISubject;
}

export function Subject({ item }: IItemProps) {
    const theme = useTheme();

    const findRadicalUrl = (): string => {
        let result = '';

        if (item.data.character_images && item.data.character_images.length > 0) {
            const image = item.data.character_images.find((val: ICharacterImage) => 'inline_styles' in val.metadata && val.metadata.inline_styles === false);
            if (image !== undefined) {
                result = image.url;
            }
        }

        return result;
    }

    const itemTypeSpecificStyles = (): object => {
        let resultingStyles;
        const baseStyles = {...styles.individualItem, ...theme.primaryBorder};
        switch (item.object) {
            case 'kanji':
                resultingStyles = {backgroundColor: theme.primaryKanji.color, ...baseStyles};
                break;
            case 'vocabulary':
                resultingStyles = {backgroundColor: theme.primaryVocab.color, ...styles.column, ...baseStyles};
                break;
            case 'radical':
                resultingStyles = {backgroundColor: theme.primaryRadical.color, ...baseStyles};
                break;
            default:
                resultingStyles = {};
                break;
        }
        debugger;
        return resultingStyles;
    }

    const renderRadicalName = () => {
        return <Text style={[styles.readingAndMeaningText, theme.secondaryText]}>{item.data.meanings[0].meaning}</Text>
    }

    const renderOtherData = () => {
        const primaryReading = item.data.readings!.filter((val: IKanjiReading) => val.primary === true)[0].reading;
        const primaryMeaning = item.data.meanings!.filter((val: IMeaning) => val.primary === true)[0].meaning;

        return (
            <View style={styles.alignTextElements}>
                <Text style={[styles.readingAndMeaningText, theme.secondaryText]}>{primaryReading}</Text>
                <Text style={[styles.readingAndMeaningText, theme.secondaryText]}>{primaryMeaning}</Text>
            </View>
        )
    }

    return (
        <View style={itemTypeSpecificStyles()}>
            {
                item.data.characters
                    ? <Text style={[styles.characters, theme.secondaryText]}>{item.data.characters}</Text>
                    : <SvgUri stroke={theme.secondaryText.color} strokeWidth="68" width="24px" height="24px" uri={findRadicalUrl()} />
            }
            {
                item.object === 'radical'
                    ? renderRadicalName()
                    : renderOtherData()
            }
        </View>
    )
}

const styles = StyleSheet.create({
    individualItem: {
        minWidth: 90,
        padding: 5,
        margin: 1,
        borderRadius: 10,
        borderWidth: 1,
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
    },
    alignTextElements: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    column: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    characters: {
        fontSize: 25,
    },
    readingAndMeaningText: {
        fontSize: 15,
        paddingTop: 3
    }
})