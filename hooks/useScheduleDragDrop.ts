
import { useState, useCallback } from "react";

export interface ScheduleSession {
  id: string;
  title: string;
  time: string;
  type: "group" | "one_on_one" | "online";
  location: string;
  status: "confirmed" | "pending" | "online" | "cancelled";
  trainee?: string;
}

export interface ScheduleDay {
  day: string;
  date: string;
  sessions: ScheduleSession[];
}

interface DragDropState {
  draggedSession: ScheduleSession | null;
  draggedFrom: string; // day
  targetDay: string | null;
  isDragging: boolean;
}

interface NotificationPayload {
  type: "schedule_changed" | "session_moved";
  session: ScheduleSession;
  movedFrom: string;
  movedTo: string;
  timestamp: string;
}

export function useScheduleDragDrop() {
  const [dragDropState, setDragDropState] = useState<DragDropState>({
    draggedSession: null,
    draggedFrom: "",
    targetDay: null,
    isDragging: false,
  });

  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);

  const handleDragStart = useCallback(
    (session: ScheduleSession, fromDay: string) => {
      setDragDropState({
        draggedSession: session,
        draggedFrom: fromDay,
        targetDay: null,
        isDragging: true,
      });
    },
    []
  );

  const handleDragOver = useCallback((targetDay: string) => {
    setDragDropState((prev) => ({
      ...prev,
      targetDay,
    }));
  }, []);

  const handleDragEnd = useCallback(() => {
    setDragDropState({
      draggedSession: null,
      draggedFrom: "",
      targetDay: null,
      isDragging: false,
    });
  }, []);

  const handleDropSession = useCallback(
    (toDay: string): ScheduleSession | null => {
      if (!dragDropState.draggedSession || dragDropState.draggedFrom === toDay) {
        handleDragEnd();
        return null;
      }

      const movedSession = dragDropState.draggedSession;

      // Simulate notification trigger for change notification
      const notification: NotificationPayload = {
        type: "schedule_changed",
        session: movedSession,
        movedFrom: dragDropState.draggedFrom,
        movedTo: toDay,
        timestamp: new Date().toISOString(),
      };

      setNotifications((prev) => [...prev, notification]);

      // Reset drag state
      handleDragEnd();

      return movedSession;
    },
    [dragDropState, handleDragEnd]
  );

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    dragDropState,
    notifications,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDropSession,
    clearNotifications,
  };
}

