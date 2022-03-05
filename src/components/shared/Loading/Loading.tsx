import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './style';

function Loading({ loading, children }: { loading : boolean, children: any }) {
  return loading
    ? <View style={styles.container}><ActivityIndicator size="large" /></View>
    : { ...children };
}

export default Loading;
