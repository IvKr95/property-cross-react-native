import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Location} from '../../interfaces';

interface Props {
  locations: Location[];
}

const Locations: React.FC<Props> = ({locations}) => {
  return (
    <View>
      <FlatList
        data={locations}
        renderItem={({location}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{location.name}</Text>
            <Text>{location.props}</Text>
          </View>
        )}
        keyExtractor={location => location.props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Locations;
