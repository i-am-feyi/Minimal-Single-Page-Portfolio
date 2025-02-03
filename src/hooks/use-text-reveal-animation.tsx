import { stagger, useAnimate } from "motion/react";
import { useEffect } from "react";
import SplitType from "split-type";

const useTextRevealAnimation = () => {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    new SplitType(scope.current, {
      types: "lines,words",
      tagName: "span",
    });
  }, [scope]);

  const entranceAnimation = () => {
    const targets = scope.current.querySelectorAll(".word");
    return animate(
      targets,
      {
        transform: "translateY(0)",
      },
      {
        duration: 0.5,
        delay: stagger(0.125),
      }
    );
  };

  const exitAnimation = () => {
    const targets = scope.current.querySelectorAll(".word");

    return animate(
      targets,
      {
        transform: "translateY(100%)",
      },
      {
        duration: 0.3,
        delay: stagger(-0.025, {
          startDelay: targets.length * 0.025,
        }),
      }
    );
  };

  return {
    scope,
    entranceAnimation,
    exitAnimation,
  };
};

export default useTextRevealAnimation;
