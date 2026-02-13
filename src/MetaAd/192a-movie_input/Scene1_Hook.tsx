import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

interface Scene1Props {
    mainText: string;
    subText: string;
    highlightText: string;
    bgColor1: string;
    bgColor2: string;
}

export const Scene1_Hook: React.FC<Scene1Props> = ({
    mainText,
    subText,
    highlightText,
    bgColor1,
    bgColor2,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();



    // --- "急募" vibrating + scale pop ---
    const mainScale = spring({
        frame,
        fps,
        config: { damping: 8, stiffness: 150, mass: 0.6 },
    });
    const vibrateX = Math.sin(frame * 2.5) * 4;
    const vibrateY = Math.cos(frame * 3) * 3;

    // --- Sub text slide up ---
    const subSlide = spring({
        frame: frame - 15,
        fps,
        config: { damping: 12, stiffness: 100 },
    });
    const subY = interpolate(subSlide, [0, 1], [80, 0]);
    const subOpacity = interpolate(subSlide, [0, 1], [0, 1]);

    // --- Highlight pop-in ---
    const hlScale = spring({
        frame: frame - 40,
        fps,
        config: { damping: 10, stiffness: 180, mass: 0.5 },
    });

    return (
        <AbsoluteFill
            style={{
                background:
                    "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
                justifyContent: "center",
                alignItems: "center",
                fontFamily:
                    '"Hiragino Kaku Gothic ProN", "Noto Sans JP", system-ui, sans-serif',
            }}
        >
            {/* Diagonal stripes overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0,0,0,0.08) 40px, rgba(0,0,0,0.08) 80px)",
                    pointerEvents: "none",
                }}
            />

            {/* Main: "急募" */}
            <div
                style={{
                    transform: `scale(${mainScale}) translate(${vibrateX}px, ${vibrateY}px)`,
                    textAlign: "center",
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        fontSize: 200,
                        fontWeight: 900,
                        color: "#FFFFFF",
                        textShadow:
                            "0 0 40px rgba(0,0,0,0.6), 4px 4px 0 #000, -4px -4px 0 #000, 4px -4px 0 #000, -4px 4px 0 #000",
                        letterSpacing: "0.1em",
                        lineHeight: 1,
                    }}
                >
                    {mainText}
                </div>
            </div>

            {/* Sub text */}
            <div
                style={{
                    transform: `translateY(${subY}px)`,
                    opacity: subOpacity,
                    marginTop: 30,
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        fontSize: 46,
                        fontWeight: 700,
                        color: "#FFFFFF",
                        textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                        textAlign: "center",
                        lineHeight: 1.6,
                        whiteSpace: "pre-line",
                    }}
                >
                    {subText}
                </div>
            </div>

            {/* Highlight badge */}
            <div
                style={{
                    transform: `scale(${hlScale})`,
                    marginTop: 40,
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        backgroundColor: "#000000",
                        padding: "18px 50px",
                        borderRadius: 12,
                        display: "inline-block",
                    }}
                >
                    <span
                        style={{
                            color: "#FFFFFF",
                            fontSize: 64,
                            fontWeight: 900,
                            letterSpacing: "0.05em",
                        }}
                    >
                        {highlightText}
                    </span>
                </div>
            </div>
        </AbsoluteFill>
    );
};
