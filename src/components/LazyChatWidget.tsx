"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// The chat bundle is large; load it only once the page is idle so it does not
// compete with the first render (mobile LCP / TBT).
const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

export default function LazyChatWidget() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    };
    if (w.requestIdleCallback) {
      w.requestIdleCallback(() => setReady(true), { timeout: 3000 });
    } else {
      const t = setTimeout(() => setReady(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);
  return ready ? <ChatWidget /> : null;
}
