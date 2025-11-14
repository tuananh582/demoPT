import { UserRole } from "@/context/AuthContext";

export type NavItem = {
  label: string;
  href: string;
};

export const adminNavItems: NavItem[] = [
  { label: "Tổng quan", href: "/admin/dashboard" },
  { label: "Học viên", href: "/admin/trainees" },
  { label: "Huấn luyện viên", href: "/admin/coaches" },
  { label: "Tài khoản", href: "/admin/accounts" },
  { label: "Quyền truy cập", href: "/admin/access-control" },
  { label: "Gói tập", href: "/admin/packages" },
  { label: "Danh mục", href: "/admin/catalog" },
  { label: "Bài tập", href: "/admin/lessons" },
  { label: "Marketing PT", href: "/admin/marketing" },
  { label: "Lịch học", href: "/admin/schedule" },
];

export const coachNavItems: NavItem[] = [
  { label: "Tổng quan", href: "#coach-dashboard" },
  { label: "Học viên", href: "#coach-trainees" },
  { label: "Tiến trình", href: "#progress" },
  { label: "Lịch", href: "#coach-schedule" },
  { label: "Thông báo", href: "#notifications" },
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

export const accountRecords = [
  {
    name: "Phuong Anh",
    email: "phuong.anh@example.com",
    role: "Học viên",
    status: "Hoạt động",
  },
  {
    name: "Quang Huy",
    email: "quang.huy@example.com",
    role: "Học viên",
    status: "Dùng thử",
  },
  {
    name: "Minh Tran",
    email: "coach@gymflow.vn",
    role: "Coach",
    status: "Hoạt động",
  },
  {
    name: "Thao Nguyen",
    email: "thao.nguyen@example.com",
    role: "Admin",
    status: "Hoạt động",
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

export type CoachTimeframeKey = "month" | "quarter" | "year";
export type CoachDisciplineKey = "strength" | "conditioning" | "mobility";

export interface CoachMetricPoint {
  date: string;
  label: string;
  value: number;
}

export const coachDisciplineFilters = [
  { key: "strength", label: "Sức mạnh" },
  { key: "conditioning", label: "HIIT/Conditioning" },
  { key: "mobility", label: "Mobility & Recovery" },
] as const;

export const coachPerformanceSeries: Record<CoachTimeframeKey, Record<CoachDisciplineKey, CoachMetricPoint[]>> = {
  month: {
    strength: [
      { date: "2024-06-01", label: "01/06", value: 72 },
      { date: "2024-06-04", label: "04/06", value: 78 },
      { date: "2024-06-07", label: "07/06", value: 74 },
      { date: "2024-06-10", label: "10/06", value: 83 },
      { date: "2024-06-13", label: "13/06", value: 86 },
      { date: "2024-06-16", label: "16/06", value: 90 },
      { date: "2024-06-19", label: "19/06", value: 88 },
      { date: "2024-06-22", label: "22/06", value: 91 },
      { date: "2024-06-25", label: "25/06", value: 95 },
      { date: "2024-06-28", label: "28/06", value: 92 },
    ],
    conditioning: [
      { date: "2024-06-01", label: "01/06", value: 64 },
      { date: "2024-06-04", label: "04/06", value: 70 },
      { date: "2024-06-07", label: "07/06", value: 68 },
      { date: "2024-06-10", label: "10/06", value: 74 },
      { date: "2024-06-13", label: "13/06", value: 77 },
      { date: "2024-06-16", label: "16/06", value: 79 },
      { date: "2024-06-19", label: "19/06", value: 81 },
      { date: "2024-06-22", label: "22/06", value: 84 },
      { date: "2024-06-25", label: "25/06", value: 83 },
      { date: "2024-06-28", label: "28/06", value: 86 },
    ],
    mobility: [
      { date: "2024-06-01", label: "01/06", value: 58 },
      { date: "2024-06-04", label: "04/06", value: 60 },
      { date: "2024-06-07", label: "07/06", value: 63 },
      { date: "2024-06-10", label: "10/06", value: 67 },
      { date: "2024-06-13", label: "13/06", value: 69 },
      { date: "2024-06-16", label: "16/06", value: 71 },
      { date: "2024-06-19", label: "19/06", value: 73 },
      { date: "2024-06-22", label: "22/06", value: 74 },
      { date: "2024-06-25", label: "25/06", value: 76 },
      { date: "2024-06-28", label: "28/06", value: 78 },
    ],
  },
  quarter: {
    strength: [
      { date: "2024-04-01", label: "Tuần 1", value: 68 },
      { date: "2024-04-08", label: "Tuần 2", value: 71 },
      { date: "2024-04-15", label: "Tuần 3", value: 73 },
      { date: "2024-04-22", label: "Tuần 4", value: 75 },
      { date: "2024-05-01", label: "Tuần 5", value: 76 },
      { date: "2024-05-08", label: "Tuần 6", value: 80 },
      { date: "2024-05-15", label: "Tuần 7", value: 82 },
      { date: "2024-05-22", label: "Tuần 8", value: 85 },
      { date: "2024-06-01", label: "Tuần 9", value: 88 },
      { date: "2024-06-08", label: "Tuần 10", value: 91 },
      { date: "2024-06-15", label: "Tuần 11", value: 93 },
      { date: "2024-06-22", label: "Tuần 12", value: 95 },
    ],
    conditioning: [
      { date: "2024-04-01", label: "Tuần 1", value: 60 },
      { date: "2024-04-08", label: "Tuần 2", value: 62 },
      { date: "2024-04-15", label: "Tuần 3", value: 63 },
      { date: "2024-04-22", label: "Tuần 4", value: 66 },
      { date: "2024-05-01", label: "Tuần 5", value: 68 },
      { date: "2024-05-08", label: "Tuần 6", value: 70 },
      { date: "2024-05-15", label: "Tuần 7", value: 72 },
      { date: "2024-05-22", label: "Tuần 8", value: 75 },
      { date: "2024-06-01", label: "Tuần 9", value: 77 },
      { date: "2024-06-08", label: "Tuần 10", value: 79 },
      { date: "2024-06-15", label: "Tuần 11", value: 81 },
      { date: "2024-06-22", label: "Tuần 12", value: 83 },
    ],
    mobility: [
      { date: "2024-04-01", label: "Tuần 1", value: 52 },
      { date: "2024-04-08", label: "Tuần 2", value: 54 },
      { date: "2024-04-15", label: "Tuần 3", value: 55 },
      { date: "2024-04-22", label: "Tuần 4", value: 56 },
      { date: "2024-05-01", label: "Tuần 5", value: 58 },
      { date: "2024-05-08", label: "Tuần 6", value: 59 },
      { date: "2024-05-15", label: "Tuần 7", value: 61 },
      { date: "2024-05-22", label: "Tuần 8", value: 63 },
      { date: "2024-06-01", label: "Tuần 9", value: 65 },
      { date: "2024-06-08", label: "Tuần 10", value: 67 },
      { date: "2024-06-15", label: "Tuần 11", value: 68 },
      { date: "2024-06-22", label: "Tuần 12", value: 70 },
    ],
  },
  year: {
    strength: [
      { date: "2024-01-01", label: "T1", value: 62 },
      { date: "2024-02-01", label: "T2", value: 64 },
      { date: "2024-03-01", label: "T3", value: 66 },
      { date: "2024-04-01", label: "T4", value: 69 },
      { date: "2024-05-01", label: "T5", value: 74 },
      { date: "2024-06-01", label: "T6", value: 78 },
      { date: "2024-07-01", label: "T7", value: 81 },
      { date: "2024-08-01", label: "T8", value: 84 },
      { date: "2024-09-01", label: "T9", value: 86 },
      { date: "2024-10-01", label: "T10", value: 89 },
      { date: "2024-11-01", label: "T11", value: 92 },
      { date: "2024-12-01", label: "T12", value: 95 },
    ],
    conditioning: [
      { date: "2024-01-01", label: "T1", value: 55 },
      { date: "2024-02-01", label: "T2", value: 57 },
      { date: "2024-03-01", label: "T3", value: 59 },
      { date: "2024-04-01", label: "T4", value: 61 },
      { date: "2024-05-01", label: "T5", value: 63 },
      { date: "2024-06-01", label: "T6", value: 66 },
      { date: "2024-07-01", label: "T7", value: 68 },
      { date: "2024-08-01", label: "T8", value: 70 },
      { date: "2024-09-01", label: "T9", value: 72 },
      { date: "2024-10-01", label: "T10", value: 74 },
      { date: "2024-11-01", label: "T11", value: 75 },
      { date: "2024-12-01", label: "T12", value: 78 },
    ],
    mobility: [
      { date: "2024-01-01", label: "T1", value: 48 },
      { date: "2024-02-01", label: "T2", value: 49 },
      { date: "2024-03-01", label: "T3", value: 50 },
      { date: "2024-04-01", label: "T4", value: 51 },
      { date: "2024-05-01", label: "T5", value: 53 },
      { date: "2024-06-01", label: "T6", value: 55 },
      { date: "2024-07-01", label: "T7", value: 58 },
      { date: "2024-08-01", label: "T8", value: 60 },
      { date: "2024-09-01", label: "T9", value: 61 },
      { date: "2024-10-01", label: "T10", value: 63 },
      { date: "2024-11-01", label: "T11", value: 65 },
      { date: "2024-12-01", label: "T12", value: 67 },
    ],
  },
};

export interface CoachMetricSummaryItem {
  id: string;
  label: string;
  value: string;
  change: string;
  tone: "graphite" | "emerald" | "sky" | "amber" | "fuchsia";
  highlights: string[];
  recommendations: string[];
}

export const coachMetricSummaries: CoachMetricSummaryItem[] = [
  {
    id: "adherence",
    label: "Tỷ lệ tuân thủ buổi tập",
    value: "92%",
    change: "+4% so với tháng trước",
    tone: "emerald",
    highlights: ["Ngày cao nhất: 25/06 - 98%", "Học viên mới vẫn giữ >85% sau tuần 2"],
    recommendations: ["Tiếp tục gửi nhắc tự động mỗi tối", "Thử nội dung video 5 phút cho lớp buổi sáng"],
  },
  {
    id: "strength",
    label: "Điểm trung bình nhóm Sức mạnh",
    value: "91",
    change: "+7 điểm",
    tone: "graphite",
    highlights: ["PR deadlift: +12% trong 6 tuần", "Lớp Lean Builder đạt 95 điểm tuần qua"],
    recommendations: ["Phân bổ thêm slot buổi sáng", "Bổ sung bài tập core mới vào tuần 3"],
  },
  {
    id: "conditioning",
    label: "Điểm HIIT/Conditioning",
    value: "84",
    change: "+5 điểm",
    tone: "sky",
    highlights: ["60% học viên đạt target calorie burn", "Chương trình Metabolic Reset giảm 1 phút thời gian nghỉ"],
    recommendations: ["Tăng thêm tuỳ chọn playlist để giữ động lực", "Theo dõi thêm nhịp tim trung bình"],
  },
  {
    id: "mobility",
    label: "Điểm Mobility/Recovery",
    value: "76",
    change: "+3 điểm",
    tone: "amber",
    highlights: ["Yoga flow mới nhận 15 phản hồi tích cực", "Chấn thương tái phát giảm 8%"],
    recommendations: ["Đưa content giãn cơ lên app mobile", "Nhắc học viên check-in cảm nhận buổi tối"],
  },
  {
    id: "nutrition",
    label: "Tuân thủ meal plan",
    value: "88%",
    change: "+6%",
    tone: "fuchsia",
    highlights: ["23/25 học viên ghi log bữa sáng đủ 5 ngày", "Lượng protein trung bình tăng 12g/ngày"],
    recommendations: ["Phát hành mini ebook công thức", "Đẩy thông báo nhắc ăn nhẹ sau buổi chiều"],
  },
];

export interface CoachActivityFeedItem {
  id: string;
  timestamp: string;
  title: string;
  detail: string;
  category: string;
  impact: string;
}

export const coachActivityFeed: CoachActivityFeedItem[] = [
  { id: "feed-01", timestamp: "08:10", title: "Gia Han hoàn thành circuit nâng cao", detail: "Hoàn thành 5 vòng EMOM, RPE 8/10.", category: "Strength", impact: "+18% tổng khối lượng" },
  { id: "feed-02", timestamp: "08:32", title: "Quang Huy cập nhật meal log", detail: "Đạt đủ 130g protein trước 12h trưa.", category: "Nutrition", impact: "Tuân thủ 100%" },
  { id: "feed-03", timestamp: "09:05", title: "Linh Chi đăng ký buổi HIIT bổ sung", detail: "Thêm slot thứ 5 19:00.", category: "Schedule", impact: "Lấp 90% công suất lớp" },
  { id: "feed-04", timestamp: "10:12", title: "Feedback tích cực từ nhóm Mobility", detail: "Điểm hài lòng 4.9/5 cho flow mới.", category: "Mobility", impact: "Giảm 8% căng cơ" },
  { id: "feed-05", timestamp: "11:20", title: "Coach Minh ghi chú phục hồi", detail: "Đề xuất nghỉ active recovery cho Gia Han.", category: "Recovery", impact: "Bảo toàn tiến độ" },
  { id: "feed-06", timestamp: "13:45", title: "Lead mới từ landing page", detail: "Thu Ha đăng ký gói 8 tuần - Strength", category: "Lead", impact: "Ưu tiên liên hệ trong ngày" },
  { id: "feed-07", timestamp: "15:05", title: "Cập nhật lịch zoom nhóm Lean Builder", detail: "Link mới áp dụng từ 07/06.", category: "Schedule", impact: "Đảm bảo 25 học viên truy cập" },
  { id: "feed-08", timestamp: "16:22", title: "Trial kéo dài thêm 1 tuần", detail: "Minh Chau xin gia hạn để hoàn thành check-in.", category: "Trial", impact: "Risk giảm chuyển đổi" },
  { id: "feed-09", timestamp: "17:40", title: "PT 1-1 xác nhận học viên Elite", detail: "Phu Hung đồng ý lịch sáng T7.", category: "Schedule", impact: "Slot prime-time kín 100%" },
  { id: "feed-10", timestamp: "18:15", title: "Nâng cấp meal plan mùa hè", detail: "Thêm 4 công thức giàu đạm từ đậu nành.", category: "Nutrition", impact: "Tăng đa dạng món" },
  { id: "feed-11", timestamp: "19:02", title: "Coach Ngan gửi recap ngày", detail: "Tổng 17 buổi, 0 hủy.", category: "Ops", impact: "Giữ SLA 100%" },
  { id: "feed-12", timestamp: "20:30", title: "Push nhắc ngủ sớm", detail: "Gửi cho 12 học viên ngủ <6h.", category: "Habits", impact: "Dự kiến tăng HRV 4%" },
];

export type AdminRealtimeEventType = "lead" | "progress" | "schedule";

export interface AdminRealtimeEventSeed {
  id: string;
  type: AdminRealtimeEventType;
  title: string;
  message: string;
  actor: string;
  occurredAt: string;
}

export const realtimeEventSeeds: AdminRealtimeEventSeed[] = [
  {
    id: "evt-001",
    type: "lead",
    title: "Lead mới đăng ký",
    message: "Thu Ha (0902 889 223) vừa chọn gói Lean Builder 8 tuần.",
    actor: "Landing Page",
    occurredAt: "09:01",
  },
  {
    id: "evt-002",
    type: "progress",
    title: "Coach Minh cập nhật log",
    message: "Check-in trọng lượng cho Gia Han (-0.7kg so với tuần trước).",
    actor: "Coach Minh Tran",
    occurredAt: "09:12",
  },
  {
    id: "evt-003",
    type: "schedule",
    title: "Lịch nhóm thay đổi",
    message: "HIIT tối thứ 5 chuyển sang online, link mới đã gửi.",
    actor: "Admin Thao Nguyen",
    occurredAt: "09:25",
  },
  {
    id: "evt-004",
    type: "progress",
    title: "Feedback meal plan",
    message: "Quang Huy đánh giá 5/5 cho menu Metabolic Reset.",
    actor: "Coach Kim Ngan",
    occurredAt: "09:40",
  },
  {
    id: "evt-005",
    type: "lead",
    title: "Khách doanh nghiệp liên hệ",
    message: "DN VinaFoods yêu cầu tư vấn gói doanh nghiệp 12 tuần.",
    actor: "Website chatbot",
    occurredAt: "10:05",
  },
  {
    id: "evt-006",
    type: "schedule",
    title: "Coach xác nhận buổi 1-1",
    message: "Coach Thanh Phong đã xác nhận buổi Elite 07:30 T7.",
    actor: "Coach Thanh Phong",
    occurredAt: "10:27",
  },
];

export type PermissionCode =
  | "approvePayments"
  | "editSchedules"
  | "manageCoaches"
  | "publishMarketing"
  | "exportReports"
  | "manageNotifications";

export const permissionDefinitions: Array<{ code: PermissionCode; label: string; description: string }> = [
  { code: "approvePayments", label: "Duyệt thanh toán/gói tập", description: "Quyền xác nhận giao dịch, gia hạn và hoàn tiền." },
  { code: "editSchedules", label: "Chỉnh sửa lịch học", description: "Thêm/sửa/xoá lịch lớp nhóm và PT 1-1." },
  { code: "manageCoaches", label: "Quản lý hồ sơ coach", description: "Tạo mới, vô hiệu hoá hoặc phân quyền coach." },
  { code: "publishMarketing", label: "Xuất bản marketing", description: "Chỉnh sửa nội dung landing page, gói nổi bật." },
  { code: "exportReports", label: "Xuất dữ liệu báo cáo", description: "Tải xuống CSV doanh thu, danh sách học viên." },
  { code: "manageNotifications", label: "Quản lý realtime feed", description: "Cấu hình kênh thông báo và reset queue." },
];

export interface AccessControlRow {
  role: string;
  description: string;
  permissions: Record<PermissionCode, boolean>;
}

export const accessControlMatrix: AccessControlRow[] = [
  {
    role: "Chief Admin",
    description: "Toàn quyền vận hành và phê duyệt tài chính.",
    permissions: {
      approvePayments: true,
      editSchedules: true,
      manageCoaches: true,
      publishMarketing: true,
      exportReports: true,
      manageNotifications: true,
    },
  },
  {
    role: "Admin",
    description: "Quản lý lịch, tài khoản và nội dung thường ngày.",
    permissions: {
      approvePayments: true,
      editSchedules: true,
      manageCoaches: true,
      publishMarketing: true,
      exportReports: true,
      manageNotifications: false,
    },
  },
  {
    role: "Phó admin",
    description: "Hỗ trợ vận hành, không truy cập cấu hình hệ thống.",
    permissions: {
      approvePayments: false,
      editSchedules: true,
      manageCoaches: false,
      publishMarketing: true,
      exportReports: true,
      manageNotifications: false,
    },
  },
];

export const permissionAuditLog = [
  { id: "audit-01", actor: "Lan Nguyen", action: "Bật Xuất dữ liệu cho Admin", at: "05/06 09:13" },
  { id: "audit-02", actor: "Lan Nguyen", action: "Tắt Duyệt thanh toán của Phó admin", at: "05/06 09:14" },
  { id: "audit-03", actor: "Thao Nguyen", action: "Bật Publish marketing của Phó admin", at: "05/06 09:18" },
];

export function getNavItems(role: UserRole) {
  return role === "admin" ? adminNavItems : coachNavItems;
}
