import React, {createContext, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dataKey = 'my-app-data';
const setAppData = async appData => {
  try {
    await AsyncStorage.setItem(dataKey, JSON.stringify(appData));
  } catch {}
};

const getAppData = async () => {
  try {
    const result = await AsyncStorage.getItem(dataKey);
    if (result) {
      return JSON.parse(result);
    }
  } catch {}
  return null;
};

const AppContext = createContext({
  moodList: [],
  handleSelectMood: () => {},
  handleDeleteMood: () => {},
});

export const AppProvider = ({children}) => {
  const [moodList, setMoodList] = React.useState([]);

  const handleSelectMood = React.useCallback(selectedMood => {
    setMoodList(currentList => {
      const newMoodList = [...currentList, {selectedMood, date: Date.now()}];
      setAppData({moodList: newMoodList});
      return newMoodList;
    });
  }, []);
  const handleDeleteMood = React.useCallback(mood => {
    setMoodList(current => {
      const newMoodList = current.filter(item => item.date !== mood.date);
      setAppData({moodList: newMoodList});
      return newMoodList;
    });
  }, []);
  React.useEffect(() => {
    const fetchAppData = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moodList);
      }
    };
    fetchAppData();
  }, []);
  return (
    <AppContext.Provider value={{moodList, handleSelectMood, handleDeleteMood}}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
