import React from 'react';
import { Text, View } from 'react-native';
import { IKanjiReading, IMeaning, ISubject } from '../../../models';
import { useTheme } from '../../../util/Theme';
import {
  CollapsibleSection, Markup, StyledText, SubjectButton,
} from '../../shared';
import styles from './style';

type KanjiProps = {
  subject: ISubject;
  components: ISubject[];
  visuallySimilar: ISubject[];
  amalgamations: ISubject[];
};

const ICON_SCALING = 0.9;

function Kanji({
  subject,
  components,
  visuallySimilar,
  amalgamations,
}: KanjiProps) {
  const theme = useTheme();
  const renderHeaderText = (text: string) => <Text style={styles.headingText}>{text}</Text>;
  const readingConjoiner = (type: string) => subject!.data.readings!
    .filter((val: IKanjiReading) => val.type === type)
    .reduce((prevValue: string, currVal: IKanjiReading, idx: number) => (idx === 0 ? currVal.reading : `${prevValue}, ${currVal.reading}`), '');

  const renderButtons = (subjects: ISubject[]) => subjects.map((val: ISubject) => (
    <SubjectButton key={`${val.id}}`} item={val} push />
  ));

  const primaryMeaning = subject.data.meanings
    .filter((val: IMeaning) => val.primary === true)[0].meaning;

  return (
    <>
      <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
        {renderHeaderText('Radical Composition')}
        <View style={theme.viewRow}>
          {renderButtons(components)}
        </View>
      </CollapsibleSection>
      <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
        {renderHeaderText('Meaning')}
        <View>
          <StyledText>
            {`Primary: ${primaryMeaning}`}
          </StyledText>
          <StyledText>Meaning: </StyledText>
          <Markup>{subject!.data.meaning_mnemonic}</Markup>
        </View>
      </CollapsibleSection>
      <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
        {renderHeaderText('Readings')}
        <View>
          <View style={styles.readingViewRow}>
            <View>
              <StyledText>On&apos;yomi</StyledText>
              <StyledText>
                {readingConjoiner('onyomi')}
              </StyledText>
            </View>
            <View>
              <StyledText>Kun&apos;yomi</StyledText>
              <StyledText>
                {readingConjoiner('kunyomi')}
              </StyledText>
            </View>
            <View>
              <StyledText>Nanori</StyledText>
              <StyledText>
                {readingConjoiner('nanori')}
              </StyledText>
            </View>
          </View>
          <View>
            <StyledText>Mnemonic: </StyledText>
            <Markup>{subject!.data.reading_mnemonic!}</Markup>
          </View>
        </View>
      </CollapsibleSection>
      {
        visuallySimilar.length > 0 && (
          <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
            {renderHeaderText('Visual Similar Kanji')}
            <View style={theme.viewRow}>
              {renderButtons(visuallySimilar)}
            </View>
          </CollapsibleSection>
        )
      }
      <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
        {renderHeaderText('Found in Vocab')}
        <View>
          {renderButtons(amalgamations)}
        </View>
      </CollapsibleSection>
    </>
  );
}

export default Kanji;
