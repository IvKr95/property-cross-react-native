import locations from './locationsMock.json';

const locationAPI = {
  getLocation(extraParams: object) {
    const promise = new Promise((resolve, reject) => {
      const timeout = Math.random() > 0.1 ? 1000 : 2000;

      const callback = () => {
        if (timeout !== 1000) {
          reject('Timeout');
        }

        const [param] = Object.entries(extraParams);
        const [key, value] = param;

        const location = locations.find(location => location[key] === value);

        const response = {
          request: {
            pretty: 1,
            action: 'search_listings',
            encoding: 'json',
            num_res: location ? 20 : 0,
            page: 1,
            location: location ? location.place_name : extraParams.place_name,
          },
          response: {
            application_response_code: location ? 100 : 201,
            status_code: 200,
            total_results: location ? location.total_results : 0,
            listings: location ? location.listings : [],
            locations: [],
          },
        };
        resolve(JSON.stringify(response));
      };

      setTimeout(callback, timeout);
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
        error => {
          throw new Error('Network connection issues / timeout');
        },
      );
  },
};

export default locationAPI;
