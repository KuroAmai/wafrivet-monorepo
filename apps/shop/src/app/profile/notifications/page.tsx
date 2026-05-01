"use client";

import { Bell, Package, Tag, Info, CheckCircle } from "@phosphor-icons/react";

export default function NotificationsPage() {
  const notifications = [
    { 
      id: 1, 
      title: "Order #WF-9281 Shipped", 
      message: "Your order for Bovigen Scour Vaccine has been picked up by the rider.", 
      time: "2 hours ago",
      type: "order",
      icon: Package,
      bg: "bg-blue-50",
      color: "text-blue-500",
      isUnread: true
    },
    { 
      id: 2, 
      title: "Price Drop Alert", 
      message: "An item in your wishlist 'Tetracycline Soluble' is now 15% off.", 
      time: "5 hours ago",
      type: "promo",
      icon: Tag,
      bg: "bg-orange-50",
      color: "text-orange-500",
      isUnread: true
    },
    { 
      id: 3, 
      title: "Security Update", 
      message: "A new device logged into your account from Kano, Nigeria.", 
      time: "Yesterday, 8:42 AM",
      type: "security",
      icon: Info,
      bg: "bg-gray-100",
      color: "text-gray-500",
      isUnread: false
    },
    { 
      id: 4, 
      title: "Order Delivered", 
      message: "Order #WF-8912 has been successfully delivered to your Home address.", 
      time: "2 days ago",
      type: "order",
      icon: CheckCircle,
      bg: "bg-green-50",
      color: "text-green-600",
      isUnread: false
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-[22px] font-black text-gray-900 tracking-tight">Notifications</h2>
        <button className="text-[14px] font-black text-[#2D4D31] hover:underline">Mark all as read</button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        {notifications.map((notif, i) => (
          <div 
            key={notif.id} 
            className={`p-6 flex items-start gap-5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-all cursor-pointer relative group ${
              notif.isUnread ? 'bg-blue-50/30' : ''
            }`}
          >
            {notif.isUnread && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full" />
            )}
            
            <div className={`w-12 h-12 ${notif.bg} ${notif.color} rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}>
              <notif.icon size={24} weight="bold" />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`text-[16px] font-black tracking-tight ${notif.isUnread ? 'text-gray-900' : 'text-gray-700'}`}>
                  {notif.title}
                </h3>
                <span className="text-[12px] font-bold text-gray-400 whitespace-nowrap">{notif.time}</span>
              </div>
              <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
                {notif.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-4 text-[14px] font-black text-gray-400 hover:text-gray-900 transition-colors">
        View Older Notifications
      </button>
    </div>
  );
}
