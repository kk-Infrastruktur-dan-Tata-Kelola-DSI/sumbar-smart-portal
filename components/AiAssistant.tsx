"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
import { Alert } from "@heroui/alert";
import { NotepadText, Volume2, VolumeX } from "lucide-react";
import { useTTS } from "@/contexts/TTSContext";
import type { AIMessage } from "@/types/ai";

export default function AiAssistant() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<AIMessage[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [greeting, setGreeting] = React.useState<string>("Selamat datang");
  const [timeString, setTimeString] = React.useState<string | null>(null);
  
  // Use TTS Context
  const { ttsEnabled, isSpeaking, toggleTTS } = useTTS();

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const chatContainerRef = React.useRef<HTMLDivElement | null>(null);
  
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading, open]);

  // Get dynamic greeting based on time
  React.useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const t = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    setTimeString(t);
    
    let greetingText = "Selamat malam";
    if (hour >= 3 && hour < 10) {
      greetingText = "Selamat pagi";
    } else if (hour >= 10 && hour < 15) {
      greetingText = "Selamat siang";
    } else if (hour >= 15 && hour < 18) {
      greetingText = "Selamat sore";
    }
    setGreeting(greetingText);
  }, []);

  const send = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;
    setError(null);
    setLoading(true);
    setInput("");

    // Push user message and placeholder for assistant
    const next = [
      ...messages,
      { role: "user", content: messageText } as AIMessage,
      { role: "assistant", content: "" } as AIMessage,
    ];
    setMessages(next);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: messageText, 
          stream: true,
          currentPage: pathname 
        }),
      });

      if (!res.ok) {
        const ct = res.headers.get("content-type") || "";
        if (ct.includes("application/json")) {
          const data = await res.json();
          throw new Error(data?.error || data?.details || "Request failed");
        } else {
          const txt = await res.text();
          throw new Error(txt || "Request failed");
        }
      }

      // Stream response
      if (!res.body) {
        throw new Error("No response body");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        acc += chunk;
        setMessages((prev) => {
          const copy = [...prev];
          // Update last assistant message
          for (let i = copy.length - 1; i >= 0; i--) {
            if (copy[i].role === "assistant") {
              copy[i] = { ...copy[i], content: acc } as AIMessage;
              break;
            }
          }
          return copy;
        });
      }

      // Final update to ensure complete content
      setMessages((prev) => {
        const copy = [...prev];
        for (let i = copy.length - 1; i >= 0; i--) {
          if (copy[i].role === "assistant") {
            copy[i] = { ...copy[i], content: acc || "(no response)" } as AIMessage;
            break;
          }
        }
        return copy;
      });
    } catch (e: any) {
      setError(e?.message || String(e));
      // Remove placeholder assistant message on error
      setMessages((prev) => {
        const copy = [...prev];
        if (copy.length > 0 && copy[copy.length - 1].role === "assistant" && !copy[copy.length - 1].content) {
          copy.pop();
        }
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      send();
    }
  };

  const quickActions = [
    { label: "Tempat wisata di Sumbar", text: "Apa saja tempat wisata menarik di Sumatera Barat?" },
    { label: "APBD tahun 2025", text: "Berapa anggaran Sumbar tahun 2025?" },
    { label: "Cara akses PPID", text: "Bagaimana cara mengakses informasi publik melalui PPID?" },
    { label: "Laporan keuangan daerah", text: "Bagaimana cara melihat laporan keuangan daerah Sumbar?" },
  ];

  return (
    <>
      {/* Floating Accessibility/TTS Button */}
      <div className="fixed bottom-44 right-6 z-50 group" suppressHydrationWarning>
        <div className="flex items-center gap-2" suppressHydrationWarning>
          <span className={`${ttsEnabled ? 'bg-success text-success-foreground' : 'bg-danger text-danger-foreground'} px-4 py-2 rounded-full shadow-lg font-medium text-sm whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none`}>
            {ttsEnabled ? "Mode Aksesibilitas: Aktif" : "Mode Aksesibilitas"}
          </span>
          <Button
            color={ttsEnabled ? "success" : "danger"}
            radius="full"
            size="lg"
            onPress={toggleTTS}
            isIconOnly
            aria-label={ttsEnabled ? "Nonaktifkan Mode Aksesibilitas" : "Aktifkan Mode Aksesibilitas"}
            className="shadow-lg relative"
          >
            {isSpeaking ? (
              <Volume2 className="w-6 h-6 animate-pulse" />
            ) : ttsEnabled ? (
              <Volume2 className="w-6 h-6" />
            ) : (
              <VolumeX className="w-6 h-6" />
            )}
            {ttsEnabled && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
            )}
          </Button>
        </div>
      </div>

      {/* Floating Notepad Button */}
      <div className="fixed bottom-24 right-6 z-50 group" suppressHydrationWarning>
        <div className="flex items-center gap-2" suppressHydrationWarning>
          <span className="bg-warning text-warning-foreground px-4 py-2 rounded-full shadow-lg font-medium text-sm whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
            Survei Kepuasan Masyarakat
          </span>
          <Button
            as="a"
            href="https://forms.gle/AhScbDbK5g8551C59"
            target="_blank"
            rel="noopener noreferrer"
            color="warning"
            radius="full"
            size="lg"
            isIconOnly
            aria-label="Open Survey"
            className="shadow-lg"
          >
            <NotepadText className="w-6 h-6 text-black rotate-[-15deg]" />
          </Button>
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 group" suppressHydrationWarning>
        <div className="flex items-center gap-2" suppressHydrationWarning>
          <span className="bg-warning text-warning-foreground px-4 py-2 rounded-full shadow-lg font-medium text-sm whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
            Tanyo Mamak
          </span>
          <Button
            color="warning"
            radius="full"
            size="lg"
            onPress={() => setOpen((v) => !v)}
            isIconOnly
            aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
            className="shadow-lg p-3"
          >
            {open ? (
              <span className="text-xl">✖</span>
            ) : (
              <Image src="/images/tanyomamak.svg" alt="Tanyo Mamak" width={32} height={32} className="w-8 h-8" />
            )}
          </Button>
        </div>
      </div>

      {/* Anchored Sliding Panel */}
      <div
        className={
          `fixed right-6 z-50 transition-all duration-200 ` +
          (open
            ? "bottom-24 opacity-100 translate-y-0"
            : "bottom-6 opacity-0 translate-y-3 pointer-events-none")
        }
      >
        <div className="w-[340px] sm:w-[420px] max-h-[70vh] flex flex-col bg-white dark:bg-background rounded-3xl shadow-2xl border-0 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-warning to-warning-400 text-warning-foreground px-4 py-4 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <div className="bg-transparent rounded-full p-2 mt-1">
                <Image src="/images/tanyomamak.svg" alt="Tanyo Mamak" width={32} height={32} className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Tanyo Mamak</h3>
                <p className="text-xs opacity-90 mt-0.5">Siap membantu 24/7</p>
              </div>
            </div>
            <Button 
              variant="light" 
              isIconOnly 
              size="sm" 
              onPress={() => setOpen(false)} 
              aria-label="Close"
              className="text-warning-foreground"
            >
              ✖
            </Button>
          </div>

          {error && (
            <div className="px-4 pt-3">
              <Alert color="danger" variant="flat" className="text-sm">
                {error}
              </Alert>
            </div>
          )}

          {/* Messages Area */}
          <div ref={chatContainerRef} className="px-4 py-3 flex-1 overflow-auto scroll-smooth">
            <div className="flex flex-col gap-3">
              {/* Welcome Message */}
              {messages.length === 0 && (
                <div className="mb-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 rounded-2xl p-4 border-0">
                    <div>
                      <p className="text-sm font-semibold mb-1" suppressHydrationWarning>👋 {greeting}!</p>
                      <p className="text-sm leading-relaxed text-foreground-700">
                        Saya Mamak. Sebagai Mamak siap membantu Anda menemukan informasi tentang wisata, keuangan daerah, layanan digital, dan berbagai informasi lainnya seputar Sumatera Barat. Ada yang bisa saya bantu?
                      </p>
                      <div className="mt-3 text-xs text-foreground-500" suppressHydrationWarning>
                        {timeString ?? ""}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              

              {/* Chat Messages */}
              {messages.map((m, idx) => {
                const isUser = m.role === "user";
                const isLastAssistantMessage = !isUser && idx === messages.length - 1 && loading;
                
                return (
                  <div 
                    key={idx} 
                    className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 border-0 ${
                        isUser 
                          ? "bg-warning text-warning-foreground shadow-sm" 
                          : "bg-gradient-to-br from-default-50 to-default-100 dark:from-default-100 dark:to-default-200 shadow-sm"
                      } ${!isUser && isLastAssistantMessage ? "w-[85%] min-w-[240px]" : ""}`}
                    >
                      {isUser ? (
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.content}</p>
                      ) : (
                        <div className="relative">
                          {!!m.content && (
                            <div 
                              className="text-sm whitespace-pre-wrap leading-relaxed prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: m.content }}
                            />
                          )}
                          {isLastAssistantMessage && (
                            <div className={`${m.content ? "mt-2" : ""} overflow-hidden`}>
                              <div className="space-y-2 max-w-full">
                                <div className="h-3 w-[60%] shimmer-line rounded"></div>
                                <div className="h-3 w-[75%] shimmer-line rounded"></div>
                                <div className="h-3 w-[28%] shimmer-line rounded"></div>
                              </div>
                              <span className="inline-flex items-center gap-1 mt-2 align-baseline">
                                <span className="typing-dot bg-warning inline-block w-1.5 h-1.5" style={{ animationDelay: "0ms" }} />
                                <span className="typing-dot bg-warning inline-block w-1.5 h-1.5" style={{ animationDelay: "150ms" }} />
                                <span className="typing-dot bg-warning inline-block w-1.5 h-1.5" style={{ animationDelay: "300ms" }} />
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div ref={scrollRef} />
            </div>
          </div>

          {/* Quick Actions docked above input */}
          <div className="px-4 pb-2 pt-1 border-t-0">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
              <p className="text-xs font-semibold text-foreground-700 mb-2">💡 Pertanyaan cepat:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(action.text);
                      send(action.text);
                    }}
                    disabled={loading}
                    className="h-auto py-2.5 px-3 text-xs text-left whitespace-normal bg-white dark:bg-background border border-default-200 rounded-xl hover:border-warning hover:bg-warning/5 hover:shadow-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="px-4 py-3 bg-default-50 dark:bg-default-100 flex items-center gap-2 border-0">
            <input
              type="text"
              className="flex-1 bg-white dark:bg-background rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-warning border border-default-200 transition-all duration-200 hover:border-warning/50 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Ketik pertanyaan Anda..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              disabled={loading}
            />
            <Button 
              color="warning" 
              isIconOnly 
              radius="full"
              onPress={() => send()}
              isDisabled={loading || !input.trim()}
              className="transition-transform duration-200 hover:scale-110 active:scale-95 shadow-md"
            >
              {loading ? <Spinner size="sm" color="current" /> : "➤"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
