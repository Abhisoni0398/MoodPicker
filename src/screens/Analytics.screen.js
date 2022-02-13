/* eslint-disable prettier/prettier */
import React from 'react';
import {useAppContext} from '../App.provider';
import {View, Text, StyleSheet} from 'react-native';
import {VictoryPie} from 'victory-native';
import groupBy from 'lodash/groupBy';
import {theme} from '../theme';
export const Analytics = () => {
  const appContext = useAppContext();
  const data = Object.entries(
    groupBy(appContext.moodList, 'selectedMood.emoji'),
  ).map(([key, value]) => ({
    x: key,
    y: value.length,
  }));
  return (
    <View style={styles.container}>
      <VictoryPie
        labelRadius={80}
        radius={150}
        innerRadius={50}
        colorScale={[
          theme.colorPurple,
          theme.colorLavender,
          theme.colorBlue,
          theme.colorGrey,
          theme.colorWhite,
        ]}
        style={{labels: {fontSize: 30}}}
        data={data}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
