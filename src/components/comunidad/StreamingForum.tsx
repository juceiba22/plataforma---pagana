"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  ThumbsUp,
  Flame,
  Clock,
  Video,
  Sparkles,
  Send,
  Plus,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  Share2,
  Bookmark,
  Filter,
} from "lucide-react";

export interface ForumComment {
  id: string;
  author: string;
  role: string;
  timeAgo: string;
  content: string;
  likes: number;
}

export interface StreamingThread {
  id: string;
  videoId: "marechal" | "demonologia" | "comunicacion" | "luces";
  videoTitle: string;
  timestamp?: string;
  title: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: ForumComment[];
}

const INITIAL_SCRIPT_THREADS: StreamingThread[] = [
  {
    id: "1",
    videoId: "marechal",
    videoTitle: "La Batalla Celeste y Terrestre de Marechal",
    timestamp: "42:15",
    title: "El Secreto de Argentum y el hombre-robot: ¿por qué los algoritmos intentan que olvidemos quiénes somos?",
    author: "Gabriel (Actor Central)",
    authorRole: "Elenco • El Niño Gabriel",
    authorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsflbwK8N7xrmAZNR5DO6vSuetzhGlCIVlIQBtWq0O-O9PxJwwZ_PEE1dm78WKiMqDXlkvuLxgMOIUNw0NKw7pS31nhFxYJVy-tA8TKYXve7xXX5W8pieSHDUlgJbXJ5D0KRnszl7yHyjCMVJ5npCO7MJ-1hZBMoFOFsqsJ-Munks8XbIULVaJq9rnQ5hChTUBsoL8S0m9PxlzfvpZagzEJth4lWZ63sGI7Er61SPegvWVWq0IJXBcOw",
    timeAgo: "hace 2 horas",
    content:
      "En el monólogo de la Escena 9 planteamos que el robot es un demonio disimulado porque no tiene tiempo ni misterio primordial, come de nuestra atención y nos vomita respuestas huecas. ¿Cómo podemos hacer que en la sala el público sienta ese despertar de Argentum cuando repartimos las tarjetas?",
    likes: 35,
    comments: [
      {
        id: "c1",
        author: "Valentin Ramos C.",
        role: "Director General",
        timeAgo: "hace 1 hora",
        content:
          "El rezo 'Hazte de plata y espeja el oro que se da en las alturas' debe sonar como un mantra susurrado al oído de cada fila de la platea antes del Himno.",
        likes: 18,
      },
      {
        id: "c2",
        author: "Darío (El Colla)",
        role: "Elenco • Sabio Andino",
        timeAgo: "hace 30 min",
        content: "Exacto. La mordida de la manzana en la Escena 2 prepara el terreno para esta revelación final.",
        likes: 9,
      },
    ],
  },
  {
    id: "2",
    videoId: "demonologia",
    videoTitle: "La Demonología Europea vs la Demonología Criolla",
    timestamp: "54:40",
    title: "La Salamanca liberada en Carnaval: la búsqueda de la libertad criolla frente al dogma europeo",
    author: "Ulises (El Gaucho)",
    authorRole: "Elenco • Coya Leguizamón",
    authorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-vrWjlzCmj_urRsf4vgfYtqeWWbMxLFv0oQ2meaiWBMULKQQ_TkgHIK9RprNvc5Ba2mtBEShz-MZsS-johUxMLU-i9YLnLPLR-D5v2RvvG0JozUcq9whSEE2lbOEF8S2rpfsUTPq6ZsbPH0MYxlU-0223l7V8m2SgT6_cDtiMUpJMc0N3d2TAIorR1h26kXVBIWq5fO-DztgqMZtdN9LAgdzENUpq2n0mOxh3w-iZ2n4XaROaEAxDVQ",
    timeAgo: "hace 4 horas",
    content:
      "El punto clave del texto es que el hombre criollo no tiene la culpa medieval del europeo: suelta la Salamanca en enero y febrero para que no ande suelta cuando no debe. Desenterramos el carnaval buscando la libertad real, no la libertad vacía que nos vende el Presentador mediático.",
    likes: 42,
    comments: [
      {
        id: "c3",
        author: "Tomás (José Mercado)",
        role: "Elenco • José Mercado",
        timeAgo: "hace 2 horas",
        content:
          "Por eso la transición hacia el show de '¡Viva la Libertad Carajo!' en la Escena 5 funciona como un choque brutal entre la verdad del monte y la farsa del dinero.",
        likes: 14,
      },
    ],
  },
  {
    id: "3",
    videoId: "comunicacion",
    videoTitle: "La Comunicación y las Escenas en Teatro",
    timestamp: "28:10",
    title: "El grotesco de los Musicardi y la terapia nacional: '¡Yo hago ravioles, ella hace ravioles!'",
    author: "Flor Darío",
    authorRole: "Elenco • La Madre",
    authorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDVK18okmiTLrsL4KN3z0AyZrWSIibc4NbnNq-p27AjRbrCsPzcEJ14SybTyhLe7CjC4PtWeB6xbVytQWskBfB9srNgcXp1coyoEmOkluJ805K4bhO8YG1zWJmRmCiejUZk1d-Jn0mnFVexBfjXDO2W4cd35KXNxagQ7Xg5wCxlEcgZgJdkD5KDcqMvfeEkA8MTAiH0pDipcWROEaDq0Etx_2A7QlnDBZimjpAGjuHqHJkhBjWj6-n9g",
    timeAgo: "hace 6 horas",
    content:
      "La energía de la Escena 8 necesita desbordar el escenario. El monólogo de los Musicardi refleja la neurosis argentina donde nos peleamos por los precios y la política pero somos una misma familia. El remate '¡Tenemos que ir a terapia todo el país!' rompe la cuarta pared por completo.",
    likes: 51,
    comments: [
      {
        id: "c4",
        author: "Sofía V. (Daiana)",
        role: "Elenco • Daiana",
        timeAgo: "hace 3 horas",
        content: "El coro de los actores gritando por los precios en medio de la platea genera una catarsis inmensa.",
        likes: 21,
      },
    ],
  },
  {
    id: "4",
    videoId: "luces",
    videoTitle: "La Técnica de Luces en Teatro",
    timestamp: "01:05:00",
    title: "La iluminación de la manzana en la Escena 1 y los cenitales de Gabriel y la Madre",
    author: "Rocío Medina",
    authorRole: "Jefa de Iluminación & Puesta",
    authorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4AxDnqmXvbMLeNcWb4KsMTGKpwwJfWzqcK39TJfLpkd9jPgElmdZOsH8KAUIyVUiPwl3SvwrL20QMmNZwpxGuXvm5JG45VJb75VRinFbHGzwjsOcnhQUpTBINvysbCEfien4VKhYAcAWuKt6sK3GSa28UpB3FSBhxEsHcv5AWjMQF-hhjvqKhxTFPVIGk-AdUBRRTvGSJ0loFb--BrrOIsZX5LqfJeReIvu2risbDyKwQKTWozzy__w",
    timeAgo: "hace 1 día",
    content:
      "En el guión está marcado que las luces de las cantoras deben atenuarse gradualmente mientras sube la luz cenital sobre la manzana en la mesa negra. En la Escena 3, Gabriel y la Madre no se miran entre sí: cada uno tiene un haz propio recortado de frente al público.",
    likes: 31,
    comments: [],
  },
];

