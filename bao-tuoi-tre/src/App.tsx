import Header from "./components/ui/Header"
import NavBar from "./components/ui/NavBar"
import Weather from "./components/ui/Weather"
import axios from "axios";
import { useEffect, useState } from "react";
import BreakingNewsBar from "./components/ui/BreakingNewsBar";
import Footer from "./components/ui/Footer";

const API_ENDPOINT = "http://localhost:3001/api/rss/tuoitre";

function App() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(API_ENDPOINT);
        setNews(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi lấy tin:", error);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);
  // Hàm helper để lấy ảnh từ description (vì RSS Tuổi Trẻ nhúng ảnh trong thẻ img của description)
  const extractImage = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const img = doc.querySelector('img');
    return img ? img.src : 'https://via.placeholder.com/600x400?text=No+Image';
  };

  // Hàm helper làm sạch description (bỏ thẻ HTML)
  const cleanDescription = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    return doc.body.textContent.split("TTO - ")[1] || doc.body.textContent;
  };

  const featuredNews = news[0]; // Tin lớn nhất (Spotlight)
  const subFeaturedNews = news.slice(1, 4); // 3 tin dưới tin chính
  const sidebarNews = news.slice(4, 10); // Tin cột trái
  const bottomNews = news.slice(10, 50); // Tin dưới
  return (
    <>
      <Header />
      <NavBar />
      <div className="grid grid-cols-12 gap-6 mx-14 my-4">
        {/* left column */}
        <div className="col-span-12 md:col-span-3 lg:col-span-2 space-y-6 md:border-r md:border-gray-200 md:pr-4">
          <Weather />
          <div className="space-y-4">
              {sidebarNews.map((item, idx) => (
                  <div key={idx} className="group cursor-pointer">
                      <h3 className="text-sm font-medium leading-5 group-hover:text-red-600 text-gray-800">
                          {item.title}
                      </h3>
                        <div className="h-px bg-gray-200 mt-2 w-full"></div>
                  </div>
              ))}
          </div>
        </div>
        {/* center column */}
        <div className="col-span-12 md:col-span-6 lg:col-span-7 md:border-r md:border-gray-200 md:px-4">
          {featuredNews && (
              <a href={featuredNews.link} className="mb-8 flex flex-col md:flex-row gap-4">
                  <div className="relative overflow-hidden rounded bg-gray-100 mb-3 md:mb-0 w-full md:w-2/3">
                      <img 
                          src={extractImage(featuredNews.description)} 
                          alt={featuredNews.title} 
                          className="w-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                      />
                  </div>
                  <div className="w-full md:w-1/3 flex flex-col justify-start">
                    <h1 className="text-2xl font-bold text-gray-900 cursor-pointer leading-tight mb-3 hover:text-red-600">
                        {featuredNews.title}
                    </h1>
                    <p className="text-gray-600 text-[16px] leading-relaxed text-">
                        {cleanDescription(featuredNews.description).substring(0, 150)}...
                    </p>
                  </div>
              </a>
          )}

          {/* sub featured */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 pt-6 mb-8">
              {subFeaturedNews.map((item, idx) => (
                  <a href={item.link} key={idx} className="flex flex-col gap-2">
                      <div className="overflow-hidden rounded h-32 bg-gray-100">
                            <img 
                              src={extractImage(item.description)} 
                              alt={item.title} 
                              className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                      </div>
                      <h3 className="text-[15px] font-bold leading-tight cursor-pointer hover:text-red-600">
                          {item.title}
                      </h3>
                  </a>
              ))}
          </div>
        </div>

        {/* right column */}
        <div className="col-span-12 md:col-span-3 lg:col-span-3 space-y-6 md:pl-4">
            <div className="bg-blue-50 border border-blue-100 p-2 text-center rounded">
                <div className="aspect-4/3 bg-gray-300 w-full flex items-center justify-center text-gray-500 mb-2">
                    [AD]
                </div>
            </div>
             <div className="bg-blue-50 border border-blue-100 p-2 text-center rounded">
                <div className="aspect-4/3 bg-blue-200 w-full flex items-center justify-center text-blue-600 mb-2">
                    [AD]
                </div>
            </div>
          </div>
      </div>   
      
      <BreakingNewsBar /> 
      
      <div className="grid grid-cols-12 gap-6 mx-14 my-4">
        <div className="col-span-12 md:col-span-6 lg:col-span-7 md:border-r md:border-gray-200">
          <div className="space-y-8">
          {bottomNews.map((item, idx) => (
            <div key={idx} className="border-b border-dotted border-gray-300 pb-8">
              <a href={item.link} className="flex flex-col md:flex-row gap-5 group">
                <div className="overflow-hidden rounded bg-gray-100 w-[260px] h-[160px] shrink-0">
                  <img 
                    src={extractImage(item.description)} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                </div>
                <div className="flex-1 flex flex-col justify-start pt-1">
                  <h3 className="text-[18px] font-medium text-gray-900 leading-tight mb-2 group-hover:text-red-700">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-relaxed line-clamp-3">
                    {cleanDescription(item.description).substring(0, 150)}...
                  </p>
                </div>
              </a>
            </div>
          ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-5 pl-0 md:pl-4">
          {/* <div className="mb-8">
            <div className="w-full aspect-4/1 bg-linear-to-r from-red-700 to-red-600 flex flex-col items-center justify-center text-center p-2 rounded shadow-sm relative overflow-hidden group cursor-pointer">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
               <div className="relative z-10">
                  <div className="flex justify-center gap-2 mb-1">
                      <span className="text-yellow-400 text-xl">★</span>
                      <span className="text-yellow-400 text-xl">★</span>
                  </div>
                  <h2 className="text-white font-bold uppercase text-lg leading-tight drop-shadow-md">
                    Đại hội Đảng toàn quốc lần thứ XIV
                  </h2>
               </div>
            </div>
          </div> */}

          {/* Featured Topics */}
          <div className="bg-blue-50 rounded-lg p-4 mb-8">
              <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2 uppercase">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    Chủ đề nổi bật <span className="text-red-600">Hôm nay</span>
                  </h4>
                  <a href="#" className="text-blue-600 text-xs font-semibold hover:underline">Tất cả</a>
              </div>
              <div className="grid grid-cols-2 gap-3">
                  {sidebarNews.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="bg-white rounded shadow-sm overflow-hidden group cursor-pointer h-full flex flex-col">
                          <div className="aspect-video overflow-hidden">
                              <img src={extractImage(item.description)} className="w-full h-full object-cover group-hover:scale-105 transition-transform"/>
                          </div>
                          <div className="p-2">
                              <h5 className="text-[13px] font-semibold text-gray-800 leading-snug line-clamp-3 group-hover:text-blue-600">
                                  {item.title}
                              </h5>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Videos Widget */}
          <div className="mb-6">
              <div className="flex justify-between items-center mb-4 border-l-4 border-red-600 pl-3">
                  <h3 className="font-bold text-lg text-gray-900 uppercase">Videos</h3>
                  <div className="hidden md:flex gap-3 text-xs text-gray-500 font-medium tracking-wide">
                      <a href="#" className="hover:text-red-600 transition-colors">Tin nóng</a>
                      <a href="#" className="hover:text-red-600 transition-colors">Thú vị</a>
                      <a href="#" className="hover:text-red-600 transition-colors">Khám phá</a>
                      <div className="flex gap-1 ml-2 text-gray-400">
                          <button className="hover:text-gray-800"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
                          <button className="hover:text-gray-800"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
                      </div>
                  </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  {subFeaturedNews.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="group cursor-pointer">
                          <div className="relative aspect-video rounded overflow-hidden mb-2">
                              <img src={extractImage(item.description)} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition flex items-center justify-center">
                                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                      <svg className="w-4 h-4 md:w-5 md:h-5 text-red-600 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/></svg>
                                  </div>
                                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">03:45</span>
                              </div>
                          </div>
                          <h4 className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-red-600 line-clamp-2">
                              {item.title}
                          </h4>
                      </div>
                  ))}
              </div>
          </div>
        </div>
      </div>
      

      <Footer />
    </>
  )
}

export default App