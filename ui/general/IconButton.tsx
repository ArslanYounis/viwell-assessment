import { FC } from 'react';
import { GetProps, Spinner, styled, XStack } from 'tamagui';

export const StyledButton = styled(XStack, {
  name: 'IconButton',
  jc: 'center',
  ai: 'center',
  bg: 'transparent',
  borderRadius: 8,

  variants: {
    size: {
      large: {
        height: 40,
        width: 40,
        p: 4,
      },
      medium: {
        height: 36,
        width: 36,
        p: 4,
      },
      small: {
        height: 32,
        width: 32,
        p: 4,
      },
    },
    rounded: {
      true: {
        borderRadius: 100,
      },
    },
  } as const,
});

type ButtonProps = GetProps<typeof StyledButton>;

export interface IconButtonPropTypes extends ButtonProps {
  icon?: () => JSX.Element;
  isLoading?: boolean;
}

const IconButton: FC<IconButtonPropTypes> = ({
  size = 'large',
  isLoading = false,
  ...props
}) => {
  return (
    <StyledButton
      testID='icon-button'
      size={size}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Spinner size='small' testID='icon-button-spinner' />}
      {!isLoading && props.icon && <props.icon />}
    </StyledButton>
  );
};

export default IconButton;
