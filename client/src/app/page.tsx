"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import img from "../../public/assets/c++.png";
import img3 from "../../public/assets/java.png";
import img2 from "../../public/assets/python.png";

// Proper type definition for Lottie
interface LottieType {
  loadAnimation: (params: {
    container: Element;
    renderer: "svg" | "canvas" | "html";
    loop: boolean;
    autoplay: boolean;
    path: string;
  }) => any;
  destroy: () => void;
}

// Dynamically import lottie-web with proper typing
const useLottie = () => {
  const [lottie, setLottie] = useState<LottieType | null>(null);

  useEffect(() => {
    const loadLottie = async () => {
      try {
        const lottieModule = await import("lottie-web");
        setLottie(lottieModule.default);
      } catch (error) {
        console.error("Failed to load lottie-web:", error);
      }
    };

    if (typeof window !== "undefined") {
      loadLottie();
    }
  }, []);

  return lottie;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="absolute backdrop-blur-lg top-0 z-50 bg-transparent text-white w-full sticky-header">
      <div className="container mx-auto px-4">
        <div className="items-center justify-between py-4 grid grid-cols-[290px_1fr] gap-5 w-full">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold border-2 flex"
              aria-label="Company Home"
            >
              CODE<p className="ml-2 text-red-800 font-bold text-4xl">RED</p>
            </Link>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <Link href="/login" className="hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative bg-gray-800 text-white">
      <video
        className="w-full h-screen object-cover opacity-30"
        loop
        autoPlay
        muted
        playsInline
      >
        <source src="/video/vid.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-black opacity-60 pointer-events-none" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-transparent bg-clip-text text-transparent">
          Coders Your <br /> Journey Starts Here!
        </h1>
        <Link
          href="/login"
          className="shadow-[0_-8px_12px_rgba(0,0,0,0.1)] inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

const TwoUpSection: React.FC<{
  title: string;
  description: string;
  linkText: string;
  imageSrc: string;
  reverse?: boolean;
}> = ({ title, description, linkText, imageSrc, reverse }) => {
  const lottie = useLottie();
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (lottie && containerRef.current) {
      try {
        // Clear any existing animation
        if (animationRef.current) {
          animationRef.current.destroy();
        }

        animationRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: `/${imageSrc}.json`,
        });
      } catch (error) {
        console.error(
          `Failed to load Lottie animation for ${imageSrc}:`,
          error
        );
      }
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, [lottie, imageSrc]);

  return (
    <div
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } gap-4 my-8`}
    >
      <div className="md:w-1/2">
        <div ref={containerRef}></div>
      </div>
      <div className="md:w-1/2 p-4 flex flex-col justify-center">
        <h3 className="text-6xl font-bold mb-4 text-red-700 font-[Times_New_Roman]">
          {title}
        </h3>
        <p className="mb-4 text-black text-lg font-sans">{description}</p>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div id="__next">
      <Header />
      <main id="skipToMain">
        <Hero />
        <div className="container mx-auto px-4">
          <TwoUpSection
            title="Code. Compete. Conquer."
            description="Think you’ve got game? Show off your skills in competitive coding matches where strategy meets speed. Step into the arena where coders face off in real time. Solve challenges, outthink opponents, and claim your spot at the top of the leaderboard. "
            linkText="Discover solutions"
            imageSrc="Trophy"
          />
          <TwoUpSection
            title="Challenges That Push You Forward"
            description="Solve handpicked problems that sharpen your algorithms, speed, and problem-solving under pressure."
            linkText="The next major innovation lever"
            imageSrc="developer"
            reverse
          />
          <TwoUpSection
            title="Battles That Test Your Skills"
            description="Whether you’re sharpening your skills or proving you’re the best, our platform adapts to your level and keeps the challenge alive."
            linkText="The next major innovation lever"
            imageSrc="Programmer"
          />
          <div className="grid grid-cols-[800px_1fr] mt-40">
            <div>
              <div className="md:w-[75%] p-4 flex flex-col justify-center">
                <h3 className="text-6xl font-bold mb-4 text-red-600 font-[Times_New_Roman]">
                  Language Based Questions
                </h3>
                <p className="mb-4 text-black text-lg font-sans">
                  Our platform brings together coders from diverse programming
                  backgrounds and ensures fair competition by having all
                  participants solve challenges using the same programming
                  language. This creates a level playing field, encourages
                  adaptability, and helps programmers expand their skill set
                  while competing.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-10 my-5">
              <div className="text-center">
                <Image
                  src={img}
                  alt="My PNG Image"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <div className="text-center">
                <Image
                  src={img2}
                  alt="My PNG Image"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <div className="text-center">
                <Image
                  src={img3}
                  alt="My PNG Image"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
