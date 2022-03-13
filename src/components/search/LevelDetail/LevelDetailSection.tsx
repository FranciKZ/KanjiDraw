import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { ISubject } from '../../../models';
import { CollapsibleSection, SubjectButton } from '../../shared';
import style from './levelDetailSectionStyle';

type LevelDetailSectionProps = {
  items: ISubject[];
  numColumns: number;
  sectionText: string;
};

const ICON_SCALING = 0.75;

function LevelDetailSection(
  {
    items, numColumns, sectionText,
  }: LevelDetailSectionProps,
) {
  const renderSubjectButton = ({ item, index }: { item: ISubject, index: number }) => (
    <SubjectButton key={index} item={item} />
  );

  return (
    <CollapsibleSection
      iconSize={style.sectionHeaderText.fontSize * ICON_SCALING}
    >
      <View style={{
        display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      }}
      >
        <Text style={style.sectionHeaderText}>{sectionText}</Text>
        <Text>
          {`${items.length} subjects`}
        </Text>
      </View>
      <FlatList
        columnWrapperStyle={numColumns > 1 && {
          flex: 1,
          justifyContent: 'center',
        }}
        data={items}
        renderItem={renderSubjectButton}
        numColumns={numColumns}
      />
    </CollapsibleSection>
  );
}

export default LevelDetailSection;
