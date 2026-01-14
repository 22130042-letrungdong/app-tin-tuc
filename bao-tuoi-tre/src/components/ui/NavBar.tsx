import { House, ChevronDown } from 'lucide-react'

const categories = [
              'VIDEO',
              'THỜI SỰ',
              'THẾ GIỚI',
              'PHÁP LUẬT',
              'KINH DOANH',
              'CÔNG NGHỆ',
              'XE',
              'DU LỊCH',
              'NHỊP SỐNG TRẺ',
              'VĂN HÓA',
              'GIẢI TRÍ',
              'THỂ THAO',
              'GIÁO DỤC',
              'NHÀ ĐẤT',
              'SỨC KHỎE',
              'GIẢI THẬT',
              'BẠN ĐỌC',
              'CẦN BIẾT',
            ]


function NavBar() {
  return (
    <div className='bg-white text-black font-semibold text-xs px-14 py-1.5'>
      <ul className='flex items-center justify-between'>
        <li>
          <a href=""><House color='red'/></a>
          
        </li>
        {categories.map((item) => (
          <li key={item}>
            <a className='hover:text-red-600' href="">{item}</a>
          </li>
        ))}

        <li>
          <ChevronDown />
        </li>
      </ul>

    </div>
  )
}

export default NavBar