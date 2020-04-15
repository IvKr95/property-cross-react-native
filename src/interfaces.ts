export interface SearchPage {
  isLoading: boolean;
  location: string;
  recentSearches: RecentSearch[];
  locations: Location[];
  error: null | string;
}

export interface ResultsPage {
  listings: Listing[];
  searchTerm: string;
  currentlyDisplayed: number;
  total: number;
  page: number;
  isLoading: false;
  error: null;
}

export interface ListingPage {
  isFavourite: boolean;
  listing: Listing;
}

export interface RootState {
  searchPage: SearchPage;
  resultsPage: ResultsPage;
  listingPage: ListingPage;
  favouritesPage: Listing[];
}

export interface RecentSearch {
  id: string;
  name: string;
  total: number;
}

export interface Location {
  id: string;
  name: string;
  props: number;
}

export interface State {
  routes: Route[];
  index: number;
}

export interface TabPress {
  defaultPrevented: boolean;
}

export interface Navigation {
  emit: (props: object) => TabPress;
  navigate: (route: Route) => void;
}

export interface Descriptor {
  [propName: string]: {
    options: {
      tabBarLabel: string;
      title: string;
      tabBarAccessibilityLabel: string;
      tabBarTestID: string;
    };
  };
}

export interface Route {
  name: string;
  key: string;
  params?: object;
}

export interface Action {
  type: string;
  payload?: string | object[] | object;
}

export interface Listing {
  id: string;
  title: string;
  bedroom_number: number;
  bathroom_number: number;
  summary: string;
  price_formatted: string;
  img_url: string;
  thumb_url: string;
}
