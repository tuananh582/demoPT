import { UserRole } from "@/context/AuthContext";

export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export const adminNavItems: NavItem[] = [
  { label: "Tổng quan", href: "#dashboard", icon: "📊" },
  { label: "Học viên", href: "#trainees", icon: "🧑‍🎓" },
  { label: "Huấn luyện viên", href: "#coaches", icon: "🏋️" },
  { label: "Gói tập", href: "#packages", icon: "🎯" },
  { label: "Nội dung", href: "#content", icon: "📚" },
  { label: "Lịch học", href: "#schedule", icon: "🗓️" },
];

export const coachNavItems: NavItem[] = [
  { label: "Tổng quan", href: "#coach-dashboard", icon: "📊" },
  { label: "Học viên", href: "#coach-trainees", icon: "🧑‍🎓" },
  { label: "Tiến trình", href: "#progress", icon: "📈" },
  { label: "Lịch", href: "#coach-schedule", icon: "🗓️" },
  { label: "Thông báo", href: "#notifications", icon: "🔔" },
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
  },
  {
    name: "Quang Huy",
    status: "Trial",
    goal: "Giảm 3kg trong 4 tuần",
    plan: "Metabolic Reset",
    nextSession: "07/06 - 18:00 (Offline)",
  },
  {
    name: "Linh Chi",
    status: "Lead",
    goal: "Tăng cơ, cải thiện sức bền",
    plan: "Đang tư vấn",
    nextSession: "Chờ xác nhận",
  },
];

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
