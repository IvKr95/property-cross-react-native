import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface Item {
  id: string;
}

const withAsyncStorage: Function = (key: string): Function => (
  Component: React.FunctionComponent,
) => (props: any) => {
  const getData = async () => {
    try {
      const json = await AsyncStorage.getItem(key);
      const result = await (json ? JSON.parse(json) : []);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async (newItem: {id: string}): Promise<any> => {
    try {
      const data = await getData();

      if (!data) {
        const newData = [newItem];
        AsyncStorage.setItem(key, JSON.stringify(newData));
        return;
      }

      const newData = data.filter((item: Item) => item.id !== newItem.id);
      newData.unshift(newItem);
      AsyncStorage.setItem(key, JSON.stringify(newData));
    } catch (error) {
      console.log(error);
    }
  };

  const removeData = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id: string): Promise<void> => {
    try {
      const data = await getData();
      const newData = data.filter((item: Item) => item.id !== id);

      AsyncStorage.setItem(key, JSON.stringify(newData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Component
      setData={setData}
      getData={getData}
      removeData={removeData}
      removeItem={removeItem}
      {...props}
    />
  );
};

export default withAsyncStorage;
