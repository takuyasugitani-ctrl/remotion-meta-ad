import React from "react";
import {
    AbsoluteFill,
    Audio,
    Img,
    Sequence,
    spring,
    staticFile,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

// --- Types ---
type SceneType = "hook" | "checklist" | "solution" | "cta";

interface Scene {
    type: SceneType;
    text?: string;
    subText?: string;
    durationInFrames: number;
    highlightColor?: string; // e.g., "red", "yellow"
    backgroundImage?: string; // Nano Banana Pro image path
}

interface AdStyleVideoProps {
    bgmVolume?: number;
    voiceVolume?: number;
    scenes?: Scene[];
}

// --- Sub-components ---

const HookScene: React.FC<{ text: string; subText?: string; highlightColor?: string; backgroundImage?: string }> = ({
    text,
    subText,
    highlightColor = "#FF0000", // Default red for "Check this out!"
    backgroundImage,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        config: { damping: 200 },
    });

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
            }}
        >
            {backgroundImage && (
                <Img
                    src={backgroundImage}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.8,
                    }}
                />
            )}
            <div
                style={{
                    transform: `scale(${scale})`,
                    backgroundColor: highlightColor,
                    padding: "40px",
                    borderRadius: "20px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    zIndex: 1,
                }}
            >
                <h1
                    style={{
                        color: "white",
                        fontSize: "80px",
                        fontWeight: 900,
                        margin: 0,
                        textAlign: "center",
                        lineHeight: 1.2,
                        fontFamily: "Inter, sans-serif",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {text}
                </h1>
                {subText && (
                    <h2
                        style={{
                            color: "white",
                            fontSize: "40px",
                            marginTop: "20px",
                            textAlign: "center",
                            position: "relative",
                            zIndex: 1,
                        }}
                    >
                        {subText}
                    </h2>
                )}
            </div>
        </AbsoluteFill>
    );
};

const ChecklistScene: React.FC<{ text: string; items: string[] }> = ({
    text,
    items,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#f0f0f0",
                padding: "60px",
                fontFamily: "Inter, sans-serif",
            }}
        >
            <h2
                style={{
                    fontSize: "50px",
                    marginBottom: "40px",
                    textAlign: "center",
                    color: "#333",
                }}
            >
                {text}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                {items.map((item, index) => {
                    const delay = index * 15; // Stagger effect
                    const entrance = spring({
                        frame: frame - delay,
                        fps,
                        config: { damping: 100 },
                    });

                    return (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "white",
                                padding: "20px",
                                borderRadius: "15px",
                                transform: `translateX(${(1 - entrance) * -100}px)`,
                                opacity: entrance,
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            }}
                        >
                            <span style={{ fontSize: "50px", marginRight: "20px" }}>✅</span>
                            <span style={{ fontSize: "40px", fontWeight: "bold" }}>{item}</span>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

// --- Main Component ---

export const AdStyleVideo: React.FC<AdStyleVideoProps> = ({
    bgmVolume = 0.5,
    voiceVolume = 1.0,
    scenes = [
        {
            type: "hook",
            text: "赤字覚悟\nキャンペーン！", // "Deficit-prepared campaign"
            subText: "今だけ無料！？", // "Free only now!?"
            durationInFrames: 60,
            highlightColor: "#e60000", // Bright Red
        },
        {
            type: "checklist",
            text: "こんな悩みありませんか？", // "Do you have these worries?"
            durationInFrames: 90,
            // We'll pass items via a hack or specific prop for now based on scene type logic below
        },
        {
            type: "solution",
            text: "Nano Banana Proで\n解決！",
            durationInFrames: 60,
            highlightColor: "#FFD700", // Gold
        },
    ],
}) => {
    // Helper to calculate start frames
    let currentStartFrame = 0;

    return (
        <AbsoluteFill style={{ backgroundColor: "white" }}>
            {/* Placeholder for BGM - ensure file exists in public/ */}
            <Audio src={staticFile("219-4.mov")} volume={bgmVolume} loop />

            {/* Placeholder for Voicebox Audio - user to replace */}
            {/* <Audio src={staticFile("voice.wav")} volume={voiceVolume} /> */}

            {scenes.map((scene, index) => {
                const start = currentStartFrame;
                currentStartFrame += scene.durationInFrames;

                return (
                    <Sequence
                        key={index}
                        from={start}
                        durationInFrames={scene.durationInFrames}
                    >
                        {scene.type === "hook" && (
                            <HookScene
                                text={scene.text || ""}
                                subText={scene.subText}
                                highlightColor={scene.highlightColor}
                                backgroundImage={scene.backgroundImage}
                            />
                        )}
                        {scene.type === "checklist" && (
                            <ChecklistScene
                                text={scene.text || "Checklist"}
                                items={[
                                    "画像生成が難しい...",
                                    "著作権が心配...",
                                    "高品質な素材が欲しい",
                                ]}
                            />
                        )}
                        {scene.type === "solution" && (
                            <HookScene
                                text={scene.text || "Solution"}
                                subText={scene.subText}
                                highlightColor={scene.highlightColor || "#00cc00"}
                                backgroundImage={scene.backgroundImage}
                            />
                        )}
                        {/* Add more scene types as needed */}
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};
