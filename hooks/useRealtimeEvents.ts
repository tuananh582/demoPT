"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AdminRealtimeEventSeed } from "@/data/mockData";

export interface RealtimeEvent extends AdminRealtimeEventSeed {
  status: "new" | "read";
  receivedAt: number;
}

export function useRealtimeEvents(seeds: AdminRealtimeEventSeed[], intervalMs = 8000) {
  const [events, setEvents] = useState<RealtimeEvent[]>(() =>
    seeds.slice(0, Math.min(3, seeds.length)).map((seed, index) => ({
      ...seed,
      status: "new" as const,
      receivedAt: Date.now() - index * 1000,
    })),
  );
  const indexRef = useRef(events.length);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (seeds.length === 0) {
      return;
    }
    timerRef.current = setInterval(() => {
      setEvents((prev) => {
        const nextSeed = seeds[indexRef.current % seeds.length];
        indexRef.current += 1;
        const nextEvent: RealtimeEvent = {
          ...nextSeed,
          status: "new",
          receivedAt: Date.now(),
        };
        return [nextEvent, ...prev].slice(0, 40);
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [intervalMs, seeds]);

  const markAsRead = useCallback((id: string) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, status: "read" } : event)));
  }, []);

  const markAllAsRead = useCallback(() => {
    setEvents((prev) => prev.map((event) => ({ ...event, status: "read" })));
  }, []);

  return {
    events,
    markAsRead,
    markAllAsRead,
  };
}
