import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface IMarkupProps {
    children: string;
}

export function Markup({ children }: IMarkupProps) {

    const parseString = (): JSX.Element[] => {
        const results: JSX.Element[] = [];

        const split = children
            .split(/((?<=<\/?[\w]+>)|(?=<\/?[\w]+>))/)
            .filter((val: string) => val !== '');
        let type = '';

        for (let i = 0; i < split.length; i++) {
            if (split[i].match(/<[\w]+>/) && type === '') {
                type = split[i];
            } else if (!split[i].match(/<\/?[\w]+>/)){
                switch (type) {
                    case '<radical>':
                        results.push(renderText(split[i], i, 'radicals'));
                        break;
                    case '<kanji>':
                        results.push(renderText(split[i], i, 'kanji'));
                        break;
                    case '<vocabulary>':
                        results.push(renderText(split[i], i, 'vocabulary'));
                        break;
                    case '<reading>':
                    case '<ja>':
                    case '<meaning>':
                        results.push(renderText(split[i], i , 'other'));
                        break;
                    default:
                        results.push(renderText(split[i], i));
                        break;
                }
                type = '';
            }
        }
        
        return results;
    }

    const renderText = (value: string, index: number, property?: keyof typeof styles) => {
        return property
            ? <Text style={[styles.baseText, styles[property] ]}>{value}</Text>
            : <Text style={styles.baseText}>{value}</Text>
    }

    return (
        <Text>
            {parseString()}
        </Text>
    )
}

const styles = StyleSheet.create({
    baseText: {
        fontSize: 16,
        lineHeight: 25
    },
    kanji: {
        color: '#FF00AA'
    },
    vocabulary: {
        color: '#AA00FF'
    },
    radicals: {
        color: '#00AAFF'
    },
    other: {
        color: '#474747'
    }
});