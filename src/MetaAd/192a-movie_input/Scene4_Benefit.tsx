import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

interface BenefitItem {
    icon: string;
    text: string;
}

interface Scene4Props {
    benefits: BenefitItem[];
    accentColor: string;
}

export const Scene4_Benefit: React.FC<Scene4Props> = ({
    benefits,
    accentColor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Phase 1: 0-35 frames
    // Phase 2: 35-70 frames
    // Phase 3: 70-180 frames (Grid Appeal)

    // Phrase 1 animations
    const phrase1Spring = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 200 },
    });
    const phrase1Out = spring({
        frame: frame - 25,
        fps,
        config: { damping: 12, stiffness: 200 },
    });
    const phrase1Scale = interpolate(phrase1Spring, [0, 1], [0.5, 1]) * interpolate(phrase1Out, [0, 1], [1, 1.2]);
    const phrase1Opacity = phrase1Spring * (1 - phrase1Out);

    // Phrase 2 animations
    const phrase2Spring = spring({
        frame: frame - 35,
        fps,
        config: { damping: 12, stiffness: 200 },
    });
    const phrase2Out = spring({
        frame: frame - 60,
        fps,
        config: { damping: 12, stiffness: 200 },
    });
    const phrase2Scale = interpolate(phrase2Spring, [0, 1], [0.5, 1]) * interpolate(phrase2Out, [0, 1], [1, 1.2]);
    const phrase2Opacity = phrase2Spring * (1 - phrase2Out);

    return (
        <AbsoluteFill
            style={{
                background:
                    "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 40px",
                fontFamily:
                    '"Hiragino Kaku Gothic ProN", "Noto Sans JP", system-ui, sans-serif',
            }}
        >
            {/* Phase 1 Text */}
            {frame < 35 && (
                <div
                    style={{
                        position: "absolute",
                        transform: `scale(${phrase1Scale})`,
                        opacity: phrase1Opacity,
                        textAlign: "center",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            fontSize: 70,
                            fontWeight: 900,
                            color: "#FFFFFF",
                            whiteSpace: "pre-line",
                            lineHeight: 1.2,
                            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                        }}
                    >
                        {"社会人が使う\nスクールだから、、、"}
                    </div>
                </div>
            )}

            {/* Phase 2 Text */}
            {frame >= 35 && frame < 70 && (
                <div
                    style={{
                        position: "absolute",
                        transform: `scale(${phrase2Scale})`,
                        opacity: phrase2Opacity,
                        textAlign: "center",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            fontSize: 70,
                            fontWeight: 900,
                            color: "#FFD700",
                            whiteSpace: "pre-line",
                            lineHeight: 1.2,
                            textShadow: "0 0 30px rgba(255,215,0,0.3)",
                        }}
                    >
                        {"即戦力級の\nスキルが\n身につく！"}
                    </div>
                </div>
            )}

            {/* Phase 3: 2x2 Grid of benefit boxes */}
            {frame >= 70 && (
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 24,
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    {benefits.map((benefit, index) => {
                        // Rapid entry: 70, 80, 90, 100
                        const entryDelay = 70 + index * 10;

                        // Box scale pop
                        const boxSpring = spring({
                            frame: frame - entryDelay,
                            fps,
                            config: { damping: 10, stiffness: 180, mass: 0.5 },
                        });

                        // Icon bounce
                        const iconSpring = spring({
                            frame: frame - entryDelay - 5,
                            fps,
                            config: { damping: 6, stiffness: 220, mass: 0.3 },
                        });

                        const floatY = interpolate(
                            Math.sin((frame - entryDelay) * 0.1 + index),
                            [-1, 1],
                            [-3, 3],
                        );

                        return (
                            <div
                                key={index}
                                style={{
                                    width: "46%",
                                    transform: `scale(${boxSpring}) translateY(${boxSpring > 0.9 ? floatY : 0}px)`,
                                    opacity: boxSpring,
                                }}
                            >
                                <div
                                    style={{
                                        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
                                        borderRadius: 24,
                                        padding: "32px 20px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 16,
                                        border: "1px solid rgba(255,255,255,0.12)",
                                        backdropFilter: "blur(10px)",
                                        boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: "50%",
                                            background: `linear-gradient(135deg, ${accentColor}44, ${accentColor}22)`,
                                            border: `2px solid ${accentColor}66`,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            transform: `scale(${iconSpring})`,
                                            boxShadow: `0 0 20px ${accentColor}33`,
                                        }}
                                    >
                                        <span style={{ fontSize: 44 }}>{benefit.icon}</span>
                                    </div>

                                    <span
                                        style={{
                                            fontSize: 34,
                                            fontWeight: 700,
                                            color: "#FFFFFF",
                                            textAlign: "center",
                                            lineHeight: 1.4,
                                            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                                            whiteSpace: "pre-line",
                                        }}
                                    >
                                        {benefit.text}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </AbsoluteFill>
    );
};
