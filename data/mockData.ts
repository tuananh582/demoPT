import { UserRole } from "@/context/AuthContext";

export type NavItem = {
  label: string;
  href: string;
};

export const adminNavItems: NavItem[] = [
  { label: "Tổng quan", href: "#dashboard" },
  { label: "Học viên", href: "#trainees" },
  { label: "Huấn luyện viên", href: "#coaches" },
  { label: "Gói tập", href: "#packages" },
  { label: "Nội dung", href: "#content" },
  { label: "Lịch học", href: "#schedule" },
];

export const coachNavItems: NavItem[] = [
  { label: "Tổng quan", href: "/coach" },
  { label: "Học viên", href: "/coach/trainees" },
  { label: "Tiến trình", href: "/coach/progress" },
  { label: "Lịch làm việc", href: "/coach/schedule" },
  { label: "Thông báo", href: "/coach/notifications" },
];

export const revenueSummary = {
  week: {
    total: "185.500.000₫",
    change: "+12% so với tuần trước",
    series: [68, 54, 75, 82, 64, 71, 89],
    labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  },
  month: {
    total: "802.000.000₫",
    change: "+8% so với tháng trước",
    series: [620, 700, 640, 810],
    labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
  },
  year: {
    total: "9.650.000.000₫",
    change: "+15% so với năm trước",
    series: [620, 715, 690, 830, 910, 1020, 980, 1040, 1105, 1180, 1230, 1285],
    labels: [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ],
  },
};

export type TraineeStatus = "Lead" | "Trial" | "Active";

export interface TraineeRecord {
  name: string;
  email: string;
  phone: string;
  status: TraineeStatus;
  package: string;
  [key: string]: string | TraineeStatus;
}

export const traineeRecords: TraineeRecord[] = [
  {
    name: "Phuong Anh",
    email: "phuong.anh@example.com",
    phone: "0901 123 456",
    status: "Active",
    package: "12 tuần - Tăng cơ",
  },
  {
    name: "Quang Huy",
    email: "quang.huy@example.com",
    phone: "0903 234 567",
    status: "Trial",
    package: "4 tuần - Giảm mỡ",
  },
  {
    name: "Bao Chau",
    email: "bao.chau@example.com",
    phone: "0905 345 678",
    status: "Lead",
    package: "Gói nhóm buổi tối",
  },
  {
    name: "Gia Han",
    email: "gia.han@example.com",
    phone: "0906 456 789",
    status: "Active",
    package: "PT 1-1 nâng cao",
  },
];

export interface CoachRecord {
  name: string;
  email: string;
  specialization: string;
  availability: string;
  [key: string]: string;
}

export const coachRecords: CoachRecord[] = [
  {
    name: "Minh Tran",
    email: "coach@gymflow.vn",
    specialization: "Sức mạnh & Thể hình",
    availability: "Thứ 2-7 (6:00 - 18:00)",
  },
  {
    name: "Kim Ngan",
    email: "ngan.kim@example.com",
    specialization: "Giảm mỡ & Pilates",
    availability: "Thứ 3-7 (8:00 - 20:00)",
  },
  {
    name: "Thanh Phong",
    email: "phong.thanh@example.com",
    specialization: "Functional Training",
    availability: "Thứ 2-6 (7:00 - 17:00)",
  },
];

export const packages = [
  {
    name: "Gói nhóm - Tăng sức bền",
    duration: "8 tuần",
    price: "4.500.000₫",
    description: "3 buổi/tuần, lớp tối đa 10 người, kết hợp cardio & HIIT.",
  },
  {
    name: "PT 1-1 - Siết mỡ nhanh",
    duration: "12 tuần",
    price: "18.000.000₫",
    description: "Huấn luyện viên cá nhân, đo InBody định kỳ, meal plan tùy chỉnh.",
  },
  {
    name: "Gói doanh nghiệp",
    duration: "12 tuần",
    price: "Liên hệ",
    description: "Chương trình nhóm linh hoạt tại văn phòng, workshop dinh dưỡng.",
  },
];

