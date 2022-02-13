import React, {useCallback} from 'react';
import {StyleSheet, View, Text, Pressable, LayoutAnimation} from 'react-native';
import {theme} from '../theme';
import format from 'date-fns/format';
import {useAppContext} from '../App.provider';
export const MoodItemRow = ({item, date}) => {
  const appContext = useAppContext();
  const handleDelete = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    appContext.handleDeleteMood(item);
  }, [appContext, item]);
  return (
    <View style={styles.moodItem}>
      <View style={styles.iconAndDescription}>
        <Text style={styles.moodValue}>{item.selectedMood.emoji}</Text>
        <Text style={styles.moodDescription}>
          {item.selectedMood.description}
        </Text>
      </View>
      <Text style={styles.moodDate}>
        {format(new Date(item.date), "dd MMM, yyyy 'at' h:mmaaa")}
      </Text>
      <Pressable onPress={handleDelete}>
        <Text style={styles.deleteButton}>delete</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  moodValue: {
    color: theme.colorLavender,
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
    fontFamily: theme.fontFamilyRegular,
  },
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodDescription: {
    fontSize: 18,
    color: theme.colorPurple,
    fontFamily: theme.fontFamilyBold,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    fontFamily: theme.fontFamilyBold,
    color: theme.colorBlue,
  },
});
