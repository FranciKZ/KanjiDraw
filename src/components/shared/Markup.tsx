import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HTML from "react-native-render-html";
import { useTheme } from '../../util/Theme';

interface IMarkupProps {
    children: string;
}

export function Markup({ children }: IMarkupProps) {
    const theme = useTheme();

    return (
        <HTML
            source={{ html: children }}
            renderers={{
                kanji: {
                    renderer: (htmlAttribs, children, inlineStyle, passProps) => (
                        <Text style={[styles.baseText, theme.primaryKanji]}>{children}</Text>
                    ),
                    wrapper: 'Text'
                },
                meaning: {
                    renderer: (htmlAttribs, children, inlineStyle, passProps) => (
                        <Text style={[styles.baseText, theme.primaryOther]}>{children}</Text>
                    ),
                    wrapper: 'Text'
                },
                ja: {
                    renderer: (htmlAttribs, children, inlineStyle, passProps) => (
                        <Text style={[styles.baseText, theme.primaryOther]}>{children}</Text>
                    ),
                    wrapper: 'Text'
                },
                radical: {
                    renderer: (htmlAttribs, children, inlineStyle, passProps) => (
                        <Text style={[styles.baseText, theme.primaryRadical]}>{children}</Text>
                    ),
                    wrapper: 'Text'
                },
                vocabulary: {
                    renderer: (htmlAttribs, children, inlineStyle, passProps) => (
                        <Text style={[styles.baseText, theme.primaryVocab]}>{children}</Text>
                    ),
                    wrapper: 'Text'
                },
                reading: {
                    renderer: (htmlAttribs, children, inlineStyle, passProps) => (
                        <Text style={[styles.baseText, theme.primaryOther]}>{children}</Text>
                    ),
                    wrapper: 'Text'
                }
            }} />
    )
}

const styles = StyleSheet.create({
    baseText: {
        fontSize: 16,
        lineHeight: 25
    }
});