export const contentCatalog = {
  exercises: [
    {
      name: "Deadlift",
      group: "Sức mạnh toàn thân",
      video: "https://youtu.be/1ZXobu7JvvE",
    },
    {
      name: "Push Up",
      group: "Ngực & tay sau",
      video: "https://youtu.be/IODxDxX7oi4",
    },
    {
      name: "Plank",
      group: "Core",
      video: "https://youtu.be/BQu26ABuVS0",
    },
  ],
  meals: [
    {
      name: "Salad ức gà",
      calories: "420 kcal",
      macros: "45C/38P/12F",
    },
    {
      name: "Yến mạch sữa hạt",
      calories: "360 kcal",
      macros: "55C/16P/10F",
    },
  ],
  programs: [
    {
      name: "Lean Builder",
      goal: "Tăng cơ giảm mỡ",
      duration: "12 tuần",
    },
    {
      name: "Metabolic Reset",
      goal: "Tăng sức bền",
      duration: "8 tuần",
    },
  ],
};

export const upcomingSchedules = [
  {
    title: "HIIT nhóm",
    type: "group",
    time: "Thứ 3, 18:00 - 19:00",
    coach: "Kim Ngan",
    link: "https://meet.google.com/abc-defg-hij",
  },
  {
    title: "PT 1-1 - Gia Han",
    type: "one_on_one",
    time: "Thứ 4, 07:30 - 08:30",
    coach: "Minh Tran",
    link: "https://meet.google.com/xyz-lmno-pqr",
  },
  {
    title: "Workshop dinh dưỡng",
    type: "online",
    time: "Thứ 6, 20:00 - 21:00",
    coach: "Lan Nguyen",
    link: "https://zoom.us/j/123456789",
  },
];

export const coachDashboardStats = {
  total: 24,
  lead: 6,
  trial: 5,
  active: 13,
};

export const coachTrainees = [
  {
    name: "Gia Han",
    status: "Active",
    goal: "Siết mỡ 5%",
    plan: "Lean Builder",
    nextSession: "06/06 - 07:30 (Online)",
    package: "PT 1-1 nâng cao",
    email: "gia.han@example.com",
    phone: "0906 456 789",
    lastCheckIn: "01/06",
    riskLevel: "low",
    streakDays: 18,
  },
  {
    name: "Quang Huy",
    status: "Trial",
    goal: "Giảm 3kg trong 4 tuần",
    plan: "Metabolic Reset",
    nextSession: "07/06 - 18:00 (Offline)",
    package: "Gói 4 tuần - Giảm mỡ",
    email: "quang.huy@example.com",
    phone: "0903 234 567",
    lastCheckIn: "25/05",
    riskLevel: "medium",
    streakDays: 6,
  },
  {
    name: "Linh Chi",
    status: "Lead",
    goal: "Tăng cơ, cải thiện sức bền",
    plan: "Đang tư vấn",
    nextSession: "Chờ xác nhận",
    package: "Chưa chọn",
    email: "linh.chi@example.com",
    phone: "0911 654 321",
    lastCheckIn: "19/05",
    riskLevel: "high",
    streakDays: 0,
  },
];

export interface TraineeInsight {
  summary: string;
  metrics: {
    adherence: number;
    sessionsThisWeek: number;
    completionRate: number;
    streakDays: number;
  };
  focusAreas: Array<{
    label: string;
    status: "on_track" | "at_risk" | "pending";
    due: string;
    note: string;
  }>;
  timeline: Array<{
    date: string;
    title: string;
    detail: string;
    type: "checkin" | "meal" | "note";
  }>;
  reminders: string[];
  upcomingSessions: Array<{
    title: string;
    time: string;
    channel: "Online" | "Offline";
    location: string;
  }>;
}

