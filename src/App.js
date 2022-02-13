import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTab} from './screens/BottomTabs.Navigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppProvider} from './App.provider';
const Stack = createNativeStackNavigator();
import {Platform, UIManager} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </AppProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
  text: {
    color: 'black',
    fontSize: 30,
  },
});
