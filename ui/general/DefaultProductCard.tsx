import { FC } from 'react';
import { Image, XStack, YStack, YStackProps } from 'tamagui';
import { IProductType } from 'types/product.types';
import Typography from 'ui/typography';
import IconButton from './IconButton';
import { HeartIconSvg } from 'assets/icons';
import { screenWidth } from 'utils/screenDimensions';
import { router } from 'expo-router';

interface IPropsType {
  ContainerProps?: YStackProps;
  product: IProductType;
  isFavorite?: boolean;
  onPressFavorite?: VoidFunction;
}

const cardW = screenWidth / 2;

const DefaultProductCard: FC<IPropsType> = ({
  product,
  ContainerProps = {},
  isFavorite = false,
  onPressFavorite = () => {},
}) => {
  return (
    <YStack
      w={cardW}
      testID='product-card'
      {...ContainerProps}
      onPress={() => router.push(`/private/product-detail/${product.id}`)}
    >
      <YStack bw='$1' boc='#F4F4F4' p='$9' br='$2'>
        <XStack w='100%' h='$185' bg='#EBEBEB' ai='center' jc='center' mb='$12'>
          <Image
            source={{ uri: product?.thumbnail }}
            w='100%'
            h='100%'
            objectFit='contain'
          />
        </XStack>
        <XStack ai='center' gap='$10' mb='$6'>
          <Typography f={1} size='$12' medium col='#8C8C8C'>
            {product?.category}
          </Typography>
          <IconButton
            testID='icon-button'
            onPress={onPressFavorite}
            icon={() => (
              <HeartIconSvg
                fill={isFavorite ? '#610C27' : 'transparent'}
                color={isFavorite ? '#610C27' : '#28303F'}
              />
            )}
          />
        </XStack>
        <YStack h='$60' jc='space-between'>
          <Typography size='$14' numberOfLines={2} mb='$6'>
            {product.title}
          </Typography>
          <Typography size='$14' semiBold col='#121212'>
            {`$${product?.price}`}
          </Typography>
        </YStack>
      </YStack>
    </YStack>
  );
};

export default DefaultProductCard;
