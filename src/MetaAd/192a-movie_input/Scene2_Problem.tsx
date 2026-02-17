import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

interface Scene2Props {
    line1: string;
    line2: string;
    line3: string;
    emphasisWord1: string;
    emphasisWord2: string;
    emphasisColor: string;
}

export const Scene2_Problem: React.FC<Scene2Props> = ({
    line1,
    line2,
    line3,
    emphasisWord1,
    emphasisWord2,
    emphasisColor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // --- Line 1 slide up ---
    const line1Spring = spring({
        frame,
        fps,
        config: { damping: 14, stiffness: 120 },
    });
    const line1Y = interpolate(line1Spring, [0, 1], [60, 0]);
    const line1Scale = interpolate(line1Spring, [0, 1], [0.95, 1]);

    // --- Line 2 slide up with delay ---
    const line2Spring = spring({
        frame: frame - 15, // Reduced delay for better pacing with 3 lines
        fps,
        config: { damping: 14, stiffness: 120 },
    });
    const line2Y = interpolate(line2Spring, [0, 1], [60, 0]);

    // --- Line 3 slide up with further delay ---
    const line3Spring = spring({
        frame: frame - 30,
        fps,
        config: { damping: 14, stiffness: 120 },
    });
    const line3Y = interpolate(line3Spring, [0, 1], [60, 0]);

    const renderWithEmphasis = (
        text: string,
        emphasis: string,
        color: string,
    ) => {
        if (!emphasis || !text.includes(emphasis)) {
            return <>{text}</>;
        }
        const parts = text.split(emphasis);
        return (
            <>
                {parts[0]}
                <span
                    style={{
                        color,
                        fontSize: "1.25em",
                        fontWeight: 900,
                        textDecoration: "underline",
                        textDecorationThickness: 6,
                        textUnderlineOffset: 8,
                    }}
                >
                    {emphasis}
                </span>
                {parts[1]}
            </>
        );
    };

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                fontFamily:
                    '"Hiragino Kaku Gothic ProN", "Noto Sans JP", system-ui, sans-serif',
            }}
        >
            {/* Subtle gradient overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(ellipse at center, rgba(40,0,60,0.5) 0%, transparent 70%)",
                }}
            />

            {/* Line 1 */}
            <div
                style={{
                    transform: `translateY(${line1Y}px) scale(${line1Scale})`,
                    opacity: line1Spring,
                    marginBottom: 24,
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        fontSize: 52, // Slightly smaller to fit 3 lines
                        fontWeight: 700,
                        color: "#FFFFFF",
                        textAlign: "center",
                        lineHeight: 1.5,
                    }}
                >
                    {renderWithEmphasis(line1, emphasisWord1, emphasisColor)}
                </div>
            </div>

            {/* Line 2 */}
            <div
                style={{
                    transform: `translateY(${line2Y}px)`,
                    opacity: line2Spring,
                    marginBottom: 24,
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        fontSize: 48,
                        fontWeight: 700,
                        color: "#FFFFFF",
                        textAlign: "center",
                        lineHeight: 1.5,
                    }}
                >
                    {renderWithEmphasis(line2, emphasisWord2, emphasisColor)}
                </div>
            </div>

            {/* Line 3 */}
            <div
                style={{
                    transform: `translateY(${line3Y}px)`,
                    opacity: line3Spring,
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        fontSize: 60, // Last line "目指しませんか？" emphasized
                        fontWeight: 800,
                        color: "#FFFFFF",
                        textAlign: "center",
                        lineHeight: 1.5,
                        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    }}
                >
                    {line3}
                </div>
            </div>
        </AbsoluteFill>
    );
};
