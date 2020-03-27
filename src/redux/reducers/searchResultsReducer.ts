const initialState = {
  searchTerm: '',
  page: 0,
  currentlyDisplayed: 0,
  total: 0,
  listings: [],
};

const searchResultsReducer = (state = initialState, action) => {
  const {type, payload} = action;

  const actions = {
    SEARCH_LOCATION_SUCCESS_LISTINGS() {
      return {
        ...state,
        ...payload,
        currentlyDisplayed:
          state.currentlyDisplayed + payload.currentlyDisplayed,
        listings: [...state.listings, ...payload.listings],
      };
    },
    REMOVE_PROPS() {
      return initialState;
    },
    default() {
      return state;
    },
  };

  return (actions[type] || actions.default)();
};

export default searchResultsReducer;
