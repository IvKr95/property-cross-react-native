import locations from './locationsMock.json';

const locationAPI = {
  getLocation(extraParams: object) {
    const promise = new Promise((resolve, reject) => {
      const isSuccess = Math.random() > 0.1;

      const successCallback = () => {
        let location;
        const page = extraParams.page || 0;

        if (extraParams.centre_point) {
          location = locations.find(
            location => location.centre_point === extraParams.centre_point,
          );
        } else {
          location = locations.find(
            location => location.place_name === extraParams.place_name,
          );
        }

        response = {
          request: {
            pretty: 1,
            action: 'search_listings',
            encoding: 'json',
            num_res: location ? 2 : 0,
            page,
            location: location ? location.place_name : extraParams.place_name,
          },
          response: {
            application_response_code: location ? 100 : 201,
            status_code: 200,
            total_results: location ? location.total_results : 0,
            listings: location ? location.listings[page] : [],
            locations: [],
          },
        };
        resolve(JSON.stringify(response));
      };
      const failureCallback = () => {
        reject('Timeout');
      };

      const callback = isSuccess ? successCallback : failureCallback;
      setTimeout(callback, 1000);
    });

    return promise
      .then(response => JSON.parse(response))
      .then(
        ({request, response}) => {
          const appResCode = Number(response.application_response_code);

          if (appResCode === 100 || appResCode === 101 || appResCode === 110) {
            // the query returned a list of properties
            if (response.listings.length) {
              return {
                listings: {
                  currentlyDisplayed: Number(request.num_res),
                  searchTerm: request.location,
                  page: request.page,
                  total: response.total_results,
                  listings: response.listings,
                },
              };
            }
            throw new Error('Zero properties returned');
          }
          if (appResCode === 200 || appResCode === 202) {
            // 200
            // The search term was ambiguous.
            // In this case Nestoria returns a list of suggested locations.
            // 201
            // The specified location is not valid,
            // but has a very similar spelling to one or more locations which are valid.
            // Possible valid locations are returned in the response.
            return {locations: response.locations};
          }
          if (appResCode === 201) {
            // unknown location
            throw new Error('Location not matched');
          }
          // any other response is considered an error
          throw new Error('Other');
        },
        () => {
          throw new Error('Network connection issues / timeout');
        },
      );
  },
};

export default locationAPI;
