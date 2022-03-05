import React from 'react';
import { Text } from 'react-native';
import HTML from 'react-native-render-html';
import { useTheme } from '../../../util/Theme';
import styles from './style';

type IMarkupProps = {
  children: string;
};

function Markup(props: IMarkupProps) {
  const theme = useTheme();

  return (
    <HTML
      tagsStyles={{ p: { fontSize: 16 } }}
      source={{ html: `<p>${props.children}</p>` }}
      renderers={{
        kanji: {
          renderer: (htmlAttribs, children, inlineStyle, passProps) => (
            <Text
              key={passProps.key}
              style={[styles.baseText, theme.primaryKanji]}
            >
              {children}
            </Text>
          ),
          wrapper: 'Text',
        },
        meaning: {
          renderer: (htmlAttribs, children, inlineStyle, passProps) => (
            <Text
              key={passProps.key}
              style={[styles.baseText, theme.primaryOther]}
            >
              {children}
            </Text>
          ),
          wrapper: 'Text',
        },
        ja: {
          renderer: (htmlAttribs, children, inlineStyle, passProps) => (
            <Text
              key={passProps.key}
              style={[styles.baseText, theme.primaryOther]}
            >
              {children}
            </Text>
          ),
          wrapper: 'Text',
        },
        radical: {
          renderer: (htmlAttribs, children, inlineStyle, passProps) => (
            <Text
              key={passProps.key}
              style={[styles.baseText, theme.primaryRadical]}
            >
              {children}
            </Text>
          ),
          wrapper: 'Text',
        },
        vocabulary: {
          renderer: (htmlAttribs, children, inlineStyle, passProps) => (
            <Text
              key={passProps.key}
              style={[styles.baseText, theme.primaryVocab]}
            >
              {children}
            </Text>
          ),
          wrapper: 'Text',
        },
        reading: {
          renderer: (htmlAttribs, children, inlineStyle, passProps) => (
            <Text
              key={passProps.key}
              style={[styles.baseText, theme.primaryOther]}
            >
              {children}
            </Text>
          ),
          wrapper: 'Text',
        },
      }}
    />
  );
}

export default Markup;
