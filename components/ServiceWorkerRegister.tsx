"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("SW registered successfully:", reg.scope);
          reg.addEventListener("updatefound", () => {
            console.log("SW update found");
          });
        })
        .catch((err) => console.error("SW registration failed:", err));
    }
  }, []);

  return null;
}
