import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {NavigationState} from '@react-navigation/native';
import {BottomTabDescriptor} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {Navigation} from './interfaces';

interface Props {
  state: NavigationState;
  descriptors: BottomTabDescriptor;
  navigation: Navigation;
  route: {
    key: string;
    name: string;
  };
  index: number;
}

const BottomTab: React.FC<Props> = ({
  state,
  descriptors,
  navigation,
  route,
  index,
}) => {
  const {options} = descriptors[route.key];
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
      ? options.title
      : route.name;

  const isFocused = state.index === index;

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityStates={isFocused ? ['selected'] : []}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.bottomTab}
      key={route.key}>
      <Text style={isFocused ? styles.textFocused : styles.textInitial}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  textFocused: {
    color: '#673ab7',
  },
  textInitial: {
    color: '#222',
  },
});

export default BottomTab;
