import React from 'react';
import {View} from 'react-native';
import {NavigationState} from '@react-navigation/native';
import {Navigation, Descriptor} from '../../interfaces';
import BottomTab from './BottomTab';

interface Props {
  state: NavigationState;
  descriptors: Descriptor;
  navigation: Navigation;
}

const BottomTabBar: React.FC<Props> = ({state, descriptors, navigation}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => (
        <BottomTab
          key={route.key}
          route={route}
          index={index}
          state={state}
          descriptors={descriptors}
          navigation={navigation}
        />
      ))}
    </View>
  );
};

export default BottomTabBar;
