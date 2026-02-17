import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

interface Scene3_3Props {
    leadText: string;
    originalPrice: string;
    newPrice: string;
    accentColor: string;
}

export const Scene3_3_Offer: React.FC<Scene3_3Props> = ({
    leadText,
    originalPrice,
    newPrice,
    accentColor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Lead text pop
    const leadSpring = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 120 },
    });

    // Sequence markers
    const TAME_START = 30; // approx 1s in
    const REVEAL_START = 45; // +0.5s tame = 1.5s in

    // Strikethrough animation
    const strikeProgress = interpolate(frame, [15, 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Original price fade & shrink
    const originalFade = interpolate(frame, [REVEAL_START, REVEAL_START + 5], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Shake effect during "tame" - slight shaking
    const shake = frame >= TAME_START && frame < REVEAL_START
        ? Math.sin(frame * 2) * 3
        : 0;

    // New price scale-up pop with "tame" delay - Softened
    const newPriceSpring = spring({
        frame: frame - REVEAL_START,
        fps,
        config: { damping: 10, stiffness: 250, mass: 0.8 },
    });

    // Screen shake on reveal - Reduced
    const screenShake = spring({
        frame: frame - REVEAL_START,
        fps,
        config: { damping: 12, stiffness: 300, mass: 0.2 },
    });
    const shakeOffset = interpolate(screenShake, [0, 1], [0, 8]) * Math.sin(frame * 2) * (1 - spring({ frame: frame - REVEAL_START - 10, fps }));

    // Glow pulse - Reduced
    const glowPulse = interpolate(
        Math.sin((frame - REVEAL_START) * 0.2),
        [-1, 1],
        [10, 40],
    );

    // Background flash on reveal - Softened
    const bgFlash = interpolate(frame, [REVEAL_START, REVEAL_START + 4, REVEAL_START + 12], [0, 0.4, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                padding: "0 50px",
                fontFamily:
                    '"Hiragino Kaku Gothic ProN", "Noto Sans JP", system-ui, sans-serif',
                transform: `translate(${shakeOffset}px, ${shakeOffset}px)`,
            }}
        >
            {/* Flash overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "#FFFFFF",
                    opacity: bgFlash,
                    pointerEvents: "none",
                    zIndex: 10,
                }}
            />

            {/* Lead text */}
            <div
                style={{
                    transform: `scale(${leadSpring})`,
                    opacity: leadSpring,
                    marginBottom: 40,
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        fontSize: 48,
                        fontWeight: 700,
                        color: "#FFFFFF",
                        textAlign: "center",
                        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    }}
                >
                    {leadText}
                </div>
            </div>

            {/* Original price area */}
            <div style={{ position: "relative", height: 160, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {/* Original price with strikethrough */}
                <div
                    style={{
                        position: "absolute",
                        opacity: originalFade,
                        transform: `translateY(${shake}px) rotate(${shake * 0.5}deg)`,
                        zIndex: 1,
                    }}
                >
                    <span
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            color: "#999999",
                        }}
                    >
                        {originalPrice}
                    </span>
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            height: 8,
                            width: `${strikeProgress * 100}%`,
                            backgroundColor: "#ff4444",
                            transform: "translateY(-50%) rotate(-5deg)",
                            borderRadius: 4,
                        }}
                    />
                </div>

                {/* Arrow reveal - appearing during tame */}
                {frame > TAME_START && frame < REVEAL_START && (
                    <div
                        style={{
                            position: "absolute",
                            top: 100,
                            zIndex: 1,
                        }}
                    >
                        <span style={{ fontSize: 60, color: "#FFFFFF", opacity: interpolate(frame, [TAME_START, TAME_START + 5], [0, 1]) }}>▼</span>
                    </div>
                )}

                {/* New price - Moderated reveal */}
                <div
                    style={{
                        position: "absolute",
                        transform: `scale(${newPriceSpring})`,
                        opacity: newPriceSpring > 0 ? 1 : 0,
                        zIndex: 2,
                    }}
                >
                    <span
                        style={{
                            fontSize: 150,
                            fontWeight: 900,
                            color: accentColor,
                            textShadow: `0 0 ${glowPulse}px ${accentColor}, 0 4px 20px rgba(0,0,0,0.6)`,
                            letterSpacing: "0.05em",
                        }}
                    >
                        {newPrice}
                    </span>
                </div>
            </div>
        </AbsoluteFill>
    );
};
