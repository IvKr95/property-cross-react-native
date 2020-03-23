/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @typescript
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Header from './components/SharedComponents/Header';
import PropertySearchContainer from './components/PropertySearchPage/SearchContainer';
import SearchResultsContainer from './components/SearchResultsPage/SearchResultsContainer';
import ListingContainer from './components/ListingPage/ListingContainer';
import FavouritesContainer from './components/FavouritesPage/FavouritesContainer';
import ErrorPage from './components/ErrorPages/ErrorPage';

export interface Props {}

const Stack = createStackNavigator();

const App: React.FC<Props> = props => {
  return (
    <NavigationContainer>
      <Header />

      <Stack.Navigator initialRouteName="PropertySearchPage">
        <Stack.Screen
          name="PropertySearchPage"
          component={PropertySearchContainer}
        />
        <Stack.Screen
          name="SearchResultsPage"
          component={SearchResultsContainer}
        />
        <Stack.Screen name="ListingPage" component={ListingContainer} />
        <Stack.Screen name="FavouritesPage" component={FavouritesContainer} />
        <Stack.Screen name="ErrorPage" component={ErrorPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
