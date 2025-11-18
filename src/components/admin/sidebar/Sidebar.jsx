import React, { useEffect, useRef, useState } from 'react';
import { adminNav } from '../../../constants/sidebarData';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { useSidebar } from '../../../context/SidebarContext';
import { RxCross2 } from 'react-icons/rx';
import Logo from '../../../assets/dashboard/logo.png'

const Sidebar = () => {

  const location = useLocation().pathname.split("/")[3];
  const [showLogout, setshowLogout] = useState(false)
  const { isNavOpen, toggleNav } = useSidebar();
  const sidebarRef = useRef(null);
  const nav = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleNav();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleNav]);



  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`lg:block hidden w-[15rem] h-[100vh] bg-[#010080] relative border-r border-r-[#D8D8D880]`}>

        <div className="flex items-center justify-center p-5 -ml-3">
          <img src={Logo} alt="" className='h-20' />
        </div>


        <div className='mt-8'>
          {adminNav?.map((i) => (
            <Link to={`/admin/dashboard/${i.link}`} key={i.id} className={`flex ${location == i.link && "bg-[#8181f5]"} px-5 p-2  items-center gap-x-3 mb-2 cursor-pointer`}>
              <div>{i.icon}</div>
              <p className={`text-sm ${location == i.link ? "text-[#fff]" : "text-[#8F8F8F]"}`}>{i.name}</p>
            </Link>
          ))}
          <div onClick={() => nav("/login")} className='p-2 mx-3 flex items-center gap-x-3 '>
            <IoLogOut className='text-[#FF3B30] cursor-pointer' />
            <p className='text-[#8F8F8F] text-sm'>Log out</p>
          </div>
        </div>


      </div>

      {/* Mobile Sidebar */}
      {
        isNavOpen && (
          <div className={`lg:hidden block w-[14rem] z-50 h-[100vh] bg-[#010080] fixed top-0 left-0 transition-all duration-300 ease-in-out ${isNavOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`} ref={sidebarRef}>

            <div className="flex items-center justify-center p-5 -ml-3">
              <img src={Logo} alt="" className='h-20' />
            </div>



            <div className='mt-8'>
              {adminNav?.map((i) => (
                <Link to={`/admin/dashboard/${i.link}`} key={i.id} className={`flex ${location == i.link && "bg-[#8181f5]"} px-5 p-2  items-center gap-x-3 mb-2 cursor-pointer`}>
                  <div>{i.icon}</div>
                  <p className={`text-sm ${location == i.link ? "text-[#fff]" : "text-[#8F8F8F]"}`}>{i.name}</p>
                </Link>
              ))}
              <div onClick={() => nav("/login")} className='p-2 mx-3 flex items-center gap-x-3 '>
                <IoLogOut className='text-[#FF3B30] cursor-pointer' />
                <p className='text-[#8F8F8F] text-sm'>Log out</p>
              </div>
            </div>


          </div>
        )}
    </>
  );
};

export default Sidebar;
