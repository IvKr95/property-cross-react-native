import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavouritesPage from '../../components/FavouritesPage/FavouritesContainer';

const FavouritesStack = createStackNavigator();

function FavouritesStackScreen(): React.ReactElement {
  return (
    <FavouritesStack.Navigator initialRouteName="FavouritesPage">
      <FavouritesStack.Screen
        name="FavouritesPage"
        component={FavouritesPage}
        options={{
          title: 'Favourites',
        }}
      />
    </FavouritesStack.Navigator>
  );
}

export default FavouritesStackScreen;
