import React from 'react'
import { TrendingUp, Phone, Newspaper, Megaphone, ClockArrowUp } from 'lucide-react';

function BreakingNewsBar() {
  return (
  <div className="bg-white border-y border-gray-200 py-1.5 font-sans">
      <div className="mx-4 md:mx-14 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4 overflow-hidden flex-1">
            <a href="#" 
              className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-2 rounded-sm font-bold text-[14px] whitespace-nowrap shadow-sm">
                <ClockArrowUp className="w-4 h-4 text-red-600" />
                <span>Tin mới nhất</span>
            </a>
            
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <TrendingUp className="w-6 h-6 text-red-600 shrink-0" />
                <div className="flex gap-2 text-[16px] font-medium text-gray-700">
                    <a href="#" className="hover:text-red-700 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">
                        Đại hội Đảng toàn quốc lần thứ 14
                    </a>
                    <a href="#" className="hover:text-red-700 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">
                        Mái ấm ngày xuân
                    </a>
                    <a href="#" className="hover:text-red-700 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">
                        Chiến dịch Quang Trung
                    </a>
                </div>
            </div>
        </div>
        
        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-0 text-[14px] font-medium text-gray-600 whitespace-nowrap border border-gray-200 rounded-sm overflow-hidden ml-4 bg-gray-50 px-2">
            <a href="#" className="flex items-center gap-1.5 px-3 py-2 hover:text-red-600 hover:bg-white border-r border-gray-200 transition-colors">
                <Phone className="w-3 h-3" /> Hotline
            </a>
            <a href="#" className="flex items-center gap-1.5 px-3 py-2 hover:text-red-600 hover:bg-white border-r border-gray-200 transition-colors">
                <Newspaper className="w-3 h-3" /> Đặt báo
            </a>
            <a href="#" className="flex items-center gap-1.5 px-3 py-2 hover:text-red-600 hover:bg-white text-gray-500 transition-colors pl-2">
                <Megaphone className="w-3 h-3 transform -scale-x-100" /> Quảng cáo
            </a>
        </div>
      </div>
    </div>
  )
}

export default BreakingNewsBar