export const traineeInsights: Record<string, TraineeInsight> = {
  "Gia Han": {
    summary:
      "Gia Han bám sát meal plan, cần duy trì cardio hai buổi/tuần để đạt mục tiêu siết 5% mỡ trong tháng tới.",
    metrics: {
      adherence: 92,
      sessionsThisWeek: 3,
      completionRate: 88,
      streakDays: 18,
    },
    focusAreas: [
      {
        label: "Giữ nhịp tim 150bpm buổi HIIT",
        status: "on_track",
        due: "Tuần 1 - Tháng 6",
        note: "Đã đạt 2/3 buổi tuần này.",
      },
      {
        label: "Ngủ đủ 7 tiếng",
        status: "pending",
        due: "Tuần 2 - Tháng 6",
        note: "Đang theo dõi với wearable.",
      },
    ],
    timeline: [
      {
        date: "01/06",
        title: "Check-in buổi PT",
        detail: "Giảm 1.1kg, muscle +0.5kg.",
        type: "checkin",
      },
      {
        date: "29/05",
        title: "Điều chỉnh meal plan",
        detail: "Thay quinoa bằng khoai lang để dễ chuẩn bị.",
        type: "meal",
      },
      {
        date: "25/05",
        title: "Feedback sau buổi HIIT",
        detail: "Cần nhắc kéo giãn dài hơn sau bài Burpee.",
        type: "note",
      },
    ],
    reminders: [
      "Đính kèm video form Deadlift mới nhất cho học viên xem trước.",
      "Nhắc uống điện giải sau buổi cardio tối thứ 5.",
    ],
    upcomingSessions: [
      {
        title: "PT 1-1 - Tập core & glute",
        time: "Thứ 5 • 07:30 - 08:30",
        channel: "Online",
        location: "Google Meet",
      },
      {
        title: "Check-in dinh dưỡng nhanh",
        time: "Thứ 7 • 20:30 - 20:45",
        channel: "Online",
        location: "Google Meet",
      },
    ],
  },
  "Quang Huy": {
    summary:
      "Quang Huy mới hoàn tất tuần trial thứ 2, cần hỗ trợ duy trì cardio và giảm đồ ngọt để đạt mức -3kg.",
    metrics: {
      adherence: 68,
      sessionsThisWeek: 2,
      completionRate: 55,
      streakDays: 6,
    },
    focusAreas: [
      {
        label: "Cardio 4 buổi/tuần",
        status: "at_risk",
        due: "Tuần 2 - Tháng 6",
        note: "Mới hoàn thành 1/4 buổi.",
      },
      {
        label: "Giảm đường lỏng",
        status: "pending",
        due: "Tuần 3 - Tháng 6",
        note: "Cần gửi gợi ý đồ uống thay thế.",
      },
    ],
    timeline: [
      {
        date: "25/05",
        title: "Check-in online",
        detail: "Giữ cân, body fat giảm 0.5%.",
        type: "checkin",
      },
      {
        date: "22/05",
        title: "Feedback buổi nhóm",
        detail: "Cảm thấy hụt hơi set cuối.",
        type: "note",
      },
      {
        date: "19/05",
        title: "Điều chỉnh meal plan",
        detail: "Bổ sung bữa phụ 16h với trái cây.",
        type: "meal",
      },
    ],
    reminders: [
      "Gửi mẫu cardio 20 phút dễ thao tác tại nhà.",
      "Theo dõi cảm giác thèm ngọt trong form check-in.",
    ],
    upcomingSessions: [
      {
        title: "HIIT nhóm",
        time: "Thứ 3 • 18:00 - 19:00",
        channel: "Offline",
        location: "Studio A",
      },
      {
        title: "Check-in online",
        time: "Thứ 4 • 09:00 - 09:30",
        channel: "Online",
        location: "Google Meet",
      },
    ],
  },
  "Linh Chi": {
    summary:
      "Linh Chi vẫn ở giai đoạn tư vấn, cần hoàn tất khảo sát dinh dưỡng và trải nghiệm buổi trial để chốt gói.",
    metrics: {
      adherence: 0,
      sessionsThisWeek: 0,
      completionRate: 0,
      streakDays: 0,
    },
    focusAreas: [
      {
        label: "Hoàn thành khảo sát khẩu vị",
        status: "pending",
        due: "Trước 08/06",
        note: "Đã gửi form qua email.",
      },
      {
        label: "Đặt lịch trial",
        status: "at_risk",
        due: "Tuần này",
        note: "Chưa phản hồi lịch đề xuất.",
      },
    ],
    timeline: [
      {
        date: "30/05",
        title: "Gọi tư vấn",
        detail: "Quan tâm chương trình Lean Builder.",
        type: "note",
      },
    ],
    reminders: [
      "Chuẩn bị deck giới thiệu chương trình core/strength.",
      "Theo dõi email phản hồi về lịch trial.",
    ],
    upcomingSessions: [
      {
        title: "Buổi trial đề xuất",
        time: "Chờ xác nhận",
        channel: "Offline",
        location: "Studio B",
      },
    ],
  },
};

