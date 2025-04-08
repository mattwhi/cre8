"use client";

import React from "react";
import { Parallax } from "react-scroll-parallax";

interface ParallaxSection {
  image: string;
  title: string;
  content: string;
}

interface ParallaxSectionsProps {
  sections: ParallaxSection[];
}

export default function ParallaxSections({ sections }: ParallaxSectionsProps) {
  return (
    <div>
      {sections.map((section, index) => {
        const isEven = index % 2 === 0;
        return (
          <div key={index} className="relative min-h-screen flex items-center">
            {/* Animated Parallax Background */}
            <Parallax translateY={[-20, 0]} className="absolute inset-0">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage: `url(${section.image})`,
                }}
              ></div>
            </Parallax>
            {/* Dark Overlay for Contrast */}
            <div className="absolute inset-0"></div>
            {/* Content Container */}
            <div className="relative container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center">
                {isEven ? (
                  <>
                    {/* Text on the Left */}
                    <div className="md:w-1/2 text-white text-left p-8">
                      <Parallax translateX={[-30, 0]}>
                        <h2 className="text-4xl font-bold mb-4">
                          {section.title}
                        </h2>
                        <p className="text-lg">{section.content}</p>
                      </Parallax>
                    </div>
                    <div className="md:w-1/2" />
                  </>
                ) : (
                  <>
                    <div className="md:w-1/2" />
                    {/* Text on the Right */}
                    <div className="md:w-1/2 text-white text-right p-8">
                      <Parallax translateX={[30, 0]}>
                        <h2 className="text-4xl font-bold mb-4">
                          {section.title}
                        </h2>
                        <p className="text-lg">{section.content}</p>
                      </Parallax>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
