// src/types.ts
export type User = {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  tenantId: string;
};

export type Tenant = {
  id: string;
  businessName: string;
  businessPhone: string;
  stripeCustomerId?: string | null;
  planId?: string | null;
  twilioNumber?: string | null;
};

export type LeadStatus = "New" | "Contacted" | "Booked" | "Closed";

export type Lead = {
  id: string;
  leadId: string;
  name: string;
  phone: string;
  service: string;
  city: string;
  value: number;
  status: LeadStatus;
  created: string;
  email?: string; // ← added so your dashboard map(email) doesn’t error
};

export type Appointment = {
  id: string;
  title: string;
  client: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
};

export type Conversation = {
  id: string;
  leadId: string;
  leadName: string;
  lastMessage: string;
  lastMessageAt: any;
  channel: "sms";
  leadAvatarUrl?: string;
};

export type Message = {
  id: string;
  from: "lead" | "agent";
  direction: "inbound" | "outbound";
  body: string;
  createdAt: any;
};

export type Plan = {
  id: "starter" | "pro";
  name: string;
  price: number;
  features: string[];
  productId?: string;
  priceId?: string;
};

export type Metric = {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
};
