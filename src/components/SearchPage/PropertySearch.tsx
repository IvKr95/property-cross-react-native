import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ResultsPage from '../ResultsPage/ResultsContainer';
import SearchPage from './SearchContainer';

const Stack = createStackNavigator();

function PropertySearch(): React.ReactElement {
  return (
    <Stack.Navigator initialRouteName="SearchPage">
      <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          title: 'Search Page',
        }}
      />
      <Stack.Screen
        name="ResultsPage"
        component={ResultsPage}
        options={{
          title: 'Results Page',
        }}
      />
    </Stack.Navigator>
  );
}

export default PropertySearch;
