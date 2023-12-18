
const tabs = [{name:"Dashboard",link:"/admin/dashboard"},
{name:"Thông tin cá nhân",link:"/admin/profile"},
{name:"Quản lý cửa hàng",link:"/admin/store"},
{name:"Quản lý category",link:"/admin/category"},
{name:"Quản lý sản phẩm",link:"/admin/product"},
{name:"Quản lý người dùng",link:"/admin/user"},
{name:"Quản lý voucher",link:"/admin/voucher"},
]

const Sidebar = () => {
  return (
    <div><aside id="cta-button-sidebar" className="   w-[250px] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div className="h-full px-3 py-4 overflow-y-auto  bg-gray-800">
        <img src="https://th.bing.com/th/id/OIP.afQdiNPi7rhMZnP6xqoyLwHaHa?rs=1&pid=ImgDetMain" alt="" className="w-40 h-40 m-auto mb-10" />
      <ul className="space-y-10 font-medium">
        {tabs.map((item)=>{
            return(<li>
                <a href={item.link} className="flex items-center p-2   rounded-lg text-white  hover:bg-gray-700 group">
                 
                  <span className="ms-3">{item.name}</span>
                </a>
              </li>)
        })}
        
      </ul>
      <a href="#" className="flex items-center p-2  rounded-lg text-white absolute bottom-10 hover:bg-gray-700 group">
                
                  <span className="ms-3">Đăng xuất</span>
                </a>
    </div></aside> </div>

  )

}

export default Sidebar