export interface MealPlanDay {
  day: string;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snack?: string;
  };
}

export interface TraineeMealPlan {
  trainee: string;
  weekRange: string;
  hydrationNote: string;
  days: MealPlanDay[];
}

export const traineeMealPlans: Record<string, TraineeMealPlan> = {
  "Gia Han": {
    trainee: "Gia Han",
    weekRange: "03/06 - 09/06",
    hydrationNote: "Uống tối thiểu 2.5L nước/ngày, bổ sung điện giải sau buổi cardio.",
    days: [
      {
        day: "Thứ 2",
        meals: {
          breakfast: "Yến mạch + whey + việt quất",
          lunch: "Ức gà áp chảo + khoai lang + salad",
          dinner: "Cá hồi nướng + quinoa + rau củ hấp",
          snack: "Sữa chua Hy Lạp + hạt óc chó",
        },
      },
      {
        day: "Thứ 3",
        meals: {
          breakfast: "Bánh mì nguyên cám + trứng luộc",
          lunch: "Bò bít tết + cơm gạo lứt + rau bina",
          dinner: "Tôm áp chảo + miến đậu xanh + bông cải",
        },
      },
      {
        day: "Thứ 4",
        meals: {
          breakfast: "Smoothie xoài + đạm đậu nành",
          lunch: "Cá thu kho + cơm gạo lứt + canh rau củ",
          dinner: "Ức gà xé + bún gạo lứt + rau sống",
        },
      },
    ],
  },
  "Quang Huy": {
    trainee: "Quang Huy",
    weekRange: "03/06 - 09/06",
    hydrationNote: "Giảm đồ ngọt, ưu tiên nước lọc 2L/ngày.",
    days: [
      {
        day: "Thứ 2",
        meals: {
          breakfast: "Trứng ốp + bánh mì đen",
          lunch: "Cá basa sốt cà + cơm gạo lứt",
          dinner: "Ức gà áp chảo + salad rau xanh",
        },
      },
      {
        day: "Thứ 3",
        meals: {
          breakfast: "Phở gà ít bánh",
          lunch: "Thịt nạc thăn + khoai lang + cải xanh",
          dinner: "Trứng hấp + đậu bắp luộc",
          snack: "Táo + bơ đậu phộng",
        },
      },
    ],
  },
  "Linh Chi": {
    trainee: "Linh Chi",
    weekRange: "Đang khảo sát khẩu vị",
    hydrationNote: "Gợi ý các lựa chọn healthy để thử nghiệm tuần tới.",
    days: [
      {
        day: "Gợi ý",
        meals: {
          breakfast: "Sinh tố chuối + yến mạch",
          lunch: "Salad cá ngừ + trứng luộc",
          dinner: "Ức gà quay + khoai tây nghiền",
        },
      },
    ],
  },
};

export interface MeasurementEntry {
  session: string;
  recordedAt: string;
  weight: string;
  bodyFat: string;
  muscleMass: string;
  note: string;
}

export const traineeMeasurements: Record<string, MeasurementEntry[]> = {
  "Gia Han": [
    {
      session: "PT 1-1 - 15/05",
      recordedAt: "15/05/2024 08:45",
      weight: "60.8 kg",
      bodyFat: "22.5%",
      muscleMass: "24.1 kg",
      note: "Kỹ thuật squat cải thiện, duy trì lịch chạy 2 lần/tuần.",
    },
    {
      session: "PT 1-1 - 01/06",
      recordedAt: "01/06/2024 08:40",
      weight: "59.7 kg",
      bodyFat: "21%",
      muscleMass: "24.6 kg",
      note: "Tuân thủ meal plan tốt, cần ngủ đủ 7 tiếng.",
    },
  ],
  "Quang Huy": [
    {
      session: "Check-in online - 25/05",
      recordedAt: "25/05/2024 19:15",
      weight: "74.2 kg",
      bodyFat: "26.8%",
      muscleMass: "29.5 kg",
      note: "Thiếu 1 buổi cardio, nhắc bổ sung rau xanh.",
    },
  ],
  "Linh Chi": [],
};

