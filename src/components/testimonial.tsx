import useTextRevealAnimation from "@/hooks/use-text-reveal-animation";
import { motion, usePresence } from "motion/react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { HTMLAttributes, useEffect } from "react";
import { twMerge } from "tailwind-merge";

const Testimonial = (
  props: {
    company: string;
    image: string | StaticImport;
    imagePositionY: number;
    name: string;
    quote: string;
    role: string;
    className?: string;
  } & HTMLAttributes<HTMLDivElement>
) => {
  const {
    company,
    image,
    imagePositionY,
    name,
    quote,
    role,
    className,
    ...rest
  } = props;

  const {
    scope: quoteScope,
    entranceAnimation: quoteEntranceAnimation,
    exitAnimation: quoteExitAnimation,
  } = useTextRevealAnimation();

  const {
    scope: citeScope,
    entranceAnimation: citeEntranceAnimation,
    exitAnimation: citeExitAnimation,
  } = useTextRevealAnimation();

  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (isPresent) {
      quoteEntranceAnimation()!.then(() => {
        citeEntranceAnimation();
      });
    } else {
      quoteExitAnimation().then(() => {
        citeExitAnimation().then(() => {
          safeToRemove();
        });
      });
    }
  }, [isPresent]);

  return (
    <div
      key={name}
      className={twMerge(
        "grid md:grid-cols-5 md:gap-8 lg:gap-16 items-center",
        className
      )}
      {...rest}
    >
      <div className="md:col-span-2 aspect-square md:aspect-[9/16] relative">
        <motion.div
          className="absolute h-full bg-stone-900"
          initial={{
            width: "100%",
          }}
          animate={{ width: 0 }}
          exit={{ width: "100%" }}
          transition={{
            duration: 0.5,
            repeatType: "mirror",
          }}
        />

        <Image
          src={image}
          alt={name}
          className="size-full object-cover"
          style={{
            objectPosition: `50% ${imagePositionY * 100}%`,
          }}
        />
      </div>
      <blockquote className="md:col-span-3">
        <div
          className="text-3xl md:text-5xl lg:text-6xl mt-8 md:mt-0"
          ref={quoteScope}
        >
          <span>&ldquo;</span>
          {quote}
          <span>&rdquo;</span>
        </div>
        <cite
          className="mt-4 md:mt-8 md:text-lg lg:text-xl not-italic block"
          ref={citeScope}
        >
          {name}, {role} at {company}
        </cite>
      </blockquote>
    </div>
  );
};

export default Testimonial;
