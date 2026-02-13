import "./index.css";
import { Composition, staticFile } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import {
  DURATION_PER_SENTENCE,
  TextToVideo,
  textToVideoSchema,
} from "./TextToVideo";
import { TriviaVideo } from "./TriviaVideo";
import { AdStyleVideo } from "./AdStyleVideo"; // [NEW]
import { VerticalVideo, VerticalVideoSchema } from "./VerticalVideo";
import { MetaAdMain, metaAdSchema } from "./MetaAd/192a-movie_input/Main";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ====== Meta Ad (Instagram Reels/Stories) ====== */}
      <Composition
        id="MetaAd"
        component={MetaAdMain}
        durationInFrames={745}
        fps={30}
        width={1080}
        height={1920}
        schema={metaAdSchema}
        defaultProps={{
          scene1: {
            mainText: "急募",
            subText: "時給1,250円以下\nで働く",
            highlightText: "18〜23歳の方",
            bgColor1: "#e60000",
            bgColor2: "#ffffff",
          },
          scene2: {
            line1: "半年でバイト辞めて、",
            line2: "高単価の学生フリーランス",
            line3: "目指しませんか？",
            emphasisWord1: "半年",
            emphasisWord2: "高単価",
            emphasisColor: "#FFD700",
          },
          scene3_1: {
            text: "突破で話題の",
            numberText: "受講者数40,000名",
            numberColor: "#FFD700",
          },
          scene3_2: {
            text: "短期集中型の\n30日間の\nITスクールが",
            emphasisWord: "30日間",
            emphasisColor: "#00ff88",
          },
          scene3_3: {
            leadText: "なんと今なら先着制で",
            originalPrice: "98,000円",
            newPrice: "0円！",
            accentColor: "#00ff88",
          },
          scene4: {
            benefits: [
              { icon: "🤖", text: "AI・IT基礎\nスキル習得" },
              { icon: "📚", text: "文系理系\n問わずOK" },
              { icon: "👨‍💻", text: "現役エンジニア\nと話せる" },
              { icon: "🎓", text: "就活成功\n実績多数" },
            ],
            accentColor: "#00c853",
          },
          scene5: {
            line1: "しかも違約金も\n解約金も\n一切なし",
            line2: "いつでもブロック可",
          },
          scene6: {
            line1: "まずは友だち追加で",
            line2: "98,000円相当の\n教材が0円",
            line3: "気になる人は\n登録してみて！",
            ctaColor: "#00c853",
          },
        }}
      />

      <Composition
        id="AdStyleVideo"
        component={AdStyleVideo}
        durationInFrames={300} // Adjust based on scenes
        fps={30}
        width={1080}
        height={1920} // Vertical 9:16
        defaultProps={{
          bgmVolume: 0.5,
          voiceVolume: 1.0,
        }}
      />
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />
      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
      <Composition
        id="TextToVideo"
        component={TextToVideo}
        durationInFrames={300} // This will be overridden by calculateMetadata
        fps={30}
        width={1920}
        height={1080}
        schema={textToVideoSchema}
        defaultProps={{
          sentences: [
            "こんにちは",
            "これは",
            "うんこまんが作った",
            "うんこ動画の",
            "うんこ映像です",
            "とても簡単ですね！",
          ],
          emoji: "💩",
        }}
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.sentences.length * DURATION_PER_SENTENCE,
          };
        }}
      />
      <Composition
        id="VerticalVideo"
        component={VerticalVideo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        schema={VerticalVideoSchema}
        defaultProps={{
          scenes: [
            {
              text: "副業のWebスキルを\n身に付けたい。",
              durationInFrames: 45,
              backgroundMediaUrl: staticFile("219-4.mov"),
              backgroundType: "video" as const,
              textColor: "#FFFFFF",
              layout: "center" as const,
              animation: "fadeIn" as const,
            },
            {
              text: "「スクールは高い...」",
              subText: "コストへの不安",
              durationInFrames: 45,
              backgroundType: "video" as const,
              backgroundMediaUrl: staticFile("219-4.mov"),
              textColor: "#FFD700",
              layout: "center" as const,
              animation: "slideUp" as const,
            },
            {
              text: "「払った分を回収できるか...」",
              subText: "投資対効果への懸念",
              durationInFrames: 45,
              backgroundType: "color" as const,
              backgroundColor: "#1a1a1a",
              backgroundMediaUrl:
                "/Users/sugi/Library/CloudStorage/GoogleDrive-takuya.sugitani@tomap.co/共有ドライブ/既存ZeroPlus事業部門（役員   責任者   事業部メンバー）/マーケ/とりあえず移行するよ/旧マーケティング/CR_素材ライブラリ/206動画素材/落ち込む.MOV",
              textColor: "#FFD700",
              layout: "center" as const,
              animation: "slideUp" as const,
            },
            {
              text: "「本当に私にできるのか...」",
              subText: "自分への不信感",
              durationInFrames: 75,
              backgroundType: "color" as const,
              backgroundColor: "#1a1a1a",
              textColor: "#FFD700",
              layout: "center" as const,
              animation: "slideUp" as const,
            },
            {
              text: "そんな不安で\n立ち止まっていませんか？",
              durationInFrames: 90,
              backgroundType: "video" as const,
              backgroundMediaUrl:
                "/Users/sugi/Library/CloudStorage/GoogleDrive-takuya.sugitani@tomap.co/共有ドライブ/既存ZeroPlus事業部門（役員   責任者   事業部メンバー）/マーケ/とりあえず移行するよ/旧マーケティング/CR_素材ライブラリ/206動画素材/落ち込む.MOV",
              textColor: "#FFFFFF",
              layout: "bottom" as const,
              animation: "fadeIn" as const,
            },
            {
              text: "その不安、\n全て解消できます",
              durationInFrames: 75,
              backgroundType: "gradient" as const,
              backgroundColor:
                "linear-gradient(45deg, #004d00 0%, #00cc00 100%)",
              textColor: "#FFFFFF",
              layout: "center" as const,
              animation: "pop" as const,
            },
            {
              text: "累計3万人以上の実績",
              subText: "ZeroPlus Gate",
              durationInFrames: 120,
              backgroundType: "image" as const,
              backgroundMediaUrl:
                "/Users/sugi/Library/CloudStorage/GoogleDrive-takuya.sugitani@tomap.co/共有ドライブ/既存ZeroPlus事業部門（役員   責任者   事業部メンバー）/マーケ/とりあえず移行するよ/旧マーケティング/CR_素材ライブラリ/206動画素材/落ち込む.MOV",
              textColor: "#FFFFFF",
              layout: "center" as const,
              animation: "typewriter" as const,
            },
            {
              text: "今なら無料で1ヶ月間",
              subText: "プログラミングスクールを体験",
              durationInFrames: 150,
              backgroundType: "gradient" as const,
              backgroundColor:
                "linear-gradient(180deg, #FFD700 0%, #FFA500 100%)",
              textColor: "#000000",
              layout: "center" as const,
              animation: "pop" as const,
            },
            {
              text: "監修つきの\n60本以上の動画教材",
              durationInFrames: 90,
              backgroundType: "color" as const,
              backgroundColor: "#002200",
              textColor: "#FFFFFF",
              layout: "center" as const,
              animation: "fadeIn" as const,
            },
            {
              text: "現役エンジニアへの",
              subText: "無制限の質問サポート",
              durationInFrames: 90,
              backgroundType: "color" as const,
              backgroundColor: "#002200",
              textColor: "#FFFFFF",
              layout: "center" as const,
              animation: "slideUp" as const,
            },
            {
              text: "専属メンターが伴走",
              subText: "挫折せずに学ぶことができます",
              durationInFrames: 180,
              backgroundType: "color" as const,
              backgroundColor: "#002200",
              textColor: "#FFFFFF",
              layout: "center" as const,
              animation: "fadeIn" as const,
            },
            {
              text: "無料で受講するにあたり",
              subText: "一つだけお願いがあります",
              durationInFrames: 120,
              backgroundType: "color" as const,
              backgroundColor: "#1a1a1a",
              textColor: "#FFFFFF",
              layout: "center" as const,
              animation: "none" as const,
            },
            {
              text: "1分で答えられる",
              subText: "アンケートにご協力ください",
              durationInFrames: 210,
              backgroundType: "gradient" as const,
              backgroundColor:
                "linear-gradient(180deg, #004d00 0%, #000000 100%)",
              backgroundMediaUrl:
                "/Users/sugi/Library/CloudStorage/GoogleDrive-takuya.sugitani@tomap.co/共有ドライブ/既存ZeroPlus事業部門（役員   責任者   事業部メンバー）/マーケ/とりあえず移行するよ/旧マーケティング/CR_素材ライブラリ/206動画素材/落ち込む.MOV",
              textColor: "#FFFFFF",
              layout: "center" as const,
              animation: "pop" as const,
            },
            {
              text: "理想の自分への一歩を",
              subText: "一緒に踏み出しましょう",
              durationInFrames: 150,
              backgroundType: "video" as const,
              backgroundMediaUrl:
                "https://example.com/assets/success_stepping_placeholder.mp4",
              textColor: "#FFFFFF",
              layout: "bottom" as const,
              animation: "fadeIn" as const,
            },
            {
              text: "人生を変えるには、",
              subText: "この1ヶ月をやり切る覚悟を。",
              durationInFrames: 180,
              backgroundType: "color" as const,
              backgroundColor: "#000000",
              textColor: "#FFD700",
              layout: "center" as const,
              animation: "typewriter" as const,
            },
            {
              text: "この1ヶ月を走り切れば",
              subText: "人生は確実に変わります",
              durationInFrames: 150,
              backgroundType: "gradient" as const,
              backgroundColor:
                "linear-gradient(180deg, #003300 0%, #00cc00 100%)",
              textColor: "#FFFFFF",
              layout: "center" as const,
              animation: "pop" as const,
            },
            {
              text: "追加料金や解約金も",
              subText: "一切かかりません",
              durationInFrames: 120,
              backgroundType: "color" as const,
              backgroundColor: "#1a1a1a",
              backgroundMediaUrl:
                "/Users/sugi/Library/CloudStorage/GoogleDrive-takuya.sugitani@tomap.co/共有ドライブ/既存ZeroPlus事業部門（役員   責任者   事業部メンバー）/マーケ/とりあえず移行するよ/旧マーケティング/CR_素材ライブラリ/206動画素材/落ち込む.MOV",
              textColor: "#FFFFFF",
              layout: "center" as const,
              animation: "slideUp" as const,
            },
            {
              text: "今すぐ下のボタンから",
              subText: "無料体験に申し込む",
              durationInFrames: 120,
              backgroundType: "gradient" as const,
              backgroundColor:
                "linear-gradient(180deg, #FFA500 0%, #FF4500 100%)",
              textColor: "#FFFFFF",
              layout: "center" as const,
              animation: "pop" as const,
            },
          ],
        }}
        calculateMetadata={({ props }) => {
          const totalDuration = props.scenes.reduce(
            (acc, scene) => acc + scene.durationInFrames,
            0,
          );
          return {
            durationInFrames: totalDuration,
          };
        }}
      />
      <Composition
        id="TriviaVideo"
        component={TriviaVideo}
        durationInFrames={300} // 10 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          titleText: "知っていましたか？",
          answerText: "Remotionを使えば\nReactで動画が作れます！",
        }}
      />
    </>
  );
};
