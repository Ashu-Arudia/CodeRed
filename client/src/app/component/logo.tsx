"use client";

import Lottie from "lottie-react";
import { memo } from "react";

import sampleAnimation from "../../../public/logo.json";

type Props = {
  loop?: boolean;
  autoplay?: boolean;
};

function LottiePlayer({ loop = true, autoplay = true }: Props) {
  return (
    <Lottie
      animationData={sampleAnimation}
      loop={loop}
      autoplay={autoplay}
      className=""
    />
  );
}

export default memo(LottiePlayer);
