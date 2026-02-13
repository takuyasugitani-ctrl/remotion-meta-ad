import React from "react";
import {
    AbsoluteFill,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

interface Scene3_1Props {
    text: string;
    numberText: string;
    numberColor: string;
}

export const Scene3_1_Offer: React.FC<Scene3_1Props> = ({
    text,
    numberText,
    numberColor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Number counter pop
    const numScale = spring({
        frame,
        fps,
        config: { damping: 8, stiffness: 180, mass: 0.5 },
    });

    // Text fade in
    const textSpring = spring({
        frame: frame - 10,
        fps,
        config: { damping: 14, stiffness: 100 },
    });

    return (
        <AbsoluteFill
            style={{
                background:
                    "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 50px",
                fontFamily:
                    '"Hiragino Kaku Gothic ProN", "Noto Sans JP", system-ui, sans-serif',
            }}
        >
            {/* Sparkle dots */}
            {Array.from({ length: 15 }).map((_, i) => {
                const x = ((i * 137.508) % 100).toFixed(1);
                const y = ((i * 59.123) % 100).toFixed(1);
                const sparkle = Math.sin((frame + i * 10) * 0.1) * 0.3 + 0.3;
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

            {/* Number highlight */}
            <div
                style={{
                    transform: `scale(${numScale})`,
                    marginBottom: 20,
                    zIndex: 1,
                }}
            >
                <span
                    style={{
                        fontSize: 100,
                        fontWeight: 900,
                        color: numberColor,
                        textShadow: `0 0 30px ${numberColor}88, 0 4px 15px rgba(0,0,0,0.5)`,
                    }}
                >
                    {numberText}
                </span>
            </div>

            {/* Sub text */}
            <div
                style={{
                    opacity: textSpring,
                    transform: `scale(${textSpring})`,
                    zIndex: 1,
                }}
            >
                <span
                    style={{
                        fontSize: 52,
                        fontWeight: 700,
                        color: "#FFFFFF",
                        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    }}
                >
                    {text}
                </span>
            </div>
        </AbsoluteFill>
    );
};
