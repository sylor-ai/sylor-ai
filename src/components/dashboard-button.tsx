"use client";

import * as React from "react";

type DashboardButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

const BASE =
  "inline-flex items-center justify-center rounded-[10px] border border-white/20 px-4 py-2 text-[15px] font-medium tracking-tight text-white/85 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15 hover:border-white/35 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed";

export function DashboardButton({
  variant = "primary",
  className = "",
  ...props
}: DashboardButtonProps) {
  return <button className={`${BASE} ${className}`} {...props} />;
}
