"use client";

import React, { useState } from "react";
import { ArrowUpCircle, MessageSquare, Eye, ArrowRight, BookOpen, Sparkles, Filter } from "lucide-react";
import ThreadDetailModal, { ThreadData } from "./ThreadDetailModal";

interface DiscussionThreadsProps {
  threads: ThreadData[];
  onVote: (id: string) => void;
  selectedTagFilter?: string;
}

export default function DiscussionThreads({ threads, onVote, selectedTagFilter }: DiscussionThreadsProps) {
  const [activeSort, setActiveSort] = useState<"recientes" | "catarticos" | "urgentes">("recientes");
  const [selectedThread, setSelectedThread] = useState<ThreadData | null>(null);

  const filteredThreads = threads.filter((t) => {
    if (!selectedTagFilter || selectedTagFilter === "todos") return true;
    return t.tags.some((tag) => tag.toLowerCase().includes(selectedTagFilter.toLowerCase()));
  });

  const sortedThreads = [...filteredThreads].sort((a, b) => {
    if (activeSort === "catarticos") return b.votes - a.votes;
    if (activeSort === "urgentes") return b.repliesCount - a.repliesCount;
    return Number(b.id) - Number(a.id);
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Filter Pill Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#58413f]/30">
        <div>
          <span className="font-jakarta text-xs uppercase tracking-wider text-[#fabc4d] font-bold block mb-0.5">
            Hilos de Reflexión Activa
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl text-[#f7f4eb] font-bold tracking-tight">
            Discusiones de la Temporada
          </h2>
        </div>

        <div className="flex items-center gap-1.5 bg-[#141419] p-1.5 rounded-xl border border-[#58413f]/40 self-start sm:self-auto">
          {[
            { id: "recientes", label: "Más Recientes" },
            { id: "catarticos", label: "Catárticos" },
            { id: "urgentes", label: "Urgentes" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSort(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-jakarta text-xs font-semibold transition-all ${
                activeSort === tab.id
                  ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-sm"
                  : "text-[#dfbfbc] hover:text-[#f7f4eb]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Threads List */}
      <div className="flex flex-col gap-4">
        {sortedThreads.map((thread) => (
          <article
            key={thread.id}
            className="bg-[#141419] border border-[#58413f]/40 p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row gap-5 hover:border-[#fabc4d]/40 hover:bg-[#1b1b1e] transition-all duration-300 shadow-md group"
          >
            {/* Left Upvote Counter */}
            <div className="flex sm:flex-col items-center justify-center gap-1.5 bg-[#0b0b0e] sm:px-4 py-2.5 rounded-xl shrink-0 border border-[#58413f]/30">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onVote(thread.id);
                }}
                className="text-[#fabc4d] hover:text-[#efbf67] transition-transform active:scale-125"
                title="Votar Hilo"
              >
                <ArrowUpCircle className="w-6 h-6" />
              </button>
              <span className="font-cinzel text-base font-bold text-[#fabc4d]">
                {thread.votes}
              </span>
              <span className="font-jakarta text-[10px] text-[#8a877e] uppercase hidden sm:block">
                Votos
              </span>
            </div>

            {/* Thread Body */}
            <div className="flex-1 space-y-3 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {thread.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded font-jakarta text-[10px] uppercase font-bold ${
                      i === 0
                        ? "bg-[#9e2a2b]/30 text-[#ffb3ae] border border-[#9e2a2b]/50"
                        : "bg-[#1f1f22] text-[#dfbfbc] border border-[#58413f]/40"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-[#8a877e] font-jakarta text-xs">
                  • Por <strong className="text-[#f7f4eb]">{thread.author}</strong> {thread.timeAgo}
                </span>
              </div>

              <h3
                onClick={() => setSelectedThread(thread)}
                className="font-cinzel text-base sm:text-lg text-[#f7f4eb] font-bold group-hover:text-[#fabc4d] transition-colors cursor-pointer leading-snug"
              >
                {thread.title}
              </h3>

              <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] line-clamp-2 leading-relaxed">
                {thread.content}
              </p>

              {/* Bottom Thread Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-[#58413f]/20">
                <div className="flex items-center gap-4 text-xs text-[#dfbfbc] font-jakarta">
                  <span className="flex items-center gap-1 text-[#fabc4d] font-semibold">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <strong>{thread.repliesCount} réplicas</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#8a877e]" />
                    {thread.viewsCount} lecturas
                  </span>
                </div>

                <button
                  onClick={() => setSelectedThread(thread)}
                  className="font-jakarta text-xs uppercase tracking-wider text-[#ffb3ae] hover:text-[#fabc4d] transition-colors flex items-center gap-1 font-bold"
                >
                  <span>Participar en el rito</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Ancestral Archive Banner */}
      <div className="bg-[#0b0b0e] border border-[#fabc4d]/30 p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg bg-noise">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#bd8718]/20 border border-[#bd8718] flex items-center justify-center text-[#fabc4d] shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-cinzel text-base font-bold text-[#f7f4eb]">
              Archivo Dramatúrgico Ancestral
            </h4>
            <p className="font-jakarta text-xs text-[#dfbfbc]">
              Accedé a minutas, diarios de campo de funciones 2023-2024 y bitácoras de dirección.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("Abriendo archivo digital de bitácoras 2023-2024...")}
          className="bg-[#1f1f22] hover:bg-[#2a2a2d] border border-[#58413f] text-[#f7f4eb] font-jakarta text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-xl transition-colors shrink-0"
        >
          Abrir Bitácora
        </button>
      </div>

      {/* Thread Detail / Discussion Modal */}
      <ThreadDetailModal
        thread={selectedThread}
        onClose={() => setSelectedThread(null)}
        onVote={onVote}
      />
    </div>
  );
}
