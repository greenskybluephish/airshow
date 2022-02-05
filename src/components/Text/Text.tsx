import { HTMLAttributes } from "react";
import { styled } from "@linaria/react";

const Element = styled.span<TextStyleProps>`
  color: ${(props) => colors[props.color]};
  font-size: ${(props) => fontSizes[props.size]}px;
  font-family: ${(props) => fontFamily[props.font]};
  font-weight: ${(props) => fontWeight[props.weight]};
`;

export type TextStyleProps = {
  font: FontFamily;
  color: Colors;
  size: FontSizes;
  weight: FontWeight;
};

export type TextProps = {
  /**
   * a text to be rendered in the component.
   */
  text?: string;
  font?: FontFamily;
  color?: Colors;
  size?: FontSizes;
  weight?: FontWeight;
} & HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>;

export const Text = (props: TextProps): JSX.Element => {
  const {
    text,
    size = "md",
    color = "slate",
    font = "text",
    weight = "bold",
  } = props;

  return (
    <Element as="p" weight={weight} size={size} color={color} font={font}>
      {text}
    </Element>
  );
};

type HeadingProps = {
  styles: keyof typeof typestyles;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  text?: string;
  children?: React.ReactNode;
};

export const Heading = (props: HeadingProps) => {
  return (
    <Element as={props.element ?? "h1"} {...typestyles[props.styles]}>
      {props.text ?? props.children}
    </Element>
  );
};

// Type Style Definitions
export const typestyles = {
  "heading-1": {
    color: "dark-gray",
    font: "secondary",
    size: "xxxl",
    weight: "bold",
  },
  "heading-2": {
    color: "dark-gray",
    size: "xxl",
    font: "secondary",
    weight: "bold",
  },
  "heading-3": {
    color: "dark-gray",
    size: "xl",
    font: "secondary",
    weight: "bold",
  },
  "heading-4": {
    color: "dark-gray",
    size: "lg",
    font: "secondary",
    weight: "bold",
  },
  "heading-5": {
    color: "dark-gray",
    size: "md",
    font: "secondary",
    weight: "bold",
  },
  "heading-6": {
    color: "dark-gray",
    size: "sm",
    font: "secondary",
    weight: "bold",
  },
  paragraph: {
    color: "dark-gray",
    size: "md",
    font: "primary",
    weight: "normal",
  },
  subtext: {
    color: "dark-gray",
    font: "primary",
    size: "md",
    weight: "normal",
  },
  "field-description": {
    color: "dark-gray",
    font: "primary",
    size: "sm",
    weight: "normal",
  },
  label: {
    color: "dark-gray",
    font: "secondary",
    size: "sm",
    weight: "bold",
  },
  "input-text": {
    color: "dark-gray",
    font: "primary",
    size: "md",
    weight: "normal",
  },
  breadcrumb: {
    color: "dark-gray",
    font: "secondary",
    size: "xs",
    weight: "bold",
  },
} as const;

export type FontSizes = keyof typeof fontSizes;
export type FontWeight = keyof typeof fontWeight;
export type FontFamily = keyof typeof fontFamily;

export const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
} as const;

export type Colors = keyof typeof colors;

export const colors = {
  "brand-navy": "#0c1733",
  "brand-red": "#df3b26",
  "brand-blue": "#9dc7e0",
  "brand-gray": "#888a98",
  "brand-black": "#212124",
  // App color Swatches
  primary: "#176ed9",
  "primary-aa": "#166ecf",
  "primary-dark": "#104b94",
  "light-navy": "color.adjust($color-navy, $lightness: 2%)",
  slate: "#6f7180",
  "dark-slate": "#515466",
  mist: "#ecf1f4",
  "light-mist": "#f2f6f8",
  black: "#000",
  "dark-gray": "#333",
  "light-gray": "#888a98",
  white: "#fff",
  royal: "#3289e9",
  purple: "#7896e1",
  green: "#05a455",
  grapefruit: "$color-brand-red",
  yellow: "#feed6d",
  amber: "#db7c00",
  aia: "#fa4132",
  red: "#ad1a07",
  orange: "#ee803c",
  peach: "#f7897b",
  gold: "#ffad00",
  transparent: "transparent",
} as const;

export const fontFamily = {
  primary: `'Roboto', Helvetica, Arial, sans-serif`,
  text: `'Roboto', Helvetica, Arial, sans-serif`,
  secondary: `'Archivo', Helvetica, Arial, sans-serif`,
  heading: `'Archivo', Helvetica, Arial, sans-serif`,
} as const;

export const fontWeight = {
  normal: 400,
  medium: 500,
  bold: 700,
} as const;

export const getProp = <T extends Record<string, string>>(
  obj: T,
  fallback: keyof T,
  prop?: keyof T
) => (prop ? obj[prop] : obj[fallback]);

const Typography = `
$base-font-size: rem(14px);
$base-line-height: 1.414;
$base-font-weight-normal: 400;
$base-font-weight-medium: 500;
$base-font-weight-bold: 700;`;

// [TODO] Replace with explicit $type-styles definitions
// Field Label, Error Message text, Field Description, List Item text
// ^ Can probably define 1 or 2 type styles and use for all
const typesizes = `
$base-font-size-small: rem(13px);
$base-font-size-xsmall: rem(12px);
$base-font-size-xxsmall: rem(10px);
$base-font-size-tiny: rem(12px);`;
