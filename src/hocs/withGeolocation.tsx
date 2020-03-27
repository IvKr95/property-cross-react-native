import React from 'react';
import {useDispatch} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {setError} from '../redux/actions/actionCreators';
import {searchLocation} from '../redux/actions/asyncActionCreators';

interface Error {
  code: number;
}

interface Position {
  coords: Coords;
}

interface Coords {
  latitude: string | number;
  longitude: string | number;
}

const withLocation: Function = (Component: React.FunctionComponent) => (
  props: any,
): React.ReactElement => {
  const dispatch = useDispatch();

  const getCoordsAsNums = (coords: Coords): Coords => {
    const latitude = Number(coords.latitude).toFixed(6);
    const longitude = Number(coords.longitude).toFixed(6);

    return {latitude, longitude};
  };

  const getCentrePointAsString = (position: Position): string => {
    const {latitude, longitude} = getCoordsAsNums(position.coords);
    return `${latitude},${longitude}`;
  };

  const onSuccess = (position: Position): void => {
    const centrePoint = getCentrePointAsString(position);
    const action = searchLocation({centre_point: centrePoint});
    dispatch(action);
  };

  const onError = (error: Error): void => {
    if (error.code === 1) {
      dispatch(setError('Location not enabled'));
      return;
    }
    dispatch(setError('Location not found / timeout'));
  };

  const searchByLocation = (): void => {
    Geolocation.getCurrentPosition(onSuccess, onError);
  };

  return <Component searchByLocation={searchByLocation} {...props} />;
};

export default withLocation;
