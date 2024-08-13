import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetProductsQuery } from 'services/api';
import { Spinner, XStack, YStack } from 'tamagui';
import BottomTabNavigator from 'ui/general/BottomTabNavigator';
import PrimaryHeader from 'ui/general/PrimaryHeader';
import { useState } from 'react';
import EmptyListItem from 'ui/general/EmptyListItem';
import { FlatList } from 'react-native';
import DefaultProductCard from 'ui/general/DefaultProductCard';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { isEvenNumber } from 'utils/isEvenNumber';
import { useDispatch } from 'react-redux';
import { some } from 'lodash';
import { addToWishlist, removeFromWishlist } from 'store/wishlistSlice';

const ITEMS_PER_PAGE = 20;

const Products = () => {
  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching } = useGetProductsQuery({
    limit: ITEMS_PER_PAGE,
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
  });

  const handleLoadMore = () => {
    if (!isFetching && data && data.products.length < data.total) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <YStack f={1} pt={top} bg='white'>
      <PrimaryHeader title='Products' />
      <FlatList
        style={{ paddingVertical: 20 }}
        numColumns={2}
        extraData={wishlistItems}
        showsVerticalScrollIndicator={false}
        data={data?.products}
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <EmptyListItem isLoading={isLoading} title='No products!' />
        }
        ListFooterComponent={
          <XStack p='$24' w='100%' ai='center' jc='center'>
            {!isLoading && isFetching && (
              <Spinner size='small' color='$primary' />
            )}
          </XStack>
        }
      />
      <BottomTabNavigator />
    </YStack>
  );
};

export default Products;
