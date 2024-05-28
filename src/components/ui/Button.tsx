import {cn} from "@/utils/cn";
import { Pressable, PressableProps} from "react-native";
import {cva, type VariantProps} from "class-variance-authority";
import {PropsWithChildren} from "react";

interface ButtonProps
  extends PropsWithChildren<PressableProps>,
    VariantProps<typeof buttonVariants> {
  enableSound?: boolean;
}

const buttonVariants = cva(
  "inline-flex justify-center items-center rounded-xl  transition-all duration-200  active:border-[1px] ",
  {
    variants: {
      variant: {
        default: 'bg-[#3A3453] text-white',
        primary: 'bg-[#3A3453] text-white',
      },
      size: {
        default: "h-14 px-6 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = ({className, ...props}: ButtonProps) => {
  const {children, variant, onPress, size,...rest} = props;
  return (
    <Pressable
      className={cn(buttonVariants({variant, size, className}))}
      onPress={onPress}
      {...rest}
    >
      {children}
    </Pressable>
  );
};

export {Button, buttonVariants};


