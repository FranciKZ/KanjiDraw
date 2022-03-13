import React from 'react';
import { Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import {
  ICharacterImage, IKanjiReading, IMeaning, ISubject,
} from '../../../models';
import SrsStages from '../../../util/SrsStageEnum';
import { useTheme } from '../../../util/Theme';
import styles from './style';

type IItemProps = {
  item: ISubject;
  displayExtraData?: boolean;
};

function Subject({ item, displayExtraData = true }: IItemProps) {
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
  };

  const itemTypeSpecificStyles = (): object => {
    let resultingStyles;
    const baseStyles = { ...styles.individualItem, ...theme.primaryBorder };
    switch (item.object) {
      case 'kanji':
        resultingStyles = {
          backgroundColor: theme.primaryKanji.color, ...baseStyles, ...styles.notVocab,
        };
        break;
      case 'vocabulary':
        resultingStyles = displayExtraData
          ? { backgroundColor: theme.primaryVocab.color, ...styles.column, ...baseStyles }
          : { backgroundColor: theme.primaryVocab.color, ...baseStyles };
        break;
      case 'radical':
        resultingStyles = {
          backgroundColor: theme.primaryRadical.color, ...baseStyles, ...styles.notVocab,
        };
        break;
      default:
        resultingStyles = {};
        break;
    }

    return resultingStyles;
  };

  const renderRadicalName = () => (
    <Text
      style={[styles.readingAndMeaningText, theme.secondaryText]}
    >
      {item.data.meanings[0].meaning}
    </Text>
  );

  const renderOtherData = () => {
    const primaryReading = item.data.readings!
      .filter((val: IKanjiReading) => val.primary === true)[0].reading;
    const primaryMeaning = item.data.meanings!
      .filter((val: IMeaning) => val.primary === true)[0].meaning;

    return (
      <View style={item.object === 'vocabulary' ? styles.alignTextElementsRight : styles.alignTextElements}>
        <Text style={[styles.readingAndMeaningText, theme.secondaryText]}>{primaryReading}</Text>
        <Text style={[styles.readingAndMeaningText, theme.secondaryText]}>{primaryMeaning}</Text>
      </View>
    );
  };

  const dotStyles = () => {
    const result = { backgroundColor: theme.primaryProgress.color };

    switch (item.data.level) {
      case SrsStages.BURNED:
        result.backgroundColor = theme.primaryBurned.color;
        break;
      case SrsStages.LOCKED:
        result.backgroundColor = theme.primaryLocked.color;
        break;
      default:
        result.backgroundColor = theme.primaryProgress.color;
        break;
    }

    return result;
  };

  const generateExtraContent = () => {
    if (displayExtraData) {
      if (item.object === 'radical') {
        return renderRadicalName();
      }
      return renderOtherData();
    }

    return null;
  };

  return (
    <View style={itemTypeSpecificStyles()}>
      {
        item.data.characters
          ? (
            <Text
              style={displayExtraData
                ? [styles.charactersWithExtraContent, theme.secondaryText]
                : [styles.charactersWithoutExtraContent, theme.secondaryText]}
            >
              {item.data.characters}
            </Text>
          )
          : <SvgUri stroke={theme.secondaryText.color} strokeWidth="68" width={displayExtraData ? '45px' : '55px'} height={displayExtraData ? '45px' : '55px'} uri={findRadicalUrl()} />
      }
      { generateExtraContent() }
    </View>
  );
}

export default Subject;
