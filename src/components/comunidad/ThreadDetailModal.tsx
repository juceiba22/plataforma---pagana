"use client";

import React, { useState } from "react";
import { X, ArrowUpCircle, MessageSquare, Eye, Send, Sparkles, User, Flame } from "lucide-react";

export interface ThreadData {
  id: string;
  votes: number;
  tags: string[];
  author: string;
  timeAgo: string;
  title: string;
  content: string;
  repliesCount: number;
  viewsCount: number;
  comments?: { author: string; role: string; text: string; time: string }[];
}

interface ThreadDetailModalProps {
  thread: ThreadData | null;
  onClose: () => void;
  onVote: (threadId: string) => void;
}

export default function ThreadDetailModal({ thread, onClose, onVote }: ThreadDetailModalProps) {
  const [newReply, setNewReply] = useState("");
  const [replies, setReplies] = useState<{ author: string; role: string; text: string; time: string }[]>([
    {
      author: "Lisandro Valenzuela",
      role: "Dirección General",
      text: "Totalmente de acuerdo con profundizar la distancia en la primera pasada; el misterio se rompe si nos acercamos demasiado rápido.",
      time: "Hace 1 hora",
    },
    {
      author: "Matías Gorosito",
      role: "El Trickster",
      text: "Yo sugiero que el Pombero mantenga la distancia pero La Salamanca sí invite con la mano a unirse a la ronda.",
      time: "Hace 45 min",
    },
  ]);

  if (!thread) return null;

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    setReplies((prev) => [
      ...prev,
      {
        author: "Dirección General",
        role: "Staff Activo",
        text: newReply.trim(),
        time: "Justo ahora",
      },
    ]);
    setNewReply("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#141419] border border-[#fabc4d]/40 max-w-3xl w-full rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(158,42,43,0.5)] bg-noise text-[#f7f4eb] flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#58413f]/30">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {thread.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded bg-[#9e2a2b]/30 border border-[#9e2a2b]/60 text-[#ffb3ae] font-jakarta text-[10px] uppercase font-bold"
                >
                  {tag}
                </span>
              ))}
              <span className="text-xs text-[#dfbfbc]">
                • Por <strong>{thread.author}</strong> {thread.timeAgo}
              </span>
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f7f4eb] leading-snug">
              {thread.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1f1f22] text-[#dfbfbc] hover:text-[#fabc4d] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <p className="text-sm text-[#dfbfbc] leading-relaxed font-jakarta">
          {thread.content}
        </p>

        {/* Metrics & Vote */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0b0b0e] border border-[#58413f]/40">
          <div className="flex items-center gap-4 text-xs text-[#dfbfbc]">
            <span className="flex items-center gap-1.5 text-[#fabc4d] font-semibold">
              <MessageSquare className="w-4 h-4" />
              {thread.repliesCount + replies.length - 2} réplicas
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              {thread.viewsCount} lecturas
            </span>
          </div>

          <button
            onClick={() => onVote(thread.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f1f22] hover:bg-[#9e2a2b] hover:text-[#f7f4eb] text-[#fabc4d] text-xs font-bold transition-all"
          >
            <ArrowUpCircle className="w-4 h-4" />
            <span>Votar (+{thread.votes})</span>
          </button>
        </div>

        {/* Replies List */}
        <div className="space-y-3">
          <h4 className="font-jakarta text-xs uppercase tracking-widest text-[#fabc4d] font-bold">
            Intervenciones del Elenco & Staff
          </h4>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {replies.map((rep, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#0b0b0e] border border-[#58413f]/30 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-jakarta text-xs font-bold text-[#f7f4eb]">
                      {rep.author}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#1f1f22] text-[#efbf67] text-[9px] uppercase font-bold">
                      {rep.role}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8a877e]">{rep.time}</span>
                </div>
                <p className="text-xs text-[#dfbfbc] leading-relaxed">
                  {rep.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reply form */}
        <form onSubmit={handleSendReply} className="flex gap-2 pt-2 border-t border-[#58413f]/30">
          <input
            type="text"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Aportar reflexión dramatúrgica..."
            className="flex-grow bg-[#0b0b0e] text-[#f7f4eb] placeholder-[#8a877e] font-jakarta text-xs px-4 py-2.5 rounded-xl border border-[#58413f] focus:outline-none focus:border-[#fabc4d]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Aportar</span>
          </button>
        </form>
      </div>
    </div>
  );
}
