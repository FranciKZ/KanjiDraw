import React, { useMemo } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { isKatakana, toHiragana } from 'wanakana';
import SoundPlayer from 'react-native-sound-player';
import {
  IContextSentence, IKanjiReading, IMeaning, IPronunciation, ISubject,
} from '../../../models';
import {
  CollapsibleSection, Markup, StyledText, SubjectButton,
} from '../../shared';
import styles from './style';
import { useTheme } from '../../../util/Theme';

Icon.loadFont();
type VocabProps = {
  subject: ISubject;
  components: ISubject[];
};

type AudioMap = Record<string, IPronunciation[]>;

const ICON_SCALING = 0.9;

function Vocab({ subject, components }: VocabProps) {
  const theme = useTheme();
  const generateAltMeanings = useMemo(() => subject!.data.meanings!
    .filter((val: IMeaning) => !val.primary)
    .reduce((prevValue: string, currVal: IMeaning, idx: number) => (idx === 0 ? currVal.meaning : `${prevValue}, ${currVal.meaning}`), ''), [subject]);

  const playAudio = (url: string) => {
    try {
      SoundPlayer.playUrl(url);
    } catch (e) {
      console.log(e);
    }
  };

  const generateContextSentences = () => subject!.data
    .context_sentences!.map((val: IContextSentence) => (
      <View key={`${val.ja}_${val.en}`} style={styles.rowView}>
        <StyledText>{val.ja}</StyledText>
        <StyledText style={styles.normalText}>{val.en}</StyledText>
      </View>
  ));

  const generateKanjiComposition = () => components!.map((val: ISubject) => (
    <SubjectButton key={`${val.id}`} item={val} push />
  ));

  const generateReadingSection = useMemo(() => {
    const audioObjectsMap: AudioMap = subject!.data.pronunciation_audios!
      .filter((val: IPronunciation) => val.content_type === 'audio/mpeg')
      .reduce((prev: AudioMap, curVal: IPronunciation) => (
        {
          ...prev,
          [curVal.metadata.pronunciation]: prev[curVal.metadata.pronunciation]
            ? [...prev[curVal.metadata.pronunciation], curVal]
            : [curVal],
        }
      ), {});

    return subject!.data.readings!.map((val: IKanjiReading) => {
      const audioObjects = audioObjectsMap[toHiragana(val.reading)];
      return (
        <View key={`${val.primary}_${val.type}`} style={styles.readingViewRow}>
          <StyledText>{val.reading}</StyledText>
          {
            audioObjects.map((pronunciation: IPronunciation) => (
              <TouchableWithoutFeedback key={`${val.reading}-${val.type}`} touchSoundDisabled onPress={() => playAudio(pronunciation.url)}>
                <Icon size={15} name="playstation" />
              </TouchableWithoutFeedback>
            ))
          }
        </View>
      );
    });
  }, [subject]);

  const renderHeaderText = (text: string) => <Text style={styles.headingText}>{text}</Text>;
  return (
    <>
      <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
        {renderHeaderText('Meaning')}
        <View>
          <StyledText>
            {`Primary ${subject.data.meanings[0].meaning}`}
          </StyledText>
          {
            generateAltMeanings !== '' && (
              <StyledText>
                {`Alternative: ${generateAltMeanings}`}
              </StyledText>
            )
          }
          <StyledText>Explanation: </StyledText>
          <Markup>{subject!.data.meaning_mnemonic}</Markup>
        </View>
      </CollapsibleSection>
      <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
        {renderHeaderText('Readings')}
        <View>
          {generateReadingSection}
          <Markup>{subject!.data.reading_mnemonic!}</Markup>
        </View>
      </CollapsibleSection>
      <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
        {renderHeaderText('Context Sentences')}
        <View>
          {generateContextSentences()}
        </View>
      </CollapsibleSection>
      <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
        {renderHeaderText('Kanji Composition')}
        <View style={theme.viewRow}>
          {generateKanjiComposition()}
        </View>
      </CollapsibleSection>
    </>
  );
}

export default Vocab;
