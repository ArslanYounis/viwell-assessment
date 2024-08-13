import { BackIconSvg } from 'assets/icons';
import { router } from 'expo-router';
import { FC, ReactNode } from 'react';
import { XStack, XStackProps } from 'tamagui';
import Typography from 'ui/typography';
import IconButton, { IconButtonPropTypes } from './IconButton';

interface IPropsType {
  MiddleContainerProps?: XStackProps;
  BackContainerProps?: IconButtonPropTypes;
  RightActionProps?: XStackProps;
  hasBackBtn?: boolean;
  onPressBack?: VoidFunction;
  title?: string;
  endActions?: ReactNode;
}

const PrimaryHeader: FC<IPropsType> = ({
  hasBackBtn,
  title,
  endActions,
  onPressBack,
  MiddleContainerProps = {},
  BackContainerProps = {},
  RightActionProps = {},
}) => {
  return (
    <XStack
      h='$54'
      w='100%'
      py='$11'
      px='$16'
      ai='center'
      jc='space-between'
      gap='$8'
      bbw='$1'
      bbc='$primary'
      bg='white'
    >
      {hasBackBtn ? (
        <IconButton
          testID='back-button'
          bg='$gray/100'
          p='$8'
          {...BackContainerProps}
          onPress={() => {
            if (!!onPressBack) {
              onPressBack();
            } else {
              router.back();
            }
          }}
          icon={BackIconSvg}
        />
      ) : (
        <></>
      )}
      <XStack f={1} ai='center' jc='center' {...MiddleContainerProps}>
        {title ? (
          <Typography size='$18' semiBold col='$primary' numberOfLines={1}>
            {title}
          </Typography>
        ) : null}
      </XStack>
      <XStack ai='center' jc='center' gap='$8' {...RightActionProps}>
        {endActions}
      </XStack>
    </XStack>
  );
};

export default PrimaryHeader;
