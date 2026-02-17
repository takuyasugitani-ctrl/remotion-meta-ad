import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

interface Scene3_2Props {
    text: string;
    emphasisWord: string;
    emphasisColor: string;
}

export const Scene3_2_Offer: React.FC<Scene3_2Props> = ({
    text,
    emphasisWord,
    emphasisColor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Text slide up
    const textSpring = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 120 },
    });
    const slideY = interpolate(textSpring, [0, 1], [80, 0]);



    // Pulsing animation for emphasis
    const pulse = Math.sin(frame / 4) * 0.05 + 1.1;

    const renderWithEmphasis = (t: string, emph: string, color: string) => {
        if (!emph || !t.includes(emph)) return <>{t}</>;
        const parts = t.split(emph);
        return (
            <>
                <span style={{ fontSize: "0.8em" }}>{parts[0]}</span>
                <span style={{ position: "relative", display: "inline-block", transform: `scale(${pulse})`, margin: "0 10px" }}>
                    <span
                        style={{
                            color,
                            fontWeight: 900,
                            background: `linear-gradient(to bottom, ${color}, #fff)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            filter: "drop-shadow(0 0 10px rgba(255,215,0,0.5))",
                        }}
                    >
                        {emph}
                    </span>
                </span>
                <span style={{ fontSize: "0.8em" }}>{parts[1]}</span>
            </>
        );
    };

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                padding: "0 50px",
                fontFamily:
                    '"Hiragino Kaku Gothic ProN", "Noto Sans JP", system-ui, sans-serif',
            }}
        >
            <div
                style={{
                    transform: `translateY(${slideY}px)`,
                    opacity: textSpring,
                    zIndex: 1,
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        fontSize: 60,
                        fontWeight: 700,
                        color: "#FFFFFF",
                        lineHeight: 1.5,
                        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                        whiteSpace: "pre-line",
                    }}
                >
                    {renderWithEmphasis(text, emphasisWord, emphasisColor)}
                </div>
            </div>
        </AbsoluteFill>
    );
};
