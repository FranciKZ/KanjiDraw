import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HTML from "react-native-render-html";

interface IMarkupProps {
    children: string;
}

export function Markup({ children }: IMarkupProps) {
    return (
        <HTML
            source={{ html: children }}
            renderers={{
                kanji: {
                    renderer: (htmlAttribs, children, inlineStyle, passProps) => (
                        <Text style={[styles.baseText, styles.kanji]}>{children}</Text>
                    ),
                    wrapper: 'Text'
                },
                meaning: {
                    renderer: (htmlAttribs, children, inlineStyle, passProps) => (
                        <Text style={[styles.baseText, styles.other]}>{children}</Text>
                    ),
                    wrapper: 'Text'
                },
                ja: {
                    renderer: (htmlAttribs, children, inlineStyle, passProps) => (
                        <Text style={[styles.baseText, styles.other]}>{children}</Text>
                    ),
                    wrapper: 'Text'
                },
                radical: {
                    renderer: (htmlAttribs, children, inlineStyle, passProps) => (
                        <Text style={[styles.baseText, styles.radicals]}>{children}</Text>
                    ),
                    wrapper: 'Text'
                },
                vocabulary: {
                    renderer: (htmlAttribs, children, inlineStyle, passProps) => (
                        <Text style={[styles.baseText, styles.vocabulary]}>{children}</Text>
                    ),
                    wrapper: 'Text'
                },
                reading: {
                    renderer: (htmlAttribs, children, inlineStyle, passProps) => (
                        <Text style={[styles.baseText, styles.other]}>{children}</Text>
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