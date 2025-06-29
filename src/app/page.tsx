"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setTranscript("");
    setError("");
    setCopied(false);
    const formData = new FormData();
    formData.append("file", file);
    const controller = new AbortController();
    setAbortController(controller);
    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
      const data = await res.json();
      if (res.ok) {
        setTranscript(data.text);
        setFile(null); // ファイルリセット
      } else {
        setError(data.error || "文字起こしに失敗しました");
      }
    } catch (e: any) {
      if (e.name === "AbortError") {
        setError("文字起こしをキャンセルしました");
      } else {
        setError("通信エラーが発生しました");
      }
    } finally {
      setLoading(false);
      setAbortController(null);
    }
  };

  const handleCancel = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          音声ファイルの文字起こしツール
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md border p-4 rounded bg-white/80 shadow items-center"
        >
          <label className="font-semibold">音声ファイルをアップロード</label>
          <input
            id="file-input"
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            required
            className="hidden"
            disabled={loading}
          />
          <div className="flex items-center justify-center gap-2 w-full">
            <label htmlFor="file-input">
              <span
                className={`inline-block bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded cursor-pointer ${
                  loading ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                ファイルを選択
              </span>
            </label>
            <span className="truncate max-w-[250px] text-sm text-gray-700">
              {file ? file.name : "ファイルが選択されていません"}
            </span>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
            disabled={loading || !file}
          >
            {loading ? "文字起こし中..." : "アップロードして文字起こし"}
          </button>
          {loading && (
            <button
              type="button"
              className="bg-red-500 text-white rounded px-4 py-2 mt-2"
              onClick={handleCancel}
            >
              キャンセル
            </button>
          )}
        </form>
        {error && <div className="text-red-600">{error}</div>}
        {transcript && (
          <div className="w-full max-w-2xl p-4 bg-gray-100 rounded shadow mt-4 whitespace-pre-wrap relative">
            <h2 className="font-bold mb-2">文字起こし結果</h2>
            <button
              type="button"
              aria-label="コピー"
              className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded flex items-center gap-1"
              onClick={async () => {
                await navigator.clipboard.writeText(transcript);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
              >
                <rect
                  x="9"
                  y="9"
                  width="13"
                  height="13"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="3"
                  y="3"
                  width="13"
                  height="13"
                  rx="2"
                  fill="currentColor"
                />
              </svg>
              コピー
            </button>
            {copied && (
              <span className="absolute top-0 right-16 bg-black text-white text-xs rounded px-2 py-1 shadow animate-fade-in-out z-10">
                コピーしました
              </span>
            )}
            {transcript}
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://bel-itigo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          ベル15の開発ブログ
        </a>
      </footer>
    </div>
  );
}

// tailwindのアニメーション用クラス
// .animate-fade-in-out { animation: fadeInOut 1.2s; }
// @keyframes fadeInOut { 0%{opacity:0;} 10%{opacity:1;} 90%{opacity:1;} 100%{opacity:0;} }
