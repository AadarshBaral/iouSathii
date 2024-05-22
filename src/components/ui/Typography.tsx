import {cn} from "@/utils/cn";
import {VariantProps, cva} from "class-variance-authority";
import { Text, TextProps } from "react-native";

const typographyVariants = cva("text-textDark tracking-wider", {

  variants: {
    variant: {
      default: "font-poppins_regular",
      h1: "font-bold text-4xl font-poppins_bold",
      h2: "text-3xl font-bold font-poppins_semibold",
      h3: "text-2xl, font-bold font-poppins_semibold",
      md: "text-lg font-poppins_medium",
      p: "text-sm font-poppins_regular",
    },    size: {
      default: "text-sm ",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "8xl": "text-8xl",
    },
  },

  defaultVariants: {
    //@ts-ignoretsignore
    variant: 'default',
    size: "default",
  },
});

interface TypographyProps extends TextProps, VariantProps<typeof typographyVariants> {
  label: string;
}
const Typography = ({label, variant, size, className, ...props}: TypographyProps) => {
  return (
    <Text
      className={cn(typographyVariants({variant, size, className}))}
      {...props}
      allowFontScaling={false}
    >
      {label}
    </Text>
  );
};

export {Typography, typographyVariants};
