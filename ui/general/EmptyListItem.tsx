import { EmptyListIconSvg } from 'assets/icons';
import { FC } from 'react';
import { Spinner, SpinnerProps, XStack, YStack, YStackProps } from 'tamagui';
import Typography from 'ui/typography';

interface IPropsType {
  title?: string;
  isLoading?: boolean;
  ContainerProps?: YStackProps;
  SpinnerProps?: SpinnerProps;
}

const EmptyListItem: FC<IPropsType> = ({
  ContainerProps = {},
  SpinnerProps = {},
  title = 'No Data',
  isLoading = false,
}) => {
  return (
    <YStack f={1} w='100%' h='100%' ai='center' jc='center' {...ContainerProps}>
      {isLoading ? (
        <Spinner
          size='large'
          color='$primary'
          {...SpinnerProps}
          testID='empty-list-spinner'
        />
      ) : (
        <>
          <XStack ai='center' jc='center' mb='$16'>
            <EmptyListIconSvg />
          </XStack>
          <Typography size='$16' medium col='$gray/600'>
            {title}
          </Typography>
        </>
      )}
    </YStack>
  );
};

export default EmptyListItem;
