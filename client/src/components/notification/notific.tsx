// You can place this code in a file like `app/notifications/page.tsx`
import { UserPlus, Swords, Megaphone, Check, X } from "lucide-react";

// --- Types for our placeholder data ---
type NotificationType = "friend_request" | "match_invite" | "announcement";

type Notification = {
  id: number;
  type: NotificationType;
  author?: {
    name: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
};

// --- Placeholder Data ---
const notifications: Notification[] = [
  {
    id: 1,
    type: "friend_request",
    author: {
      name: "Alice",
      avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    content: "sent you a friend request.",
    timestamp: "15 minutes ago",
    isRead: false,
  },
  {
    id: 2,
    type: "match_invite",
    author: {
      name: "CodeSlayer",
      avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
    },
    content: 'invited you to a 1v1 "Fastest Debugger" match.',
    timestamp: "1 hour ago",
    isRead: false,
  },
  {
    id: 3,
    type: "announcement",
    content: 'The "Code RED: Season 3" tournament registration is now open!',
    timestamp: "8 hours ago",
    isRead: false,
  },
  {
    id: 4,
    type: "friend_request",
    author: {
      name: "Bob",
      avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
    },
    content: "accepted your friend request.",
    timestamp: "1 day ago",
    isRead: true,
  },
];

// Helper to get the correct icon for each notification type
const NotificationIcon = ({ type }: { type: NotificationType }) => {
  switch (type) {
    case "friend_request":
      return <UserPlus className="w-6 h-6 text-blue-400" />;
    case "match_invite":
      return <Swords className="w-6 h-6 text-red-400" />;
    case "announcement":
      return <Megaphone className="w-6 h-6 text-yellow-400" />;
    default:
      return null;
  }
};

export default function NotificationsPage() {
  return (
    <div className=" text-white h-full w-full p-8 font-sans overflow-y-scroll scrollbar-hide bg-[#121212]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Announcement</h1>
          <button className="text-sm text-zinc-400 hover:text-white transition-colors">
            Mark all as read
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-zinc-700 mb-6">
          <button className="px-4 py-2 text-sm font-medium text-white border-b-2 border-red-500">
            All
          </button>
          <button className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white">
            Unread
          </button>
          <button className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white">
            Invites
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-[#1E1E1E] p-5 rounded-lg shadow-lg flex items-start space-x-4 transition-colors ${
                !notification.isRead
                  ? "border-l-2 border-red-500"
                  : "border-l-2 border-transparent"
              }`}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                <NotificationIcon type={notification.type} />
              </div>

              <div className="flex-1">
                {notification.author && (
                  <img
                    src={notification.author.avatarUrl}
                    alt={notification.author.name}
                    className="w-6 h-6 rounded-full inline-block mr-2"
                  />
                )}
                <p className="text-sm inline">
                  {notification.author && (
                    <strong className="cursor-pointer hover:underline">
                      {notification.author.name}
                    </strong>
                  )}
                  <span className="text-zinc-300"> {notification.content}</span>
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  {notification.timestamp}
                </p>

                {/* Action Buttons for specific types */}
                {notification.type === "friend_request" &&
                  !notification.isRead && (
                    <div className="mt-3 flex space-x-2">
                      <button className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1.5 px-3 rounded-md">
                        <Check className="w-3.5 h-3.5 mr-1" /> Accept
                      </button>
                      <button className="flex items-center justify-center bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold py-1.5 px-3 rounded-md">
                        <X className="w-3.5 h-3.5 mr-1" /> Decline
                      </button>
                    </div>
                  )}
                {notification.type === "match_invite" && (
                  <div className="mt-3 flex space-x-2">
                    <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1.5 px-3 rounded-md">
                      Join Match
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
