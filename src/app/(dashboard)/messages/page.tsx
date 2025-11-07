"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase";
import { api } from "@/lib/api";
import type { Conversation, Lead, Message } from "@/types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { DashboardButton } from "@/components/dashboard-button";

type MessageWithVia = Message & { via?: string };

export default function MessagesPage() {
  const router = useRouter();

  const [tenantId, setTenantId] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(true);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<MessageWithVia[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [convoSearch, setConvoSearch] = useState("");
  const [draftMessage, setDraftMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const auth = getFirebaseAuth();
        const current = auth.currentUser;
        if (!current) { return; }

        const user = await api.getUserProfile(current.uid);
        if (!user?.tenantId) { setErr("Missing workspace." ); setLoading(false); return; }

        setTenantId(user.tenantId);

        try {
          const plan = await api.getCurrentPlan(user.tenantId);
          setIsPro(plan?.id === "pro");
        } catch {}
      } catch (e) {
        console.error(e);
        setErr("Could not load workspace.");
        setLoading(false);
      }
    })();
  }, [router]);

  useEffect(() => {
    if (!tenantId) return;
    const db = getFirebaseDb();
    const convCol = collection(db, "tenants", tenantId, "conversations");
    const unsub = onSnapshot(query(convCol, orderBy("lastMessageAt", "desc")), (snap) => {
      const list: Conversation[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      setConversations(list);
      if (!selectedConversationId && list.length > 0) setSelectedConversationId(list[0].id);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setErr("Could not load conversations.");
      setLoading(false);
    });
    return () => unsub();
  }, [tenantId, selectedConversationId]);

  useEffect(() => {
    if (!tenantId || !selectedConversationId) {
      setSelectedConversation(null);
      setMessages([]);
      return;
    }
    const db = getFirebaseDb();
    const convo = conversations.find((c) => c.id === selectedConversationId) || null;
    setSelectedConversation(convo || null);
    if (!convo) { setMessages([]); return; }
    const msgsCol = collection(db, "tenants", tenantId, "conversations", selectedConversationId, "messages");
    const unsub = onSnapshot(query(msgsCol, orderBy("createdAt", "asc")), (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    }, (error) => setErr("Could not load messages."));
    return () => unsub();
  }, [tenantId, selectedConversationId, conversations]);

  useEffect(() => {
    (async () => {
      if (!tenantId || !selectedConversation?.leadId) { setSelectedLead(null); return; }
      try {
        const lead = await api.getLead(tenantId, selectedConversation.leadId);
        setSelectedLead(lead);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [tenantId, selectedConversation]);

  const leadUnsubscribed = !!selectedLead?.unsubscribed;
  const filteredConversations = useMemo(() => {
    if (!convoSearch.trim()) return conversations;
    const q = convoSearch.toLowerCase();
    return conversations.filter((conv) => {
      const name = conv.leadName?.toLowerCase() ?? "";
      const snippet = conv.lastMessage?.toLowerCase() ?? "";
      return name.includes(q) || snippet.includes(q);
    });
  }, [convoSearch, conversations]);
  const mobileOptions = filteredConversations.length ? filteredConversations : conversations;

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-white/60">Loading...</div>;
  }

  if (err) {
    return <div className="min-h-[60vh] flex items-center justify-center text-red-300">{err}</div>;
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3">
        <p className="text-sm text-white/60">Inbox</p>
        <h1 className="text-3xl font-semibold tracking-tight">Messages & Conversations</h1>
      </header>

      <div className="grid gap-4 lg:grid-cols-[320px,1fr] min-h-[60vh]">
        <div className="rounded-[24px] border border-white/15 bg-black/25 backdrop-blur-xl px-4 py-4 flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-white">Messages</p>
            <button className="text-xs text-white/60 hover:text-white">+ New</button>
          </div>
          <div className="flex items-center gap-2 rounded-[12px] border border-white/15 bg-black/20 px-3 py-2 text-sm text-white/75 focus-within:border-white/30 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            <svg
              className="h-4 w-4 text-white/50"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="6" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              placeholder="Search conversations"
              value={convoSearch}
              onChange={(e) => setConvoSearch(e.target.value)}
              className="bg-transparent flex-1 text-sm text-white/80 outline-none"
            />
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-white/50 flex-wrap">
            <span className="uppercase tracking-[0.2em]">Filter</span>
            <button
              onClick={() => setConvoSearch("")}
              className="px-2 py-1 rounded-[10px] border border-white/15 hover:border-white/30 bg-black/20"
            >
              All
            </button>
            <button
              onClick={() => setConvoSearch("paused")}
              className="px-2 py-1 rounded-[10px] border border-white/15 hover:border-white/30"
            >
              AI paused
            </button>
            <button
              onClick={() => setConvoSearch("stop")}
              className="px-2 py-1 rounded-[10px] border border-white/15 hover:border-white/30"
            >
              STOP
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 mt-4 space-y-2">
            {filteredConversations.map((conv) => {
              const active = conv.id === selectedConversationId;
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversationId(conv.id)}
                  className={`w-full text-left rounded-[14px] border px-3 py-2 transition backdrop-blur ${
                    active
                      ? "border-white/25 bg-white/10 text-white shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
                      : "border-transparent text-white/65 hover:border-white/15 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{conv.leadName || "Unknown lead"}</span>
                    {conv.aiLastStatus === "unsubscribed" ? (
                      <span className="chip !border-red-500/40 !text-red-200 !bg-red-500/10">STOP</span>
                    ) : conv.aiPaused ? (
                      <span className="chip !border-yellow-500/30 !text-yellow-200 !bg-yellow-500/10">AI Paused</span>
                    ) : conv.aiLastStatus === "on" ? (
                      <span className="chip !border-emerald-500/30 !text-emerald-200 !bg-emerald-500/10">AI On</span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-white/40 truncate">{conv.lastMessage || "No messages yet"}</p>
                </button>
              );
            })}
            {filteredConversations.length === 0 && (
              <div className="text-sm text-white/50 text-center py-10">
                No conversations yet. Share your lead link to start.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/15 bg-black/25 backdrop-blur-xl flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
          <div className="px-4 pt-4 lg:hidden">
            <label className="text-xs text-white/60 mb-1 block">Select conversation</label>
            <div className="relative">
              <select
                value={selectedConversationId ?? ""}
                onChange={(e) => setSelectedConversationId(e.target.value || null)}
                className="w-full appearance-none rounded-[12px] border border-white/20 bg-black/30 px-3 py-2 text-sm text-white/80"
              >
                <option value="">None</option>
                {mobileOptions.map((conv) => (
                  <option key={conv.id} value={conv.id}>
                    {conv.leadName || "Unknown lead"}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>

          <div className="border-b border-white/10 px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium">{selectedConversation?.leadName || "Conversation"}</p>
              {selectedLead?.phone && <p className="text-xs text-white/45">SMS · {selectedLead.phone}</p>}
            </div>
            <div className="flex flex-wrap gap-2">
              <DashboardButton
                onClick={() => selectedLead?.id && router.push(`/leads/${selectedLead.id}`)}
                className="rounded-[10px]"
              >
                View lead
              </DashboardButton>
              <DashboardButton onClick={() => router.push("/settings/ai")} className="rounded-[10px]">
                AI settings
              </DashboardButton>
            </div>
          </div>

          {leadUnsubscribed && (
            <div className="px-4 pt-4">
              <div className="rounded-[12px] bg-red-500/10 border border-red-500/30 px-3 py-2 text-xs text-red-200">
                This lead replied STOP. SMS (including Sylor AI) is blocked until they send START.
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 text-sm">
            {messages.length === 0 && (
              <div className="text-white/45 text-sm pt-8">
                No messages yet. Type a message below to start the conversation.
              </div>
            )}
            {messages.map((msg) => {
              const outbound = msg.direction === "outbound";
              return (
                <div key={msg.id} className={`flex ${outbound ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-[14px] px-4 py-3 border ${
                      outbound
                        ? "bg-gradient-to-r from-[#5e4bff]/25 to-[#7c5cff]/15 border-white/20"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    {msg.body}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-white/10 p-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              <DashboardButton className="rounded-[10px]">Insert template</DashboardButton>
              <DashboardButton className="rounded-[10px]">Schedule follow-up</DashboardButton>
              <DashboardButton className="rounded-[10px]">Mark resolved</DashboardButton>
              <DashboardButton className="rounded-[10px]">Add note</DashboardButton>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <div className="flex flex-1 items-center gap-2 rounded-[14px] border border-white/15 bg-black/25 px-3 py-2 text-sm text-white/80 focus-within:border-white/30 shadow-[0_12px_30px_rgba(0,0,0,0.35)] overflow-hidden">
                <input
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/40"
                  placeholder="Write a thoughtful reply..."
                  value={draftMessage}
                  onChange={(e) => setDraftMessage(e.target.value)}
                />
                <button
                  type="button"
                  className="text-white/60 hover:text-white transition text-lg"
                  aria-label="Insert emoji"
                >
                  🙂
                </button>
                <button
                  type="button"
                  className="text-white/60 hover:text-white transition text-lg"
                  aria-label="Attach file"
                >
                  📎
                </button>
              </div>
              <DashboardButton
                disabled={!isPro || leadUnsubscribed || !draftMessage.trim()}
                className="md:w-28 rounded-[10px]"
              >
                Send
              </DashboardButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
