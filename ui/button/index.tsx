import { FC } from 'react';
import { GetProps, Spinner, styled, XStack } from 'tamagui';
import Typography from 'ui/typography';

export const StyledButton = styled(XStack, {
  name: 'Button',
  jc: 'center',
  ai: 'center',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        textAlign: 'center',
      },
      secondary: {
        backgroundColor: '$secondary',
        textAlign: 'center',
      },
    },
    size: {
      large: {
        height: 40,
        paddingVertical: 6,
        borderRadius: 100,
      },
      medium: {
        height: 36,
        paddingVertical: 6,
        borderRadius: 100,
      },
      small: {
        height: 35,
        paddingVertical: 5,
        borderRadius: 100,
      },
      xSmall: {
        height: 29,
        paddingVertical: 5,
        borderRadius: 100,
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  } as const,
});

export const StyledText = styled(Typography, {
  name: 'ButtonText',
  textAlign: 'center',

  variants: {
    variant: {
      primary: {
        color: '#fff',
      },
      secondary: {
        color: '#fff',
      },
    },
    sizeType: {
      large: {
        size: '$16',
        medium: true,
      },
      medium: {
        size: '$14',
      },
      small: {
        size: '$12',
        semiBold: true,
      },
      xSmall: {
        size: '$12',
        medium: true,
      },
    },
  } as const,
});

type ButtonProps = GetProps<typeof StyledButton>;
type TextProps = GetProps<typeof StyledText>;

export interface ButtonPropTypes extends ButtonProps {
  labelProps?: Omit<TextProps, 'sizeType' | 'variant'>;
  icon?: () => JSX.Element;
  isLoading?: boolean;
}

const Button: FC<ButtonPropTypes> = ({
  children,
  variant = 'primary',
  size = 'large',
  labelProps = {},
  isLoading = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Spinner testID='button-loading-spinner' />}
      {props.icon && <props.icon />}
      <StyledText sizeType={size} variant={variant} {...labelProps}>
        {children}
      </StyledText>
    </StyledButton>
  );
};

export default Button;
