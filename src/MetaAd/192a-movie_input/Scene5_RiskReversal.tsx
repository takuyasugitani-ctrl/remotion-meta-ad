import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

interface Scene5Props {
    line1: string;
    line2: string;
}

export const Scene5_RiskReversal: React.FC<Scene5Props> = ({
    line1,
    line2,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Phase 1: 0-60 frames (approx 2s)
    // Phase 2: 60-120 frames (approx 2s)
    const PHASE_1_DURATION = 60;

    // Phase 1 Animation
    const phase1Spring = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 200 },
    });
    const phase1Opacity = frame > PHASE_1_DURATION - 10 ? interpolate(frame, [PHASE_1_DURATION - 10, PHASE_1_DURATION], [1, 0]) : 1;

    // Phase 1 Sub-timing
    const REVEAL_2_START = 25;

    // Second part of Phase 1: "一切ナシ" pop
    const 一切ナシSpring = spring({
        frame: frame - REVEAL_2_START,
        fps,
        config: { damping: 10, stiffness: 200 },
    });

    // Phase 2 Animation
    const phase2Spring = spring({
        frame: frame - PHASE_1_DURATION,
        fps,
        config: { damping: 12, stiffness: 200 },
    });

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                padding: "0 55px",
                fontFamily:
                    '"Hiragino Kaku Gothic ProN", "Noto Sans JP", system-ui, sans-serif',
            }}
        >
            {/* Warm glow circle */}
            <div
                style={{
                    position: "absolute",
                    width: 600,
                    height: 600,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(255,180,100,0.15) 0%, transparent 70%)",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            {/* Phase 1: Line 1 */}
            {frame < PHASE_1_DURATION && (
                <div
                    style={{
                        position: "absolute",
                        opacity: phase1Opacity,
                        transform: `scale(${phase1Spring})`,
                        textAlign: "center",
                        width: "100%",
                        zIndex: 1,
                    }}
                >

                    <div
                        style={{
                            fontSize: 54,
                            fontWeight: 900,
                            color: "#FFFFFF",
                            lineHeight: 1.4,
                            whiteSpace: "pre-line",
                            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                        }}
                    >
                        <div>{"しかも違約金も、解約金も"}</div>
                        <div
                            style={{
                                transform: `scale(${一切ナシSpring})`,
                                opacity: 一切ナシSpring,
                                fontSize: 80,
                                color: "#FFD700", // Gold color for emphasis
                                marginTop: 10,
                            }}
                        >
                            {"一切ナシ"}
                        </div>
                    </div>
                </div>
            )}

            {/* Phase 2: Line 2 */}
            {frame >= PHASE_1_DURATION && (
                <div
                    style={{
                        position: "absolute",
                        transform: `scale(${phase2Spring})`,
                        textAlign: "center",
                        width: "100%",
                        zIndex: 1,
                    }}
                >

                    <div
                        style={{
                            fontSize: 48,
                            fontWeight: 900,
                            color: "#FFFFFF",
                            lineHeight: 1.4,
                            whiteSpace: "pre-line",
                            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                        }}
                    >
                        {line2}
                    </div>
                </div>
            )}
        </AbsoluteFill>
    );
};
