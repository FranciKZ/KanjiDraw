import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { ICharacterImage, ISubject } from '../../models';
interface IItemProps {
    item: ISubject;
}

export function Subject({ item }: IItemProps) {

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
        switch (item.object) {
            case 'kanji':
                resultingStyles = styles.kanji;
                break;
            case 'vocabulary':
                resultingStyles = styles.vocab;
                break;
            case 'radical':
                resultingStyles = styles.radical;
                break;
            default:
                resultingStyles = {};
                break;
        }

        return resultingStyles;
    }

    return (
        <View style={{ ...styles.individualItem, ...itemTypeSpecificStyles() }}>
            {
                item.data.characters
                    ? <Text style={styles.characters}>{item.data.characters}</Text>
                    : <SvgUri stroke="white" strokeWidth="68" width="30px" height="32px" uri={findRadicalUrl()} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    individualItem: {
        padding: 5,
        margin: 2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(102, 102, 102, 0.5)',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    kanji: {
        backgroundColor: '#FF00AA'
    },
    radical: {
        backgroundColor: '#00AAFF'
    },
    vocab: {
        backgroundColor: '#AA00FF'
    },
    characters: {
        fontSize: 25,
        color: 'white'
    },
    radicalSvg: {
        color: '#fff'
    }
})