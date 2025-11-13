export type Role = "owner" | "admin" | "member" | "viewer";

const RANK: Record<Role, number> = {
  owner: 4,
  admin: 3,
  member: 2,
  viewer: 1,
};

export function roleRank(role: Role): number {
  return RANK[role] ?? 0;
}

export function canManageMembers(role: Role) {
  return roleRank(role) >= roleRank("admin");
}

export function canEditBilling(role: Role) {
  return roleRank(role) >= roleRank("owner");
}
