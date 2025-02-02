import { span } from "motion/react-client";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Button = (
  props: {
    variant: "primary" | "secondary" | "text";
    iconAfter?: ReactNode;
  } & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { className, children, variant, iconAfter, ...rest } = props;

  return (
    <button
      className={twMerge(
        "h-11 px-6 rounded-xl border border-red-orange-500 uppercase inline-flex items-center justify-center gap-2 transition duration-500 relative group/button",
        variant === "primary" && "bg-red-orange-500 text-white ",
        variant === "secondary" &&
          "hover:bg-red-orange-500 hover:text-white transition-all duration-500",
        variant === "text" &&
          "h-auto px-0 border-transparent after:content-[''] after:h-px after:w-0 after:absolute after:top-full after:left-0 after:bg-red-orange-500 hover:after:w-full after:transition-all after:duration-500",
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      {iconAfter && <span>{iconAfter}</span>}
    </button>
  );
};

export default Button;
