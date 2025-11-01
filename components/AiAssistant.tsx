"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
import { Alert } from "@heroui/alert";
import type { AIMessage } from "@/types/ai";

export default function AiAssistant() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<AIMessage[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showWelcome, setShowWelcome] = React.useState(true);

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;
    setError(null);
    setLoading(true);
    setInput("");
    setShowWelcome(false);

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
        body: JSON.stringify({ prompt: messageText, stream: true }),
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
    { label: "Cara mengurus suREK?", text: "Bagaimana cara mengurus suREK?" },
    { label: "Informasi PPDB Online", text: "Informasi tentang PPDB Online" },
    { label: "Pengumuman terbaru", text: "Apa pengumuman terbaru?" },
    { label: "Kontak pemerintah provinsi", text: "Bagaimana cara menghubungi pemerintah provinsi?" },
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          color="warning"
          radius="full"
          size="lg"
          onPress={() => setOpen((v) => !v)}
          isIconOnly
          aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
          className="shadow-lg"
        >
          {open ? "✖" : "💬"}
        </Button>
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
        <Card className="w-[340px] sm:w-[420px] max-h-[70vh] flex flex-col shadow-2xl">
          {/* Yellow Header */}
          <div className="bg-warning text-warning-foreground px-4 py-4 rounded-t-large flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <div className="bg-white rounded-full p-2 mt-1">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Asisten Virtual Sumbar</h3>
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
          <div className="px-4 py-3 flex-1 overflow-auto">
            <div className="flex flex-col gap-3">
              {/* Welcome Message */}
              {showWelcome && messages.length === 0 && (
                <div className="mb-2">
                  <Card className="bg-default-100">
                    <div className="p-4">
                      <p className="text-sm leading-relaxed">
                        Selamat datang di Portal Provinsi Sumatera Barat! Saya asisten virtual Anda. Bagaimana saya dapat membantu Anda hari ini?
                      </p>
                      <div className="mt-3 text-xs text-foreground-500">
                        {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </Card>

                  {/* Quick Actions */}
                  <div className="mt-4">
                    <p className="text-xs font-medium text-foreground-600 mb-2">Pertanyaan cepat:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action, idx) => (
                        <Button
                          key={idx}
                          size="sm"
                          variant="bordered"
                          className="h-auto py-2 px-3 text-xs text-left justify-start whitespace-normal"
                          onPress={() => {
                            setInput(action.text);
                            send(action.text);
                          }}
                          isDisabled={loading}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              {messages.map((m, idx) => {
                const isUser = m.role === "user";
                return (
                  <div key={idx} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <Card
                      className={`max-w-[85%] ${
                        isUser ? "bg-primary text-primary-foreground" : "bg-default-100"
                      }`}
                    >
                      <div className="p-3">
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.content}</p>
                      </div>
                    </Card>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-center gap-2 text-sm text-foreground-500">
                  <Spinner size="sm" color="warning" /> Sedang mengetik...
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="px-4 py-3 border-t flex items-center gap-2">
            <input
              type="text"
              className="flex-1 bg-default-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-warning"
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
              className="shadow-md"
            >
              {loading ? <Spinner size="sm" color="current" /> : "➤"}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
