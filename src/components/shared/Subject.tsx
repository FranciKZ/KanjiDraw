import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { SvgCssUri, SvgUri } from 'react-native-svg';
import { ICharacterImage, ISubject, ISvgCharacter } from '../../models';
interface IItemProps {
    item: ISubject;
    navigation: any;
    route: any;
}

function Subject({ item, navigation, route }: IItemProps) {
    const navigate = () => {
        navigation.navigate('SearchStackScreen', {
            screen: 'SubjectDetails',
            params: { subjectId: item.id },
        });
    }

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
        <TouchableWithoutFeedback onPress={navigate}>
            <View style={{ ...styles.individualItem, ...itemTypeSpecificStyles() }}>
                {
                    item.data.characters
                        ? <Text style={styles.characters}>{item.data.characters}</Text>
                        : <SvgUri stroke="white" strokeWidth="68" width="30px" height="32px" uri={ findRadicalUrl() } />
                }

            </View>
        </TouchableWithoutFeedback>
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

export default Subject;
