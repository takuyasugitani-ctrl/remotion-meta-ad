import React, { useMemo } from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";

export const Background: React.FC<{ emoji: string }> = ({ emoji }) => {
    const frame = useCurrentFrame();
    const { height, width } = useVideoConfig();

    const particles = useMemo(() => {
        return new Array(20).fill(true).map((_, i) => {
            const x = random(i) * width;
            const y = random(i + 100) * height;
            const size = random(i + 200) * 50 + 20;
            const speed = random(i + 300) * 2 + 0.5;
            return { x, y, size, speed };
        });
    }, [height, width]);

    return (
        <AbsoluteFill style={{ backgroundColor: "#f0f0f0" }}>
            {particles.map((p, i) => {
                const yOffset = (frame * p.speed) % (height + p.size);
                const y = p.y - yOffset;
                // Wrap around
                const finalY = y < -p.size ? y + height + p.size : y;

                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: p.x,
                            top: finalY,
                            fontSize: p.size,
                        }}
                    >
                        {emoji}
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};