export const progressSnapshots = [
  {
    date: "01/05",
    weight: "62kg",
    bodyFat: "24%",
    note: "Ổn định, cần tăng cardio",
  },
  {
    date: "15/05",
    weight: "60.8kg",
    bodyFat: "22.5%",
    note: "Tuân thủ meal plan tốt",
  },
  {
    date: "01/06",
    weight: "59.7kg",
    bodyFat: "21%",
    note: "Cải thiện đáng kể",
  },
];

export const coachSchedule = [
  {
    time: "T3 - 07:30",
    title: "PT 1-1 - Gia Han",
    status: "Chờ xác nhận",
    link: "https://meet.google.com/xyz-lmno-pqr",
  },
  {
    time: "T3 - 18:00",
    title: "HIIT nhóm",
    status: "Đã xác nhận",
    link: "Tại phòng studio",
  },
  {
    time: "T4 - 09:00",
    title: "Check-in online - Quang Huy",
    status: "Online",
    link: "https://meet.google.com/abc-defg-hij",
  },
];

export interface CoachWeeklySummary {
  weekRange: string;
  totalSessions: number;
  completedSessions: number;
  cancelledSessions: number;
  sessions: Array<{
    day: string;
    time: string;
    title: string;
    status: string;
  }>;
}

export const coachWeeklySummary: CoachWeeklySummary = {
  weekRange: "03/06 - 09/06",
  totalSessions: 11,
  completedSessions: 6,
  cancelledSessions: 1,
  sessions: [
    {
      day: "Thứ 2",
      time: "07:00 - 08:00",
      title: "PT 1-1 - Minh Anh",
      status: "Đã hoàn thành",
    },
    {
      day: "Thứ 3",
      time: "07:30 - 08:30",
      title: "PT 1-1 - Gia Han",
      status: "Chờ xác nhận",
    },
    {
      day: "Thứ 3",
      time: "18:00 - 19:00",
      title: "HIIT nhóm",
      status: "Đã hoàn thành",
    },
    {
      day: "Thứ 4",
      time: "09:00 - 09:45",
      title: "Check-in online - Quang Huy",
      status: "Online",
    },
    {
      day: "Thứ 5",
      time: "19:30 - 20:30",
      title: "Functional nhóm",
      status: "Đã hoàn thành",
    },
    {
      day: "Thứ 6",
      time: "20:00 - 21:00",
      title: "Workshop dinh dưỡng",
      status: "Đã hoàn thành",
    },
    {
      day: "Thứ 7",
      time: "08:00 - 09:00",
      title: "PT 1-1 - Tuan Kiet",
      status: "Đã hủy",
    },
  ],
};

export const coachNotifications = [
  {
    title: "Lịch mới chờ xác nhận",
    message: "Buổi PT 1-1 với Gia Han vào 07:30 ngày 06/06 cần xác nhận.",
    time: "2 phút trước",
  },
  {
    title: "Lịch sắp diễn ra",
    message: "HIIT nhóm bắt đầu trong 2 giờ nữa.",
    time: "Nhắc nhở",
  },
  {
    title: "Học viên phản hồi",
    message: "Quang Huy gửi feedback sau buổi tập 05/06.",
    time: "Hôm qua",
  },
];

export function getNavItems(role: UserRole) {
  return role === "admin" ? adminNavItems : coachNavItems;
}

export interface CoachActionItem {
  id: string;
  type: "confirm" | "follow_up" | "reminder";
  title: string;
  trainee: string;
  time: string;
  channel: string;
  note: string;
}

