import {
    AbsoluteFill,
    Series,
    interpolate,
    useCurrentFrame,
    spring,
    useVideoConfig,
    Img,
    Video,
} from "remotion";
import { z } from "zod";

// --- Schema Definitions ---

export const AnimationType = z.enum(["fadeIn", "slideUp", "pop", "typewriter", "none"]);
export const BackgroundType = z.enum(["color", "image", "video", "gradient"]);
export const LayoutType = z.enum(["center", "top", "bottom"]);

export const SceneSchema = z.object({
    text: z.string(),
    subText: z.string().optional(),
    durationInFrames: z.number(),
    // Background
    backgroundType: BackgroundType.default("color"),
    backgroundColor: z.string().optional(), // For 'color' or 'gradient'
    backgroundMediaUrl: z.string().optional(), // For 'image' or 'video'
    // Text Styling & Layout
    textColor: z.string(),
    layout: LayoutType.default("center"),
    // Animation
    animation: AnimationType.default("fadeIn"),
});

export const VerticalVideoSchema = z.object({
    scenes: z.array(SceneSchema),
});

// --- Components ---

// Helper to strip markdown links if present: [url](url) -> url
const cleanUrl = (url?: string) => {
    if (!url) return undefined;
    const match = url.match(/\((https?:\/\/[^)]+)\)/);
    // If it matches markdown link syntax, return the url part.
    // Otherwise return the url as-is (assuming it's already a raw url).
    return match ? match[1] : url;
};

const BackgroundLayer: React.FC<{
    type: z.infer<typeof BackgroundType>;
    color?: string;
    mediaUrl?: string;
}> = ({ type, color, mediaUrl }) => {
    const url = cleanUrl(mediaUrl);

    // Filter out obviously fake URLs from LLMs
    const isInvalidUrl = !url || url.includes("example.com");
    if (type !== "color" && type !== "gradient" && isInvalidUrl) {
        return (
            <AbsoluteFill
                style={{
                    backgroundColor: "#333",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        color: "#fff",
                        fontSize: 40,
                        textAlign: "center",
                        padding: 40,
                        opacity: 0.5,
                    }}
                >
                    ⚠️ Media Placeholder
                    <br />
                    <span style={{ fontSize: 24 }}>(URL was invalid or missing)</span>
                </div>
            </AbsoluteFill>
        );
    }

    if (type === "image" && url) {
        return (
            <AbsoluteFill>
                <Img
                    src={url}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        // We could show a fallback here if we had state, but for now avoiding crash is key.
                        // Since Remotion renders frame by frame, managing onError state is tricky without a wrapper using standard React state.
                        // However, just ensuring it doesn't break the build is a start.
                        // Better approach: use a solid color fallback behind it?
                    }}
                />
                {/* Fallback background in case image fails to load/is transparent */}
                <AbsoluteFill style={{ backgroundColor: "#111", zIndex: -1 }} />

                {/* Overlay for better text readability */}
                <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
            </AbsoluteFill>
        );
    }
    if (type === "video" && url) {
        return (
            <AbsoluteFill>
                <Video
                    src={url}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                    startFrom={0}
                    muted
                    onError={(e) => {
                        console.warn("Video failed to play:", url);
                    }}
                />
                {/* Fallback background */}
                <AbsoluteFill style={{ backgroundColor: "#111", zIndex: -1 }} />
                <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
            </AbsoluteFill>
        );
    }

    // Default to color or gradient
    return <AbsoluteFill style={{ background: color || "#000000" }} />;
};

const ContentLayer: React.FC<{
    text: string;
    subText?: string;
    textColor: string;
    layout: z.infer<typeof LayoutType>;
    animation: z.infer<typeof AnimationType>;
}> = ({ text, subText, textColor, layout, animation }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animation Logic
    let opacity = 1;
    let transform = "translateY(0)";
    let displayText = text;

    // Spring configuration for smooth animations
    const spr = spring({
        frame,
        fps,
        config: { damping: 200 },
    });

    if (animation === "fadeIn") {
        opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
    } else if (animation === "slideUp") {
        opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
        const y = interpolate(spr, [0, 1], [50, 0]);
        transform = `translateY(${y}px)`;
    } else if (animation === "pop") {
        const scale = interpolate(spr, [0, 1], [0.8, 1]);
        opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
        transform = `scale(${scale})`;
    } else if (animation === "typewriter") {
        const charsShown = Math.floor(interpolate(frame, [0, text.length * 2], [0, text.length], { extrapolateRight: "clamp" }));
        displayText = text.substring(0, charsShown);
    }

    // Layout Logic
    const justifyContent =
        layout === "top" ? "flex-start" : layout === "bottom" ? "flex-end" : "center";
    const paddingTop = layout === "top" ? 200 : 40;
    const paddingBottom = layout === "bottom" ? 200 : 40;

    return (
        <AbsoluteFill
            style={{
                justifyContent,
                alignItems: "center",
                paddingTop,
                paddingBottom,
                paddingLeft: 40,
                paddingRight: 40,
            }}
        >
            <div style={{ opacity, transform, textAlign: "center", width: "100%" }}>
                <h1
                    style={{
                        color: textColor,
                        fontSize: 80,
                        fontWeight: "bold",
                        marginBottom: 20,
                        whiteSpace: "pre-wrap",
                        textShadow: "0 4px 10px rgba(0,0,0,0.5)", // Add shadow for better contrast
                    }}
                >
                    {displayText}
                </h1>
                {subText && (
                    <p
                        style={{
                            color: textColor,
                            fontSize: 40,
                            opacity: 0.9,
                            whiteSpace: "pre-wrap",
                            textShadow: "0 2px 5px rgba(0,0,0,0.5)",
                        }}
                    >
                        {subText}
                    </p>
                )}
            </div>
        </AbsoluteFill>
    );
};

const Scene: React.FC<z.infer<typeof SceneSchema>> = (props) => {
    return (
        <AbsoluteFill>
            <BackgroundLayer
                type={props.backgroundType}
                color={props.backgroundColor}
                mediaUrl={props.backgroundMediaUrl}
            />
            <ContentLayer
                text={props.text}
                subText={props.subText}
                textColor={props.textColor}
                layout={props.layout}
                animation={props.animation}
            />
        </AbsoluteFill>
    );
};

export const VerticalVideo: React.FC<z.infer<typeof VerticalVideoSchema>> = ({
    scenes,
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#000" }}>
            <Series>
                {scenes.map((scene, i) => (
                    <Series.Sequence
                        key={i}
                        durationInFrames={scene.durationInFrames}
                    >
                        <Scene {...scene} />
                    </Series.Sequence>
                ))}
            </Series>
        </AbsoluteFill>
    );
};
