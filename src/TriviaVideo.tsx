import React from "react";
import {
    AbsoluteFill,
    Audio,
    interpolate,
    staticFile,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

export const TriviaVideo: React.FC<{
    titleText: string;
    answerText: string;
    voiceVolume?: number;
    bgmVolume?: number;
}> = ({
    titleText = "Did you know?",
    answerText = "Remotion is a library for creating videos programmatically in React!",
    voiceVolume = 1,
    bgmVolume = 0.4,
}) => {
        const frame = useCurrentFrame();
        const { durationInFrames } = useVideoConfig();

        // Animation timing
        const fadeDuration = 30; // 1 second fade

        // Title fades in at start, fades out in middle
        // Answer fades in after title, stays until end
        const splitFrame = durationInFrames / 2;

        const titleOpacity = interpolate(
            frame,
            [0, fadeDuration, splitFrame - fadeDuration, splitFrame],
            [0, 1, 1, 0],
            { extrapolateRight: "clamp" }
        );

        const answerOpacity = interpolate(
            frame,
            [splitFrame, splitFrame + fadeDuration, durationInFrames - fadeDuration, durationInFrames],
            [0, 1, 1, 0],
            { extrapolateRight: "clamp" }
        );

        return (
            <AbsoluteFill
                style={{
                    background: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)", // Fallback gradient
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "Inter, sans-serif",
                    color: "white",
                    fontSize: 60,
                    textAlign: "center",
                    padding: 40,
                }}
            >
                <Audio src={staticFile("219-4.mov")} volume={bgmVolume} />

                {/* 
        User needs to place 'voice.wav' in public folder.
        We use a conditional check or just let it fail gracefully/warn if missing. 
        Remotion doesn't crash on missing audio usually, just logs error.
      */}
                <Audio src={staticFile("voice.wav")} volume={voiceVolume} />

                <div style={{ opacity: titleOpacity, position: "absolute", width: "80%" }}>
                    <h1 style={{ fontWeight: 800 }}>{titleText}</h1>
                </div>

                <div style={{ opacity: answerOpacity, position: "absolute", width: "80%" }}>
                    <h2 style={{ fontWeight: 600 }}>{answerText}</h2>
                </div>
            </AbsoluteFill>
        );
    };
