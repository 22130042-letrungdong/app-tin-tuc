import { Podcast, SquarePlay, Lightbulb, PackageOpen, Search, CircleUserRound, MessageCircleQuestionMark } from "lucide-react";

export default function HomeHeader() {
    return (
        <div className="flex items-center justify-between bg-red-700 py-2 px-10">
            <div>
                <a href=""><img src="/icon/logo.png" alt="logo" width={120} height={40}/></a>
            </div>
            <div className="flex text-white items-center gap-6">
                <ul className="flex gap-5" >
                    <li>
                        <a className="flex items-center font-semibold text-sm"
                            href="#">
                            <Podcast className="opacity-60 mr-1" width={18} height={18}/>Podcast
                        </a>
                    </li>
                    <li>
                        <a className="flex items-center font-semibold text-sm"
                            href="#">
                            <SquarePlay className="opacity-60 mr-1" width={18} height={18}/>Youtube
                        </a>
                    </li>
                    <li>
                        <a className="flex items-center font-semibold text-sm"
                            href="#">
                            <Lightbulb className="opacity-60 mr-1" width={18} height={18}/>Cần biết
                        </a>
                    </li>
                    <li>
                        <a className="flex items-center font-semibold text-sm"
                            href="#">
                            <PackageOpen className="opacity-60 mr-1" width={18} height={18}/>Rao vặt
                        </a>
                    </li>
                </ul>
                <div className="flex items-center gap-6">

                    <a href="">
                        <Search width={20} height={20}/>
                    </a>

                    <a href="">
                        <CircleUserRound width={20} height={20}/>
                    </a>
                    
                    <a className="text-sm font-semibold bg-blue-500 px-5 py-1 rounded-sm" href="">
                        Đăng kí Tuổi Trẻ Sao
                    </a>

                    <a href="">
                        <MessageCircleQuestionMark width={20} height={20} />
                    </a>
                    
                </div>
            </div>
        </div>
    );
}
