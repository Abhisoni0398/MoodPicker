/* eslint-disable prettier/prettier */
import React from 'react';
import {MoodItemRow} from '../components/MoodItemRow';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useAppContext} from '../App.provider';
export const History = () => {
  const appContext = useAppContext();
  return (
    <ScrollView>
      <View style={styles.container}>
        {appContext.moodList
          .slice()
          .reverse()
          .map(item => {
            return <MoodItemRow item={item} key={item.date} />;
          })}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
