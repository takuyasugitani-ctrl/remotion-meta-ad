import React from "react";
import { Sequence, AbsoluteFill } from "remotion";
import { z } from "zod";
import { Word } from "./TextToVideo/Word";
import { Background } from "./TextToVideo/Background";

export const DURATION_PER_SENTENCE = 90;

export const textToVideoSchema = z.object({
    sentences: z.array(z.string()),
    emoji: z.string().optional(),
});

export const TextToVideo: React.FC<z.infer<typeof textToVideoSchema>> = ({
    sentences,
    emoji,
}) => {
    return (
        <AbsoluteFill>
            {emoji && <Background emoji={emoji} />}
            {sentences.map((text, i) => (
                <Sequence
                    key={i}
                    from={i * DURATION_PER_SENTENCE}
                    durationInFrames={DURATION_PER_SENTENCE}
                >
                    <Word text={text} />
                </Sequence>
            ))}
        </AbsoluteFill>
    );
};
