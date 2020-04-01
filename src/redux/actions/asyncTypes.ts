const getAsyncActions = (type: string) => ({
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`,
});

export const SEARCH_LOCATION = getAsyncActions('SEARCH_LOCATION');