export const coachActionQueue: CoachActionItem[] = [
  {
    id: "action-01",
    type: "confirm",
    title: "PT 1-1 - Gia Han",
    trainee: "Gia Han",
    time: "06/06 • 07:30",
    channel: "Google Meet",
    note: "Chờ xác nhận 1-1 trong 6 giờ qua.",
  },
  {
    id: "action-02",
    type: "follow_up",
    title: "Trial - Linh Chi",
    trainee: "Linh Chi",
    time: "Đề xuất 08/06 • 09:00",
    channel: "Studio B",
    note: "Cần gọi lại xác nhận tham gia.",
  },
  {
    id: "action-03",
    type: "reminder",
    title: "Check-in online - Quang Huy",
    trainee: "Quang Huy",
    time: "07/06 • 09:00",
    channel: "Google Meet",
    note: "Gửi form tự đánh giá trước buổi call.",
  },
];

export interface CoachWeekDay {
  day: string;
  date: string;
  slots: Array<{
    title: string;
    time: string;
    type: "group" | "one_on_one" | "online";
    location: string;
    status: "confirmed" | "pending" | "online" | "cancelled";
  }>;
}

export const coachWeekView: CoachWeekDay[] = [
  {
    day: "Thứ 2",
    date: "03/06",
    slots: [
      {
        title: "PT 1-1 - Minh Anh",
        time: "07:00 - 08:00",
        type: "one_on_one",
        location: "Phòng PT",
        status: "confirmed",
      },
      {
        title: "Functional nhóm",
        time: "19:30 - 20:30",
        type: "group",
        location: "Studio C",
        status: "confirmed",
      },
    ],
  },
  {
    day: "Thứ 3",
    date: "04/06",
    slots: [
      {
        title: "PT 1-1 - Gia Han",
        time: "07:30 - 08:30",
        type: "one_on_one",
        location: "Google Meet",
        status: "pending",
      },
      {
        title: "HIIT nhóm",
        time: "18:00 - 19:00",
        type: "group",
        location: "Studio A",
        status: "confirmed",
      },
    ],
  },
  {
    day: "Thứ 4",
    date: "05/06",
    slots: [
      {
        title: "Check-in online - Quang Huy",
        time: "09:00 - 09:45",
        type: "online",
        location: "Google Meet",
        status: "online",
      },
      {
        title: "PT 1-1 - Thu Trang",
        time: "17:00 - 18:00",
        type: "one_on_one",
        location: "Phòng PT",
        status: "confirmed",
      },
    ],
  },
  {
    day: "Thứ 5",
    date: "06/06",
    slots: [
      {
        title: "Workshop dinh dưỡng",
        time: "20:00 - 21:00",
        type: "online",
        location: "Zoom",
        status: "online",
      },
    ],
  },
  {
    day: "Thứ 6",
    date: "07/06",
    slots: [
      {
        title: "PT 1-1 - Tuan Kiet",
        time: "08:00 - 09:00",
        type: "one_on_one",
        location: "Phòng PT",
        status: "confirmed",
      },
    ],
  },
  {
    day: "Thứ 7",
    date: "08/06",
    slots: [
      {
        title: "Trial - Linh Chi",
        time: "09:00 - 10:00",
        type: "one_on_one",
        location: "Studio B",
        status: "pending",
      },
    ],
  },
  {
    day: "Chủ nhật",
    date: "09/06",
    slots: [],
  },
];

export interface CoachAgendaItem {
  id: string;
  title: string;
  time: string;
  status: "confirmed" | "pending" | "online";
  note: string;
  channel: string;
}

export const coachAgenda: CoachAgendaItem[] = [
  {
    id: "agenda-01",
    title: "PT 1-1 - Gia Han",
    time: "06/06 • 07:30",
    status: "pending",
    note: "Nhắc gửi link trước 15 phút.",
    channel: "Google Meet",
  },
  {
    id: "agenda-02",
    title: "HIIT nhóm",
    time: "06/06 • 18:00",
    status: "confirmed",
    note: "Chuẩn bị playlist mới.",
    channel: "Studio A",
  },
  {
    id: "agenda-03",
    title: "Check-in online - Quang Huy",
    time: "07/06 • 09:00",
    status: "online",
    note: "Theo dõi adherence tuần 2.",
    channel: "Google Meet",
  },
];
