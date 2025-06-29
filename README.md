# Audio Transcription Tool

英会話のレッスンの音声ファイルを文字おこしするプログラム  
Next.js + Whisper で作りました。  
1 回あたり$0.15（約 23 円ほど）（25 分の場合）

## 実行手順

1. .env の作成

```bash
cp .env.example .env
```

2. .env に Open AI API Key を入れ、保存

```env
OPENAI_API_KEY="（ここにOpenAIのAPIキーを入れる）"
```

3. 実行

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

[http://localhost:3000](http://localhost:3000)で動作を確認する。
