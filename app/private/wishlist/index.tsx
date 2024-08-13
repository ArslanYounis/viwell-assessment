import { some } from 'lodash';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { addToWishlist, removeFromWishlist } from 'store/wishlistSlice';
import { YStack } from 'tamagui';
import BottomTabNavigator from 'ui/general/BottomTabNavigator';
import DefaultProductCard from 'ui/general/DefaultProductCard';
import EmptyListItem from 'ui/general/EmptyListItem';
import PrimaryHeader from 'ui/general/PrimaryHeader';
import { isEvenNumber } from 'utils/isEvenNumber';

const Wishlist = () => {
  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  return (
    <YStack f={1} pt={top} bg='white'>
      <PrimaryHeader title='Wishlist' />
      <FlatList
        style={{ paddingVertical: 20 }}
        numColumns={2}
        extraData={wishlistItems}
        showsVerticalScrollIndicator={false}
        data={wishlistItems}
        keyExtractor={item => item.id?.toString()}
        renderItem={({ item, index }) => (
          <DefaultProductCard
            product={item}
            ContainerProps={{
              mb: '$16',
              pl: isEvenNumber(index) ? '$16' : '$8',
              pr: isEvenNumber(index) ? '$8' : '$16',
            }}
            isFavorite={some(wishlistItems, { id: item?.id })}
            onPressFavorite={() => {
              if (some(wishlistItems, { id: item?.id })) {
                dispatch(removeFromWishlist(item.id));
              } else {
                dispatch(addToWishlist(item));
              }
            }}
          />
        )}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<EmptyListItem title='No products!' />}
      />
      <BottomTabNavigator />
    </YStack>
  );
};

export default Wishlist;
