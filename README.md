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

3. パッケージのインストール

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

4. dev サーバー立ち上げ

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

## ライセンス

このリポジトリに含まれるソースコードは、学習・研究・ポートフォリオ参照を目的として公開されています。

- **商用利用、再配布、営利目的での利用は禁止されています。**
- 商用利用をご希望の場合は、事前にご相談ください。
- 含まれるオープンソースライブラリ（Next.js、Tailwind CSS など）はそれぞれのライセンスに従ってご利用ください。

詳しくは [LICENSE](./LICENSE) をご確認ください。
