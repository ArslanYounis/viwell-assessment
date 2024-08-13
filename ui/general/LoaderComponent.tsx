import { EmptyListIconSvg } from 'assets/icons';
import { FC, ReactNode } from 'react';
import { Spinner, SpinnerProps, XStack, YStack } from 'tamagui';
import Typography from 'ui/typography';

interface IPropsType {
  children: ReactNode;
  errorMessage?: string;
  isLoading?: boolean;
  hasData?: boolean;
  SpinnerProps?: SpinnerProps;
}

const LoaderComponent: FC<IPropsType> = ({
  SpinnerProps = {},
  errorMessage = 'oops! Something went wrong!',
  isLoading = false,
  hasData = false,
  children,
}) => {
  if (isLoading) {
    return (
      <Spinner
        testID='loader-spinner'
        size='large'
        color='$primary'
        {...SpinnerProps}
      />
    );
  }

  if (!hasData) {
    return (
      <YStack f={1} w='100%' h='100%' ai='center' jc='center'>
        <XStack ai='center' jc='center' mb='$16'>
          <EmptyListIconSvg />
        </XStack>
        <Typography size='$16' medium col='$gray/600'>
          {errorMessage}
        </Typography>
      </YStack>
    );
  }

  return children;
};

export default LoaderComponent;
