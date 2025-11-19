// src/types.ts
export type TenantMembership = {
  tenantId: string;
  role: "owner" | "admin" | "agent";
  isAgency?: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  // legacy single-tenant field (keep for compatibility)
  tenantId?: string;
  memberships?: TenantMembership[];
  defaultTenantId?: string;
};

export type PlanId = "agency_core" | "agency_scale";

export type TenantType = "direct" | "agency" | "client";

export type Tenant = {
  id: string;
  businessName: string;
  businessPhone: string;
  stripeCustomerId?: string | null;
  planId?: PlanId | null;
  hasActiveSubscription?: boolean;
  telnyxNumber?: string | null;
  telnyxMessagingProfileId?: string | null;
  createdAt?: any | null;
  type?: TenantType;
  parentAgencyId?: string | null;

  // Public lead capture slug (tenants can have a public URL)
  publicSlug?: string | null;
  publicCaptureEnabled?: boolean;

  // Optional AI profile (used by SMS AI)
  aiProfile?: {
    enabled?: boolean;
    tone?: string;
    bookingStyle?: string;
    bookingPhone?: string;
    services?: string; // comma-separated
    serviceArea?: string;
    hours?: string;
    extraNotes?: string;
  };
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
  email?: string;
  // SMS opt-out flags
  unsubscribed?: boolean;
  unsubscribedAt?: any;
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
  // AI controls (optional)
  aiPaused?: boolean;
  aiLastStatus?: "on" | "off" | "blocked" | "unsubscribed";
};

export type Message = {
  id: string;
  from: "lead" | "agent";
  direction: "inbound" | "outbound";
  body: string;
  createdAt: any;
};

export type Plan = {
  id: "agency_core" | "agency_scale";
  name: string;
  price: number;
  features: string[];
  includedSms?: number;
  overageRate?: number;
  maxSubAccounts?: number;
  productId?: string;
  priceId?: string;
};

export type Metric = {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
};

