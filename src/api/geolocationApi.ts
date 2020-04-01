import Geolocation from '@react-native-community/geolocation';

const geolocationApi = {
  getPosition() {
    const getCoordsAsNums = coords => {
      const latitude = Number(coords.latitude).toFixed(6);
      const longitude = Number(coords.longitude).toFixed(6);

      return {latitude, longitude};
    };

    const getCentrePointAsString = position => {
      const {latitude, longitude} = getCoordsAsNums(position.coords);
      return `${latitude},${longitude}`;
    };

    return new Promise((resolve, reject) => {
      const onSuccess = position => {
        const centrePoint = getCentrePointAsString(position);
        resolve(centrePoint);
      };

      const onError = error => {
        if (error.code === 1) {
          reject('Location not enabled');
        }
        reject('Location not found / timeout');
      };

      Geolocation.getCurrentPosition(onSuccess, onError);
    });
  },
};

export default geolocationApi;
