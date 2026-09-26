import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowUpRight(props: IconProps) {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}><path d="M5 19 19 5M5 5h14v14" /></svg>;
}

export function ArrowRight(props: IconProps) {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}><path d="M4 12h16m-7-7 7 7-7 7" /></svg>;
}

export function Crosshair(props: IconProps) {
  return <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...props}><circle cx="20" cy="20" r="12" /><circle cx="20" cy="20" r="4" /><path d="M20 0v11m0 18v11M0 20h11m18 0h11" /></svg>;
}

export function ChatIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}><path d="M20 11.5a8 8 0 0 1-8 8c-1.2 0-2.4-.3-3.5-.8L4 20l1.3-4.5A8 8 0 1 1 20 11.5Z" /><path d="M8 11h8" /></svg>;
}
