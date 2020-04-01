import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PropertySearch from './components/PropertySearchPage/SearchContainer';
import Favourites from './components/FavouritesPage/FavouritesContainer';
import BottomTabBar from './BottomTabBar';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="PropertySearch"
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen
        name="PropertySearch"
        component={PropertySearch}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen name="Favourites" component={Favourites} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
