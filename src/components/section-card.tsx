import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function SectionCard({ children, className = "" }: Props) {
  return <section className={`rounded-3xl border border-white/10 bg-white/5 p-4 ${className}`}>{children}</section>;
}
