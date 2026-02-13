import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { z } from "zod";
import { Scene1_Hook } from "./Scene1_Hook";
import { Scene2_Problem } from "./Scene2_Problem";
import { Scene3_1_Offer } from "./Scene3_1_Offer";
import { Scene3_2_Offer } from "./Scene3_2_Offer";
import { Scene3_3_Offer } from "./Scene3_3_Offer";
import { Scene4_Benefit } from "./Scene4_Benefit";
import { Scene5_RiskReversal } from "./Scene5_RiskReversal";
import { Scene6_CTA } from "./Scene6_CTA";

// ========================================
// Zod Schema — A/B テスト用の Dynamic Props
// ========================================
export const metaAdSchema = z.object({
    // Scene 1: Hook (0s - 3s = frame 0-90)
    scene1: z.object({
        mainText: z.string(),
        subText: z.string(),
        highlightText: z.string(),
        bgColor1: z.string(),
        bgColor2: z.string(),
    }),

    // Scene 2: Problem (3s - 6s = frame 90-180)
    scene2: z.object({
        line1: z.string(),
        line2: z.string(),
        line3: z.string(),
        emphasisWord1: z.string(),
        emphasisWord2: z.string(),
        emphasisColor: z.string(),
    }),

    // Scene 3-1: Offer — 受講者数 (6s - 7.3s = frame 180-220)
    scene3_1: z.object({
        text: z.string(),
        numberText: z.string(),
        numberColor: z.string(),
    }),

    // Scene 3-2: Offer — ITスクール (7.3s - 8.7s = frame 220-260)
    scene3_2: z.object({
        text: z.string(),
        emphasisWord: z.string(),
        emphasisColor: z.string(),
    }),

    // Scene 3-3: Offer — 価格 (8.7s - 10s = frame 260-300)
    scene3_3: z.object({
        leadText: z.string(),
        originalPrice: z.string(),
        newPrice: z.string(),
        accentColor: z.string(),
    }),

    // Scene 4: Benefit (10s - 16s = frame 300-480)
    scene4: z.object({
        benefits: z.array(z.object({
            icon: z.string(),
            text: z.string(),
        })),
        accentColor: z.string(),
    }),

    // Scene 5: Risk Reversal (16s - 20s = frame 480-600)
    scene5: z.object({
        line1: z.string(),
        line2: z.string(),
    }),

    // Scene 6: CTA (20s - 25s = frame 600-750)
    scene6: z.object({
        line1: z.string(),
        line2: z.string(),
        line3: z.string(),
        ctaColor: z.string(),
    }),
});

export type MetaAdProps = z.infer<typeof metaAdSchema>;

// ========================================
// Scene Timeline
// ========================================
const SCENES = {
    hook: { from: 0, duration: 90 },  // 0s - 3s
    problem: { from: 90, duration: 90 },  // 3s - 6s
    offer1: { from: 180, duration: 40 },  // 6s - 7.3s
    offer2: { from: 220, duration: 40 },  // 7.3s - 8.7s
    offer3: { from: 260, duration: 75 },  // 8.7s - 11.2s (2.5s)
    benefit: { from: 335, duration: 140 },  // 11.2s - 15.8s
    riskReversal: { from: 475, duration: 120 },  // 15.8s - 19.8s
    cta: { from: 595, duration: 150 },  // 19.8s - 24.8s
} as const;

// ========================================
// Main Component
// ========================================
export const MetaAdMain: React.FC<MetaAdProps> = ({
    scene1,
    scene2,
    scene3_1,
    scene3_2,
    scene3_3,
    scene4,
    scene5,
    scene6,
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#000000" }}>
            {/* Safe Zone wrapper: top 15%, bottom 20% for Instagram Reels UI */}
            <AbsoluteFill
                style={{
                    paddingTop: "15%",
                    paddingBottom: "20%",
                }}
            >
                {/* Scene 1: Hook */}
                <Sequence
                    from={SCENES.hook.from}
                    durationInFrames={SCENES.hook.duration}
                >
                    <Scene1_Hook {...scene1} />
                </Sequence>

                {/* Scene 2: Problem */}
                <Sequence
                    from={SCENES.problem.from}
                    durationInFrames={SCENES.problem.duration}
                >
                    <Scene2_Problem {...scene2} />
                </Sequence>

                {/* Scene 3-1: Offer — 受講者数 */}
                <Sequence
                    from={SCENES.offer1.from}
                    durationInFrames={SCENES.offer1.duration}
                >
                    <Scene3_1_Offer {...scene3_1} />
                </Sequence>

                {/* Scene 3-2: Offer — ITスクール */}
                <Sequence
                    from={SCENES.offer2.from}
                    durationInFrames={SCENES.offer2.duration}
                >
                    <Scene3_2_Offer {...scene3_2} />
                </Sequence>

                {/* Scene 3-3: Offer — 価格 */}
                <Sequence
                    from={SCENES.offer3.from}
                    durationInFrames={SCENES.offer3.duration}
                >
                    <Scene3_3_Offer {...scene3_3} />
                </Sequence>

                {/* Scene 4: Benefit */}
                <Sequence
                    from={SCENES.benefit.from}
                    durationInFrames={SCENES.benefit.duration}
                >
                    <Scene4_Benefit {...scene4} />
                </Sequence>

                {/* Scene 5: Risk Reversal */}
                <Sequence
                    from={SCENES.riskReversal.from}
                    durationInFrames={SCENES.riskReversal.duration}
                >
                    <Scene5_RiskReversal {...scene5} />
                </Sequence>

                {/* Scene 6: CTA */}
                <Sequence
                    from={SCENES.cta.from}
                    durationInFrames={SCENES.cta.duration}
                >
                    <Scene6_CTA {...scene6} />
                </Sequence>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
