import { GetProps, Paragraph, styled } from "tamagui";

const Typography = styled(Paragraph, {
  fontWeight: "400",
  col: "black",
  overflow: "visible",

  variants: {
    medium: {
      true: {
        fontWeight: "500",
      },
    },
    semiBold: {
      true: {
        fontWeight: "600",
      },
    },
    bold: {
      true: {
        fontWeight: "700",
      },
    },
  } as const,
});

export type TypographyProps = GetProps<typeof Typography>;

export default Typography;
