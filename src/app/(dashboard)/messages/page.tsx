"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase";
import { api } from "@/lib/api";
import type { Conversation, Lead, Message } from "@/types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

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

  useEffect(() => {
    (async () => {
      try {
        const auth = getFirebaseAuth();
        const current = auth.currentUser;
        if (!current) { router.push("/login?redirectTo=/messages"); return; }

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

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-white/60">Loading...</div>;
  }

  if (err) {
    return <div className="min-h-[60vh] flex items-center justify-center text-red-300">{err}</div>;
  }

  const leadUnsubscribed = !!selectedLead?.unsubscribed;

  return (
    <div className="grid gap-4 lg:grid-cols-[320px,1fr] h-[calc(100vh-4rem)]">
      <div className="panel p-3 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium">Messages</p>
          <button className="text-xs text-white/60 hover:text-white">+ New</button>
        </div>
        <div className="space-y-2">
          {conversations.map((conv) => {
            const active = conv.id === selectedConversationId;
            return (
              <button
                key={conv.id}
                onClick={() => setSelectedConversationId(conv.id)}
                className={`w-full text-left rounded-[12px] px-3 py-2 transition ${active ? "bg-white/12 text-white" : "text-white/55 hover:bg-white/10"}`}
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
          {conversations.length === 0 && (
            <div className="text-sm text-white/50 text-center py-10">
              No conversations yet. Share your lead link to start.
            </div>
          )}
        </div>
      </div>

      <div className="panel flex flex-col">
        <div className="border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{selectedConversation?.leadName || "Conversation"}</p>
            {selectedLead?.phone && <p className="text-xs text-white/45">SMS - {selectedLead.phone}</p>}
          </div>
          {selectedConversation?.aiLastStatus === "unsubscribed" ? (
            <span className="chip !border-red-500/40 !text-red-200 !bg-red-500/10">STOP</span>
          ) : selectedConversation?.aiPaused ? (
            <span className="chip !border-yellow-500/30 !text-yellow-200 !bg-yellow-500/10">AI Paused</span>
          ) : selectedConversation?.aiLastStatus === "on" ? (
            <span className="chip !border-emerald-500/30 !text-emerald-200 !bg-emerald-500/10">AI replying</span>
          ) : null}
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
            <div className="text-white/45 text-sm pt-8">No messages yet. Type a message below to start the conversation.</div>
          )}
          {messages.map((msg) => {
            const outbound = msg.direction === "outbound";
            return (
              <div key={msg.id} className={`flex ${outbound ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] rounded-[12px] px-3 py-2 ${outbound ? "bg-purple-500/15" : "bg-white/5"}`}>
                  {msg.body}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/10 p-3 flex gap-2 items-center">
          <input className="flex-1" placeholder="Type a message..." />
          <button disabled={!isPro || leadUnsubscribed} className="btn-primary px-3 py-2 disabled:opacity-50">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
