import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native';
import {theme} from '../theme';
import Reanimated, {withTiming} from 'react-native-reanimated';
const imageSrc = require('../../assets/butterflies.png');

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);
const moodOptions = [
  {emoji: '🧑‍💻', description: 'studious'},
  {emoji: '🤔', description: 'pensive'},
  {emoji: '😊', description: 'happy'},
  {emoji: '🥳', description: 'celebratory'},
  {emoji: '😤', description: 'frustrated'},
];
export const MoodPicker = ({handleSelectMood}) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [hasSelected, setHasSelected] = useState(false);
  const handleSelect = useCallback(() => {
    if (selectedMood) {
      handleSelectMood(selectedMood);
      setSelectedMood(null);
      setHasSelected(true);
    }
  }, [handleSelectMood, selectedMood]);
  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={styles.image} />
        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
          <Text style={styles.buttonText}>Choose another!</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map(item => {
          return (
            <View key={item.emoji}>
              <Pressable
                onPress={() => setSelectedMood(item)}
                style={[
                  styles.moodItem,
                  selectedMood?.emoji === item.emoji
                    ? styles.selectedMoodItem
                    : undefined,
                ]}>
                <View>
                  <Text>{item.emoji}</Text>
                </View>
              </Pressable>
              <Text style={styles.descriptionText}>
                {item.emoji === selectedMood?.emoji ? item.description : ''}
              </Text>
            </View>
          );
        })}
      </View>
      <ReanimatedPressable style={styles.button} onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </ReanimatedPressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 250,
    borderWidth: 2,
    borderColor: theme.colorPurple,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  moodItem: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  selectedMoodItem: {
    backgroundColor: '#454C73',
    borderWidth: 2,
    borderColor: 'white',
  },
  descriptionText: {
    fontSize: 10,
    color: '#454C73',
    marginTop: 5,
    fontFamily: theme.fontFamilyBold,
    textAlign: 'center',
  },
  heading: {
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    color: theme.colorWhite,
    fontFamily: theme.fontFamilyBold,
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
  },
  image: {
    alignSelf: 'center',
  },
});
