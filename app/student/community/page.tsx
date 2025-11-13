"use client";

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  Search,
  Filter,
  TrendingUp,
  Users,
  Flame,
} from "lucide-react";

export default function CommunityPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Nguyễn Thảo",
      avatar: "NT",
      time: "2 giờ trước",
      content: "Vừa hoàn thành 50 ngày liên tiếp tập luyện! 🎉 Cảm ơn cộng đồng FitCampus đã khuyến khích tôi!",
      image: null,
      likes: 234,
      comments: 18,
      shares: 5,
      liked: false,
    },
    {
      id: 2,
      author: "Trần Minh Đức",
      avatar: "TMĐ",
      time: "4 giờ trước",
      content: "Pro tip: Luôn nhớ uống nước trước, trong và sau khi tập luyện! 💧 Hydration là chìa khóa cho hiệu suất tốt.",
      image: null,
      likes: 156,
      comments: 23,
      shares: 8,
      liked: false,
    },
    {
      id: 3,
      author: "Phan Linh",
      avatar: "PL",
      time: "6 giờ trước",
      content: "Ai còn đang vật lộn với HIIT training? Tôi mới tìm ra cách cân bằng cường độ vs phục hồi. Chat với tôi!",
      image: null,
      likes: 89,
      comments: 12,
      shares: 3,
      liked: false,
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [leaderboard] = useState([
    { rank: 1, name: "Khánh Vy", level: 25, xp: 5200 },
    { rank: 2, name: "Tùng Lâm", level: 24, xp: 4950 },
    { rank: 3, name: "Hoàng Anh", level: 23, xp: 4800 },
    { rank: 4, name: "Bạn", level: 18, xp: 3200 },
    { rank: 5, name: "Minh Tuấn", level: 17, xp: 3050 },
  ]);

  const handleLike = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: posts.length + 1,
          author: "Bạn",
          avatar: "BẠ",
          time: "Bây giờ",
          content: newPost,
          image: null,
          likes: 0,
          comments: 0,
          shares: 0,
          liked: false,
        },
        ...posts,
      ]);
      setNewPost("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Feed */}
      <div className="lg:col-span-2 space-y-6">
        {/* Create Post */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
              BẠ
            </div>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Chia sẻ suy nghĩ, mẹo tập luyện, hoặc chúc mừng bạn bè..."
              className="flex-1 p-4 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none outline-none text-gray-900 placeholder:text-gray-400"
              rows={3}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-600">
                📸
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-600">
                😊
              </button>
            </div>
            <button
              onClick={handlePostSubmit}
              disabled={!newPost.trim()}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Chia sẻ
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{post.author}</p>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                  ⋮
                </button>
              </div>

              {/* Content */}
              <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

              {/* Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full rounded-lg mb-4 object-cover max-h-96"
                />
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 py-3 border-y border-gray-200 mb-4">
                <span>{post.likes} người thích</span>
                <span>{post.comments} bình luận</span>
                <span>{post.shares} chia sẻ</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-around">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition ${
                    post.liked
                      ? "text-red-600 bg-red-50 font-bold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${post.liked ? "fill-current" : ""}`} />
                  <span className="text-sm">{post.liked ? "Thích" : "Thích"}</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">Bình luận</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">Chia sẻ</span>
                </button>
              </div>

              {/* Comment Preview */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                    BẠ
                  </div>
                  <input
                    type="text"
                    placeholder="Viết bình luận..."
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        {/* Leaderboard */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            Bảng xếp hạng
          </h3>

          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${
                  user.rank <= 3
                    ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm flex-shrink-0">
                  {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : user.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500">Lvl {user.level}</p>
                </div>
                <p className="font-bold text-indigo-600 flex-shrink-0">{user.xp}</p>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition">
            Xem bảng xếp hạng đầy đủ
          </button>
        </div>

        {/* Online Members */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-green-600" />
            <span>
              Đang trực tuyến
              <span className="ml-2 inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </span>
          </h3>

          <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex-shrink-0"></div>
                <span className="text-sm text-gray-700 truncate">Thành viên {i + 1}</span>
                <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 text-center">423 người đang trực tuyến</p>
        </div>

        {/* Suggested Groups */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
          <h3 className="font-bold text-gray-900 mb-4">💡 Mẹo hôm nay</h3>
          <p className="text-sm text-gray-700 mb-4">
            Hãy thêm bạn của bạn vào FitCampus! Bạn sẽ nhận được bonus 50 XP cho mỗi bạn tham gia.
          </p>
          <button className="w-full py-2 rounded-lg bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition">
            Mời bạn bè
          </button>
        </div>
      </div>
    </div>
  );
}

