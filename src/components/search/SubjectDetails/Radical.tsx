import React from 'react';
import { Text, View } from 'react-native';
import { ISubject } from '../../../models';
import { useTheme } from '../../../util/Theme';
import {
  CollapsibleSection, Markup, StyledText, SubjectButton,
} from '../../shared';
import styles from './style';

type RadicalProps = {
  subject: ISubject;
  amalgamations: ISubject[];
};

const ICON_SCALING = 0.9;

function Radical({ subject, amalgamations }: RadicalProps) {
  const theme = useTheme();
  const renderHeaderText = (text: string) => <Text style={styles.headingText}>{text}</Text>;

  return (
    <>
      <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
        {renderHeaderText('Name')}
        <View>
          <StyledText>
            Primary:
            {subject!.data.meanings[0].meaning}
          </StyledText>
          <StyledText>Meaning: </StyledText>
          <Markup>{subject!.data.meaning_mnemonic}</Markup>
        </View>
      </CollapsibleSection>
      <CollapsibleSection iconSize={styles.headingText.fontSize * ICON_SCALING}>
        {renderHeaderText('Found in Kanji')}
        <View style={theme.viewRow}>
          {
            amalgamations.map((val: ISubject) => (
              <SubjectButton key={`${val.id}`} item={val} push />
            ))
          }
        </View>
      </CollapsibleSection>
    </>
  );
}

export default Radical;
