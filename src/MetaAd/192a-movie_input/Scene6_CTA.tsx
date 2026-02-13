import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

interface Scene6Props {
    line1: string;
    line2: string;
    line3: string;
    ctaColor: string;
}

export const Scene6_CTA: React.FC<Scene6Props> = ({
    line1,
    line2,
    line3,
    ctaColor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Text entries
    const line1Spring = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 120 },
    });
    const line2Spring = spring({
        frame: frame - 18,
        fps,
        config: { damping: 12, stiffness: 120 },
    });
    const line3Spring = spring({
        frame: frame - 36,
        fps,
        config: { damping: 12, stiffness: 120 },
    });



    // CTA button pulse
    const pulseScale = interpolate(
        Math.sin(frame * 0.12),
        [-1, 1],
        [0.97, 1.05],
    );



    // Zero yen pulse (moderate emphasis)
    const zeroYenPulse = interpolate(
        Math.sin(frame * 0.15),
        [-1, 1],
        [1, 1.1],
    );

    // Swipe Up Animation Loop (approx 1.5s per loop)
    const swipeLoop = (frame % 45) / 45; // 0 to 1

    // Hand moves UP (from 0 to -40px)
    const arrowY = interpolate(swipeLoop, [0, 1], [20, -40]);

    // Hand fades out at the top
    const arrowOpacity = interpolate(swipeLoop, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Button moves UP slightly in sync
    const buttonSlide = interpolate(swipeLoop, [0, 0.8], [5, -5]);

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
            {/* Radial overlay for depth */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.15) 0%, transparent 60%)",
                }}
            />

            {/* Line 1 */}
            <div
                style={{
                    transform: `scale(${line1Spring})`,
                    opacity: line1Spring,
                    marginBottom: 16,
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        fontSize: 48,
                        fontWeight: 700,
                        color: "#FFFFFF",
                        textAlign: "center",
                        textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                >
                    {line1}
                </div>
            </div>

            {/* Line 2 (highlight) */}
            <div
                style={{
                    transform: `scale(${line2Spring})`,
                    opacity: line2Spring,
                    marginBottom: 16,
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        fontSize: 44,
                        fontWeight: 900,
                        color: "#FFFFFF",
                        textAlign: "center",
                        textShadow: "0 3px 15px rgba(0,0,0,0.4)",
                        backgroundColor: "rgba(0,0,0,0.3)",
                        padding: "12px 30px",
                        borderRadius: 12,
                        display: "inline-block",
                        whiteSpace: "pre-line",
                        lineHeight: 1.5,
                    }}
                >
                    {/* Regular Expression split to target strictly "0円" (not 100円, 98000円 etc) */}
                    {line2.split(/((?<!\d)0円)/g).map((part, i) => {
                        // If the part matches exactly "0円" (and was split by our regex meaning it passed the check)
                        if (part === "0円") {
                            return (
                                <span
                                    key={i}
                                    style={{
                                        position: "relative",
                                        display: "inline-block",
                                        fontSize: "1.5em",
                                        fontWeight: 900,
                                        color: "#FFD700",
                                        textShadow: "0 0 20px #FFD700",
                                        transform: `scale(${zeroYenPulse})`,
                                    }}
                                >
                                    {part}
                                </span>
                            );
                        }
                        // For regular text (including "98,000円")
                        return <React.Fragment key={i}>{part}</React.Fragment>;
                    })}
                </div>
            </div>

            {/* Line 3 */}
            <div
                style={{
                    transform: `scale(${line3Spring})`,
                    opacity: line3Spring,
                    marginBottom: 40,
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        fontSize: 40,
                        fontWeight: 700,
                        color: "#FFFFFF",
                        textAlign: "center",
                        textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                        lineHeight: 1.6,
                        whiteSpace: "pre-line",
                    }}
                >
                    {line3}
                </div>
            </div>

            {/* CTA Button */}
            <div
                style={{
                    transform: `translateY(${buttonSlide}px) scale(${pulseScale})`,
                    zIndex: 1,
                    marginBottom: 20,
                }}
            >
                <div
                    style={{
                        background: ctaColor,
                        padding: "22px 60px",
                        borderRadius: 60,
                        boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                    }}
                >
                    <span
                        style={{
                            fontSize: 38,
                            fontWeight: 900,
                            color: "#FFFFFF",
                        }}
                    >
                        サービスを詳しく見る
                    </span>
                </div>
            </div>

            {/* SWIPE UP */}
            <div
                style={{
                    transform: `translateY(${arrowY}px)`,
                    opacity: arrowOpacity,
                    zIndex: 1,
                }}
            >
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: "white",
                        marginBottom: 5,
                        textShadow: "0 2px 4px rgba(0,0,0,0.5)"
                    }}>
                        SWIPE UP
                    </span>
                    <span style={{ fontSize: 60, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))", lineHeight: 1 }}>
                        ☝️
                    </span>
                </div>
            </div>
        </AbsoluteFill>
    );
};
