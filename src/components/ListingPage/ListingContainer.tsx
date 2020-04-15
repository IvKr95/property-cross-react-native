import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListingView from './ListingView';
import {
  setListing,
  setFavourite,
  removeFavourite,
  removeListing,
} from '../../redux/actions/actionCreators';
import withAsyncStorage from '../../hocs/withAsyncStorage';
import {RootState, Listing} from '../../interfaces';

interface Props {
  getData: () => Promise<Listing[]>;
  setData: (data: Listing) => Promise<void | undefined>;
  removeItem: (id: string) => Promise<void>;
  route: {
    params: {
      listing: Listing;
    };
  };
}

const ListingContainer: React.FC<Props> = ({
  getData,
  setData,
  removeItem,
  route,
}) => {
  const dispatch = useDispatch();
  const {isFavourite, listing} = useSelector(
    (state: RootState) => state.listingPage,
  );

  useEffect(() => {
    const action = setListing(route.params.listing);
    dispatch(action);

    return () => {
      dispatch(removeListing());
    };
  }, [dispatch, route.params.listing]);

  useEffect(() => {
    function checkIfFavourite() {
      const data = getData();
      data.then(favourites => {
        if (!favourites.length) {
          return;
        }

        const favourite: Listing | undefined = favourites.find(
          item => item.id === listing.id,
        );

        if (favourite) {
          dispatch(setFavourite(favourite));
        }
      });
    }

    if (listing.id) {
      checkIfFavourite();
    }
  }, [dispatch, getData, listing]);

  const handleFavouriteState = () => {
    if (!isFavourite) {
      dispatch(setFavourite(listing));
      setData(listing);
      return;
    }
    dispatch(removeFavourite(listing.id));
    removeItem(listing.id);
  };

  return (
    <ListingView
      handleFavouriteState={handleFavouriteState}
      isFavourite={isFavourite}
      listing={listing}
    />
  );
};

export default withAsyncStorage('favourites')(ListingContainer);
