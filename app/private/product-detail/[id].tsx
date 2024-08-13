import { HeartIconSvg, StarIconSvg } from 'assets/icons';
import { useLocalSearchParams } from 'expo-router';
import { isEmpty, some } from 'lodash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useGetProductByIdQuery } from 'services/api';
import { RootState } from 'store';
import { addToWishlist, removeFromWishlist } from 'store/wishlistSlice';
import { Image, XStack, YStack } from 'tamagui';
import IconButton from 'ui/general/IconButton';
import LoaderComponent from 'ui/general/LoaderComponent';
import PrimaryHeader from 'ui/general/PrimaryHeader';
import Typography from 'ui/typography';

const ProductDetail = () => {
  const { top } = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(+id, { skip: !id });

  return (
    <YStack f={1} pt={top} bg='white'>
      <PrimaryHeader
        title='Product Detail'
        hasBackBtn
        endActions={
          <IconButton
            onPress={() => {
              if (product) {
                if (some(wishlistItems, { id: product?.id })) {
                  dispatch(removeFromWishlist(product.id));
                } else {
                  dispatch(addToWishlist(product));
                }
              }
            }}
            bg='$gray/100'
            icon={() => (
              <HeartIconSvg
                fill={
                  some(wishlistItems, { id: product?.id })
                    ? '#610C27'
                    : 'transparent'
                }
                color={
                  some(wishlistItems, { id: product?.id })
                    ? '#610C27'
                    : '#28303F'
                }
              />
            )}
          />
        }
      />
      <LoaderComponent
        isLoading={isLoading}
        hasData={!isEmpty(product)}
        errorMessage={error?.message}
      >
        <YStack flexGrow={1}>
          <XStack
            w='100%'
            h='$350'
            p='$40'
            ai='center'
            jc='center'
            bg='#EBEBEB'
          >
            <Image
              source={{ uri: product?.thumbnail }}
              w='100%'
              h='100%'
              objectFit='contain'
            />
          </XStack>
          <YStack py='$24' px='$16'>
            <XStack ai='center' gap='$10' mb='$12'>
              {product?.brand && (
                <XStack py='$10' px='$16' bg='#ece6e2' br='$2'>
                  <Typography size='$14' col='#929292'>
                    {product?.brand}
                  </Typography>
                </XStack>
              )}
              {product?.category && (
                <XStack py='$10' px='$16' bg='#F8F6F5' br='$2'>
                  <Typography size='$14' col='#929292'>
                    {product?.category}
                  </Typography>
                </XStack>
              )}
            </XStack>
            <Typography size='$18' medium mb='$16'>
              {product?.title}
            </Typography>
            <XStack gap='$20' ai='center' mb='$16'>
              <Typography size='$20' semiBold col='#121212'>
                {`$${product?.price}`}
              </Typography>
              <XStack
                py='$10'
                px='$16'
                gap='$10'
                ai='center'
                bg='#FCF7ED'
                br='$2'
              >
                <StarIconSvg />
                <Typography size='$14' col='#222'>
                  {product?.rating}
                </Typography>
                <Typography size='$14' col='#222'>
                  |
                </Typography>
                <Typography size='$14' col='#222' medium>
                  {`${product?.reviews?.length} reviews`}
                </Typography>
              </XStack>
            </XStack>
            <Typography size='$14'>{product?.description}</Typography>
          </YStack>
        </YStack>
      </LoaderComponent>
    </YStack>
  );
};

export default ProductDetail;
