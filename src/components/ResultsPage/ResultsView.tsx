import React from 'react';
import {View} from 'react-native';
import Listings from '../SharedComponents/Listings';

function ResultsView(props): React.ReactElement {
  return (
    <View>
      <Listings {...props} />
    </View>
  );
}

export default ResultsView;
