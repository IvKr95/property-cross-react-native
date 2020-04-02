import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ResultsPage from '../../components/ResultsPage/ResultsContainer';
import SearchPage from '../../components/SearchPage/SearchContainer';

const SearchStack = createStackNavigator();

function SearchStackScreen(): React.ReactElement {
  return (
    <SearchStack.Navigator initialRouteName="SearchPage">
      <SearchStack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          title: 'Search Page',
        }}
      />
      <SearchStack.Screen
        name="ResultsPage"
        component={ResultsPage}
        options={{
          title: 'Results Page',
        }}
      />
    </SearchStack.Navigator>
  );
}

export default SearchStackScreen;
