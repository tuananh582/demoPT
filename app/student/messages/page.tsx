"use client";

import { useState } from "react";
import { Send, Search, Phone, Video, Info } from "lucide-react";

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState("");

  const chats = [
    {
      id: 1,
      name: "Thanh Hương (Mentor)",
      avatar: "TH",
      lastMessage: "Great job on the last class! Keep it up 👍",
      time: "2m ago",
      unread: 0,
      online: true,
    },
    {
      id: 2,
      name: "Fitness Squad",
      avatar: "FS",
      lastMessage: "Who's up for lunchtime class tomorrow?",
      time: "1h ago",
      unread: 3,
      online: true,
    },
    {
      id: 3,
      name: "Tuấn Kiệt",
      avatar: "TK",
      lastMessage: "Thanks for the workout tips!",
      time: "3h ago",
      unread: 0,
      online: false,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Thanh Hương",
      avatar: "TH",
      text: "How are you doing today?",
      time: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      text: "Hi Thanh! I'm doing great, just finished the morning yoga class",
      time: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Thanh Hương",
      avatar: "TH",
      text: "Great job on the last class! Keep it up 👍",
      time: "10:33 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "Thanh Hương",
      avatar: "TH",
      text: "By the way, I'd like to increase intensity gradually. What do you think?",
      time: "10:34 AM",
      isOwn: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Chats List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tin nhắn</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition text-left ${
                selectedChat === chat.id ? "bg-indigo-50 border-l-4 border-indigo-600" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold relative">
                  {chat.avatar}
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{chat.name}</p>
                  <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-500">{chat.time}</p>
                  {chat.unread > 0 && (
                    <span className="inline-block mt-1 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
              TH
            </div>
            <div>
              <p className="font-bold text-gray-900">Thanh Hương (Mentor)</p>
              <p className="text-xs text-gray-500">Đang trực tuyến</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition">
              <Info className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.isOwn ? "flex-row-reverse" : ""}`}
            >
              {!msg.isOwn && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {msg.avatar}
                </div>
              )}
              <div className={msg.isOwn ? "flex-row-reverse flex" : "flex"}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.isOwn
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <p className={`text-xs text-gray-500 mt-1 ${msg.isOwn ? "mr-3" : "ml-3"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 outline-none text-gray-900 placeholder:text-gray-400"
          />
          <button className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

