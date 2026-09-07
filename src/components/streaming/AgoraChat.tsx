"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, MessagesSquare, Sparkles, Flame, Shield, User } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: string;
  role: string;
  roleType: "director" | "tecnico" | "actriz" | "musico" | "staff";
  avatar?: string;
  initials?: string;
  time: string;
  text: string;
}

export default function AgoraChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "Valentin Ramos",
      role: "Director General",
      roleType: "director",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB4AxDnqmXvbMLeNcWb4KsMTGKpwwJfWzqcK39TJfLpkd9jPgElmdZOsH8KAUIyVUiPwl3SvwrL20QMmNZwpxGuXvm5JG45VJb75VRinFbHGzwjsOcnhQUpTBINvysbCEfien4VKhYAcAWuKt6sK3GSa28UpB3FSBhxEsHcv5AWjMQF-hhjvqKhxTFPVIGk-AdUBRRTvGSJ0loFb--BrrOIsZX5LqfJeReIvu2risbDyKwQKTWozzy__w",
      time: "21:04",
      text: "Fíjense cómo la sombra proyectada detrás del protagonista corta la respiración de la escena. Menos reflector central, más rebote lateral.",
    },
    {
      id: "2",
      sender: "Mariano Rossi",
      role: "Técnico Luces",
      roleType: "tecnico",
      initials: "MR",
      time: "21:06",
      text: "Bajando dimmer del ciclorama al 30%. Probamos con gelatina ámbar bastarda en el contra.",
    },
    {
      id: "3",
      sender: "Lucía Solís",
      role: "Actriz Principal",
      roleType: "actriz",
      initials: "LS",
      time: "21:08",
      text: "La penumbra ayuda un montón a sostener el silencio antes del monólogo del tercer acto. Se siente ritual.",
    },
    {
      id: "4",
      sender: "Esteban Gómez",
      role: "Músico Escénico",
      roleType: "musico",
      initials: "EG",
      time: "21:11",
      text: "Entro con el bombo legüero apenas caiga la luz cenital en el tablado.",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "Dirección General",
      role: "Staff Activo",
      roleType: "staff",
      initials: "YO",
      time: timeStr,
      text: inputMessage.trim(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage("");
  };

  return (
    <div className="flex flex-col h-[650px] rounded-2xl bg-[#141419] border border-[#58413f]/40 overflow-hidden shadow-2xl bg-noise">
      {/* Chat Header */}
      <div className="p-4 sm:p-5 bg-[#0e0e11] border-b border-[#58413f]/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#9e2a2b]/20 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d]">
            <MessagesSquare className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-sm sm:text-base font-bold text-[#f7f4eb] leading-tight">
              Ágora del Elenco
            </span>
            <span className="font-jakarta text-[11px] text-[#efbf67]">
              Comentarios en tiempo real
            </span>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-md bg-[#1f1f22] text-[#ffdad7] font-jakarta text-[10px] uppercase font-bold border border-[#58413f]/40 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Modo Activo
        </span>
      </div>

      {/* Messages Feed Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start gap-3 group animate-fadeIn">
            {msg.avatar ? (
              <img
                src={msg.avatar}
                alt={msg.sender}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#9e2a2b] shadow-sm mt-0.5 shrink-0"
              />
            ) : (
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm mt-0.5 shrink-0 ${
                  msg.roleType === "director"
                    ? "bg-[#9e2a2b] text-[#f7f4eb]"
                    : msg.roleType === "tecnico"
                    ? "bg-[#bd8718] text-[#281900]"
                    : msg.roleType === "actriz"
                    ? "bg-[#2a2a2d] text-[#ffb3ae]"
                    : msg.roleType === "musico"
                    ? "bg-[#353438] text-[#efbf67]"
                    : "bg-[#9e2a2b] text-[#ffdad7]"
                }`}
              >
                {msg.initials}
              </div>
            )}

            <div className="flex flex-col max-w-[85%]">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-jakarta text-xs font-semibold text-[#f7f4eb]">
                  {msg.sender}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded font-jakarta text-[9px] uppercase font-bold tracking-wider ${
                    msg.roleType === "director"
                      ? "bg-[#9e2a2b]/30 text-[#ffb3ae] border border-[#9e2a2b]/40"
                      : msg.roleType === "tecnico"
                      ? "bg-[#bd8718]/20 text-[#fabc4d] border border-[#bd8718]/40"
                      : "bg-[#1f1f22] text-[#dfbfbc]"
                  }`}
                >
                  {msg.role}
                </span>
                <span className="text-[10px] text-[#8a877e]">{msg.time}</span>
              </div>

              <div
                className={`p-3 rounded-xl text-xs leading-relaxed font-jakarta shadow-sm ${
                  msg.roleType === "staff"
                    ? "bg-[#9e2a2b]/25 border border-[#9e2a2b]/40 text-[#f7f4eb]"
                    : "bg-[#0b0b0e] border border-[#58413f]/30 text-[#dfbfbc]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-[#0e0e11] border-t border-[#58413f]/30 flex flex-col gap-1.5"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Compartir observación escénica o consulta..."
            className="w-full bg-[#141419] text-[#f7f4eb] placeholder-[#8a877e] font-jakarta text-xs py-3 pl-3.5 pr-11 rounded-xl border border-[#58413f] focus:outline-none focus:border-[#fabc4d] transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 p-2 rounded-lg bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between px-1 text-[10px] text-[#8a877e] font-jakarta">
          <span>Presioná Enter para enviar al elenco</span>
          <span className="text-[#fabc4d] font-semibold">Rol actual: Staff</span>
        </div>
      </form>
    </div>
  );
}
