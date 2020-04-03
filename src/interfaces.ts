export interface PropSearch {
  isLoading: boolean;
  location: string;
  recentSearches: object[] | [];
  locations: object[] | null;
  error: null | string | object;
}

export interface SearchResults {
  listings: object[] | [];
  searchTerm: string;
  total: number;
}

export interface ListingPage {
  isFavourite: boolean;
  listing: object;
}

export interface RootState {
  propSearch: PropSearch;
  searchResults: SearchResults;
  listing: ListingPage;
}

export interface RecentSearch {
  id: string;
  name: string;
  total: number;
}

export interface Location {
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
  navigate: (route: string) => void;
}

export interface Route {
  name: string;
  key: string;
  params?: object;
}

export interface Action {
  type: string;
  payload: string | object[] | object;
}

export interface Listing {
  thumb_url: string;
  title: string;
  price_formatted: string;
  img_url: string;
  bedroom_number: number;
  bathroom_number: number;
  summary: string;
}