export default function StreamingForum() {
  const [threads, setThreads] = useState<StreamingThread[]>(INITIAL_SCRIPT_THREADS);
  const [selectedVideoFilter, setSelectedVideoFilter] = useState<string>("all");
  const [expandedThreadId, setExpandedThreadId] = useState<string | null>("1");
  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);

  // New Comment inline state
  const [replyTextMap, setReplyTextMap] = useState<{ [threadId: string]: string }>({});

  // New Thread modal form state
  const [newVideoId, setNewVideoId] = useState<StreamingThread["videoId"]>("marechal");
  const [newTimestamp, setNewTimestamp] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newRole, setNewRole] = useState("Comunidad / Elenco");

  const videoOptions = [
    { id: "all", label: "Todos los Debates del Guión (4 Masterclasses)" },
    { id: "marechal", label: "1. La Batalla Celeste & El Secreto de Argentum" },
    { id: "demonologia", label: "2. La Salamanca & El Demonio Criollo" },
    { id: "comunicacion", label: "3. Los Musicardi & La Farsa de la Libertad" },
    { id: "luces", label: "4. Técnica de Luces & Puesta en Escena" },
  ];

  const handleLikeThread = (id: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t))
    );
  };

  const handleAddReply = (threadId: string) => {
    const text = replyTextMap[threadId]?.trim();
    if (!text) return;

    const newComment: ForumComment = {
      id: Date.now().toString(),
      author: "Oficiante / Espectador",
      role: "Comunidad de Fiesta Pagana",
      timeAgo: "hace un instante",
      content: text,
      likes: 1,
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId ? { ...t, comments: [...t.comments, newComment] } : t
      )
    );

    setReplyTextMap((prev) => ({ ...prev, [threadId]: "" }));
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const selectedOption = videoOptions.find((v) => v.id === newVideoId);
    const videoTitle = selectedOption ? selectedOption.label : "Transmisión del Guión";

    const created: StreamingThread = {
      id: Date.now().toString(),
      videoId: newVideoId,
      videoTitle,
      timestamp: newTimestamp || "00:00",
      title: newTitle,
      author: newAuthor || "Oficiante de la Comunidad",
      authorRole: newRole,
      authorAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCsflbwK8N7xrmAZNR5DO6vSuetzhGlCIVlIQBtWq0O-O9PxJwwZ_PEE1dm78WKiMqDXlkvuLxgMOIUNw0NKw7pS31nhFxYJVy-tA8TKYXve7xXX5W8pieSHDUlgJbXJ5D0KRnszl7yHyjCMVJ5npCO7MJ-1hZBMoFOFsqsJ-Munks8XbIULVaJq9rnQ5hChTUBsoL8S0m9PxlzfvpZagzEJth4lWZ63sGI7Er61SPegvWVWq0IJXBcOw",
      timeAgo: "hace unos segundos",
      content: newContent,
      likes: 1,
      comments: [],
    };

    setThreads((prev) => [created, ...prev]);
    setIsNewThreadOpen(false);
    setNewTitle("");
    setNewContent("");
    setNewTimestamp("");
  };

  const filteredThreads =
    selectedVideoFilter === "all"
      ? threads
      : threads.filter((t) => t.videoId === selectedVideoFilter);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      {/* Forum Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[#141419] border border-[#58413f]/40 shadow-2xl bg-noise">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1.5">
            <MessageSquare className="w-4 h-4 text-[#fabc4d]" />
            <span className="font-jakarta text-xs text-[#efbf67] uppercase tracking-[0.2em] font-bold">
              Ágora de Comunidad • Debates del Guión
            </span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-[#f7f4eb] font-bold">
            Debates & Análisis de Fiesta Pagana
          </h1>
          <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] mt-1.5 max-w-xl leading-relaxed">
            Reflexiones del elenco y espectadores sobre las escenas de la obra: el secreto de Argentum, la Salamanca criolla, el hombre-robot y el grotesco de los Musicardi.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <Link
            href="/streaming"
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#1f1f22] border border-[#58413f]/50 text-[#dfbfbc] hover:text-[#fabc4d] font-jakarta text-xs font-semibold transition-colors"
          >
            <Video className="w-4 h-4 text-[#fabc4d]" />
            <span>Ir a Sala de Streaming</span>
          </Link>

          <button
            onClick={() => setIsNewThreadOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] font-jakarta text-xs uppercase font-bold tracking-wider shadow-[0_0_20px_rgba(158,42,43,0.5)] border-t border-white/20 transition-all"
          >
            <Plus className="w-4 h-4 text-[#fabc4d]" />
            <span>Nuevo Debate</span>
          </button>
        </div>
      </div>

      {/* Video Filter Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {videoOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedVideoFilter(opt.id)}
            className={`px-4 py-2.5 rounded-xl font-jakarta text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedVideoFilter === opt.id
                ? "bg-[#9e2a2b] text-[#f7f4eb] font-bold shadow-[0_0_15px_rgba(158,42,43,0.4)] border-t border-white/20"
                : "bg-[#141419] text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22] border border-[#58413f]/40 font-semibold"
            }`}
          >
            <Video className="w-3.5 h-3.5 text-[#fabc4d]" />
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Threads List */}
      <div className="flex flex-col gap-6">
        {filteredThreads.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#141419] border border-[#58413f]/40 text-center flex flex-col items-center justify-center">
            <MessageSquare className="w-12 h-12 text-[#58413f] mb-3" />
            <h3 className="font-cinzel text-lg font-bold text-[#f7f4eb]">
              Aún no hay debates sobre este bloque
            </h3>
            <p className="font-jakarta text-xs text-[#dfbfbc] mt-1 max-w-sm">
              Sé el primero en abrir el debate o compartir tu análisis sobre el guión.
            </p>
            <button
              onClick={() => setIsNewThreadOpen(true)}
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#9e2a2b] text-[#f7f4eb] text-xs font-bold font-jakarta uppercase tracking-wider"
            >
              Comentar sobre este Tema
            </button>
          </div>
        ) : (
          filteredThreads.map((thread) => {
            const isExpanded = expandedThreadId === thread.id;

            return (
              <div
                key={thread.id}
                className="rounded-2xl bg-[#141419] border border-[#58413f]/40 overflow-hidden shadow-xl bg-noise flex flex-col transition-all hover:border-[#fabc4d]/40"
              >
                {/* Thread Header Info */}
                <div className="p-6 flex flex-col gap-4">
                  {/* Video Reference & Timestamp Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#58413f]/30 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-md bg-[#0b0b0e] border border-[#fabc4d]/40 font-jakarta text-[11px] text-[#fabc4d] font-bold flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-[#fabc4d]" />
                        {thread.videoTitle}
                      </span>

                      {thread.timestamp && (
                        <span className="px-2.5 py-1 rounded-md bg-[#9e2a2b]/30 border border-[#9e2a2b] font-mono text-[11px] text-[#ffb3ae] font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Minuto {thread.timestamp}
                        </span>
                      )}
                    </div>

                    <span className="font-jakarta text-xs text-[#efbf67] font-semibold">
                      {thread.timeAgo}
                    </span>
                  </div>

                  {/* Author Header */}
                  <div className="flex items-center gap-3">
                    <img
                      src={thread.authorAvatar}
                      alt={thread.author}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-[#fabc4d]/50"
                    />
                    <div>
                      <h4 className="font-jakarta text-sm font-bold text-[#f7f4eb]">
                        {thread.author}
                      </h4>
                      <span className="font-jakarta text-[11px] text-[#dfbfbc]">
                        {thread.authorRole}
                      </span>
                    </div>
                  </div>

                  {/* Main Thread Title & Content */}
                  <div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#f7f4eb] leading-snug">
                      {thread.title}
                    </h3>
                    <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] mt-2 leading-relaxed">
                      {thread.content}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#58413f]/30">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLikeThread(thread.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b0b0e] hover:bg-[#1f1f22] border border-[#58413f]/40 text-xs font-jakarta font-bold text-[#dfbfbc] hover:text-[#fabc4d] transition-colors"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-[#fabc4d]" />
                        <span>{thread.likes} Aportes</span>
                      </button>

                      <button
                        onClick={() =>
                          setExpandedThreadId(isExpanded ? null : thread.id)
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b0b0e] hover:bg-[#1f1f22] border border-[#58413f]/40 text-xs font-jakarta font-bold text-[#dfbfbc] hover:text-[#f7f4eb] transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#ffb3ae]" />
                        <span>{thread.comments.length} Respuestas</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <Link
                      href="/streaming"
                      className="text-xs font-jakarta text-[#efbf67] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Ver Masterclass</span>
                      <Video className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Expanded Replies & Comment Form */}
                {isExpanded && (
                  <div className="bg-[#0b0b0e] border-t border-[#58413f]/40 p-6 flex flex-col gap-4">
                    {/* List of comments */}
                    {thread.comments.length > 0 && (
                      <div className="space-y-3">
                        <span className="font-jakarta text-[11px] uppercase tracking-wider text-[#efbf67] font-bold block">
                          Comentarios del Elenco & Comunidad:
                        </span>
                        {thread.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="p-3.5 rounded-xl bg-[#141419] border border-[#58413f]/30 flex flex-col gap-1.5"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#f7f4eb] font-jakarta">
                                  {comment.author}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-[#9e2a2b]/20 text-[#ffb3ae] font-jakarta">
                                  {comment.role}
                                </span>
                              </div>
                              <span className="text-[10px] text-[#8a877e]">
                                {comment.timeAgo}
                              </span>
                            </div>
                            <p className="font-jakarta text-xs text-[#dfbfbc] leading-relaxed">
                              {comment.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Inline Reply Input */}
                    <div className="pt-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={replyTextMap[thread.id] || ""}
                        onChange={(e) =>
                          setReplyTextMap((prev) => ({
                            ...prev,
                            [thread.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddReply(thread.id);
                        }}
                        placeholder="Escribí tu reflexión o aporte sobre esta escena..."
                        className="flex-1 bg-[#141419] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                      />
                      <button
                        onClick={() => handleAddReply(thread.id)}
                        className="px-4 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] text-xs font-bold font-jakarta transition-colors flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5 text-[#fabc4d]" />
                        <span>Responder</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* MODAL: NUEVO DEBATE / COMENTARIO */}
      {isNewThreadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#141419] border border-[#fabc4d]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(158,42,43,0.6)] bg-noise text-[#f7f4eb]">
            <button
              onClick={() => setIsNewThreadOpen(false)}
              className="absolute top-5 right-5 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-1.5 rounded-lg bg-[#1f1f22]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#9e2a2b]/30 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider text-[#f7f4eb]">
                  Nuevo Debate sobre el Guión
                </h3>
                <p className="text-xs text-[#efbf67] font-jakarta">
                  Iniciá una reflexión o consulta sobre las escenas y conceptos de la obra
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateThread} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#efbf67] uppercase">
                  Bloque / Masterclass a Comentar *
                </label>
                <select
                  value={newVideoId}
                  onChange={(e) => setNewVideoId(e.target.value as any)}
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                >
                  <option value="marechal">1. La Batalla Celeste & El Secreto de Argentum</option>
                  <option value="demonologia">2. La Salamanca & El Demonio Criollo</option>
                  <option value="comunicacion">3. Los Musicardi & La Farsa de la Libertad</option>
                  <option value="luces">4. Técnica de Luces & Puesta en Escena</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#dfbfbc] uppercase">
                    Minuto / Marca de Tiempo (Opcional)
                  </label>
                  <input
                    type="text"
                    value={newTimestamp}
                    onChange={(e) => setNewTimestamp(e.target.value)}
                    placeholder="Ej. 34:10"
                    className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#dfbfbc] uppercase">
                    Tu Nombre o Rol
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Ej. Darío (El Colla)"
                    className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#fabc4d] uppercase">
                  Título del Debate o Pregunta *
                </label>
                <input
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. ¿Cómo equilibrar el grotesco de los Musicardi con la mística de Argentum?"
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#dfbfbc] uppercase">
                  Tu Análisis o Comentario Detallado *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Escribí tus observaciones sobre el guión y la puesta escénica..."
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl p-3 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewThreadOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#1f1f22] text-[#dfbfbc] text-xs font-bold font-jakarta hover:bg-[#28282d] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] text-xs font-bold uppercase tracking-wider font-jakarta shadow-[0_0_15px_rgba(158,42,43,0.5)] transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#fabc4d]" />
                  <span>Publicar en el Ágora</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
