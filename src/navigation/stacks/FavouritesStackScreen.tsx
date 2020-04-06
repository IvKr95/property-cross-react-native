import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavouritesPage from '../../components/FavouritesPage/FavouritesContainer';
import ListingPage from '../../components/ListingPage/ListingContainer';

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
      <FavouritesStack.Screen
        name="ListingPage"
        component={ListingPage}
        options={{
          title: 'Listing',
        }}
      />
    </FavouritesStack.Navigator>
  );
}

export default FavouritesStackScreen;
