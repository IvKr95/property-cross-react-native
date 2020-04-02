import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchPage from '../stacks/SearchStackScreen';
import FavouritesPage from '../stacks/FavouritesStackScreen';
import BottomTabBar from './BottomTabBar';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="SearchPage"
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="FavouritesPage"
        component={FavouritesPage}
        options={{
          tabBarLabel: 'Favourites',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
