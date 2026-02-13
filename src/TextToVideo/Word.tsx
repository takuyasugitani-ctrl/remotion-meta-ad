import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Word: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 80,
        fontWeight: "bold",
        backgroundColor: "white",
        opacity,
      }}
    >
      {text}
    </AbsoluteFill>
  );
};
