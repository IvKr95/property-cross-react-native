import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface Item {
  name: string;
}

const withAsyncStorage: Function = (key: string): Function => (
  Component: React.FunctionComponent,
) => (props: any) => {
  const getData = (): Promise<object[] | undefined> => {
    return AsyncStorage.getItem(`@storage_${key}`)
      .then(result => JSON.parse(result))
      .catch(err => console.log(err));
  };

  const setData = (item: Item): void => {
    const data: Promise<object[] | undefined> = getData();
    data.then(value => {
      if (!value) {
        const entry = [item];
        AsyncStorage.setItem(`@storage_${key}`, JSON.stringify(entry));
        return;
      }
      const newEntry = value.filter(o => o.name !== item.name);
      newEntry.unshift(item);
      AsyncStorage.setItem(`@storage_${key}`, JSON.stringify(newEntry));
    });
  };

  const removeData = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(`@storage_${key}`);
    } catch (e) {
      console.log(e);
    }
  };

  const removeItem = (name: string): void => {
    const data: Promise<object[] | undefined> = getData();
    data.then(entry => {
      const newEntry = entry.filter(item => item.name !== name);
      AsyncStorage.setItem(`@storage_${key}`, JSON.stringify(newEntry));
    });
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
