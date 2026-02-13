import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

interface Scene3Props {
    line1: string;
    line2: string;
    line3: string;
    originalPrice: string;
    newPrice: string;
    accentColor: string;
}

export const Scene3_Offer: React.FC<Scene3Props> = ({
    line1,
    line2,
    line3,
    originalPrice,
    newPrice,
    accentColor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Staggered text entries
    const makeEntry = (delay: number) => {
        const s = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 100 },
        });
        return {
            opacity: s,
            y: interpolate(s, [0, 1], [50, 0]),
        };
    };

    const entry1 = makeEntry(0);
    const entry2 = makeEntry(15);
    const entry3 = makeEntry(30);

    // Strikethrough animation for original price
    const strikeDelay = 55;
    const strikeProgress = interpolate(frame - strikeDelay, [0, 15], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Original price fade out
    const originalFade = interpolate(frame - strikeDelay, [10, 25], [1, 0.35], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // New price scale-up pop
    const newPriceSpring = spring({
        frame: frame - 75,
        fps,
        config: { damping: 8, stiffness: 200, mass: 0.5 },
    });

    // Glow pulse for new price
    const glowPulse = interpolate(
        Math.sin((frame - 75) * 0.15),
        [-1, 1],
        [0, 30],
    );

    return (
        <AbsoluteFill
            style={{
                background: "linear-gradient(180deg, #0d0d2b 0%, #1a1a3e 100%)",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 50px",
                fontFamily:
                    '"Hiragino Kaku Gothic ProN", "Noto Sans JP", system-ui, sans-serif',
            }}
        >
            {/* Sparkle dots background */}
            {Array.from({ length: 20 }).map((_, i) => {
                const x = ((i * 137.508) % 100).toFixed(1);
                const y = ((i * 59.123) % 100).toFixed(1);
                const delay2 = i * 0.3;
                const sparkle = interpolate(
                    Math.sin((frame + delay2 * 30) * 0.1),
                    [-1, 1],
                    [0.1, 0.6],
                );
                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: `${x}%`,
                            top: `${y}%`,
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            backgroundColor: "white",
                            opacity: sparkle,
                        }}
                    />
                );
            })}

            {/* Text lines */}
            <div style={{ textAlign: "center", zIndex: 1 }}>
                {[
                    { text: line1, anim: entry1 },
                    { text: line2, anim: entry2 },
                    { text: line3, anim: entry3 },
                ].map(({ text, anim }, i) => (
                    <div
                        key={i}
                        style={{
                            transform: `translateY(${anim.y}px)`,
                            opacity: anim.opacity,
                            fontSize: 46,
                            fontWeight: 700,
                            color: "#FFFFFF",
                            lineHeight: 1.8,
                            marginBottom: 4,
                        }}
                    >
                        {text}
                    </div>
                ))}

                {/* Price section */}
                <div style={{ marginTop: 50 }}>
                    {/* Original price with strikethrough */}
                    <div
                        style={{
                            position: "relative",
                            display: "inline-block",
                            opacity: originalFade,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 72,
                                fontWeight: 900,
                                color: "#999999",
                            }}
                        >
                            {originalPrice}
                        </span>
                        {/* Animated strikethrough line */}
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: 0,
                                height: 6,
                                width: `${strikeProgress * 100}%`,
                                backgroundColor: "#ff4444",
                                transform: "translateY(-50%) rotate(-5deg)",
                            }}
                        />
                    </div>

                    {/* New price */}
                    <div
                        style={{
                            transform: `scale(${newPriceSpring})`,
                            marginTop: 20,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 120,
                                fontWeight: 900,
                                color: accentColor,
                                textShadow: `0 0 ${glowPulse}px ${accentColor}, 0 4px 20px rgba(0,0,0,0.5)`,
                            }}
                        >
                            {newPrice}
                        </span>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
