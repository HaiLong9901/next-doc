// import Button from '@mui/material/Button'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Tooltip, IconButton, Avatar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import BookIcon from '@mui/icons-material/Book'
import SearchIcon from '@mui/icons-material/Search'
import AppsIcon from '@mui/icons-material/Apps'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/configs/firebase'
import { signOut } from 'firebase/auth'
type Props = {}

const Header = (props: Props) => {
  const [user, _loading, _error] = useAuthState(auth)
  const [openSideBar, setOpenSideBar] = useState<boolean>(false)
  const [openLogOutBox, setOpenLogOutBox] = useState<boolean>(false)
  const sideBarRef = useRef<HTMLDivElement>(null)
  const logOutBoxRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLDivElement>(null)
  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }
  const handleClickOutSideSideBar = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!sideBarRef.current?.contains(target) && !menuButtonRef.current?.contains(target)) {
      setOpenSideBar(false)
    }
    if (!logOutBoxRef.current?.contains(target) && !avatarRef.current?.contains(target)) {
      setOpenLogOutBox(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutSideSideBar)

    return () => {
      document.removeEventListener('click', handleClickOutSideSideBar)
    }
  }, [])

  return (
    <div className=" sticky w-screen z-50">
      <div className="flex justify-between w-full px-5 mx-auto py-2">
        <div className="flex items-center gap-1" onClick={() => setOpenSideBar(true)} ref={menuButtonRef}>
          <Tooltip title="Menu">
            <IconButton>
              <MenuIcon className=" text-primaryColor" />
            </IconButton>
          </Tooltip>
          <BookIcon className=" text-blueColor" fontSize="large" />
          <h2 className=" text-2xl text-primaryColor">Next Doc</h2>
        </div>

        <div className="flex items-center justify-center relative w-[50%]">
          <input
            type="text"
            placeholder="search"
            className=" w-full rounded-lg outline-none border-none bg-secondaryColor py-3 pl-12 text-base text-primaryColor focus:bg-white focus:shadow-boxShadowInput"
          />
          <div className="absolute top-[50%] left-1 translate-y-[-50%]">
            <Tooltip title="Search">
              <IconButton>
                <SearchIcon className=" text-primaryColor" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <Tooltip title="Apps">
            <IconButton>
              <AppsIcon className=" text-primaryColor" />
            </IconButton>
          </Tooltip>
          <Tooltip title="DoHaiLong">
            <div
              ref={avatarRef}
              className="w-10 h-10 flex justify-center items-center"
              onClick={() => setOpenLogOutBox(true)}
            >
              <img
                src={user?.photoURL || undefined}
                alt={user?.email || undefined}
                className="w-8 h-8 rounded-full object-cover hover:border-solid hover:border-gray-200 hover:border-4 box-content cursor-pointer"
              />
            </div>
          </Tooltip>
        </div>
      </div>
      <div
        ref={sideBarRef}
        className={
          openSideBar
            ? ' absolute z-20 top-0 w-[280px] bg-white shadow-boxShadowTaskBar h-screen flex flex-col justify-between translate-x-0 duration-150 ease-in-out'
            : 'absolute z-20 top-0 w-[280px] bg-white shadow-boxShadowTaskBar h-screen flex flex-col justify-between translate-x-[-100%] duration-150 ease-in-out'
        }
      >
        <div>
          <div className="flex justify-center py-5 border-solid border-secondaryColor border-b-[2px] gap-2 items-center">
            <span className=" text-xl font-bold text-blueColor">HaiLong9901</span>
            <h2 className=" text-2xl text-primaryColor">Next Doc</h2>
          </div>
          <div className="py-3 pr-3 border-solid border-secondaryColor border-b-[2px]">
            <div className=" rounded-r-full hover:bg-secondaryColor flex items-center py-2">
              <Link href="#" className="flex w-full ml-5 gap-5">
                <BookIcon className=" text-blueColor" fontSize="medium" />
                <h3 className=" text-sm font-bold text-primaryColor">Document</h3>
              </Link>
            </div>
            <div className=" rounded-r-full hover:bg-secondaryColor flex items-center py-2">
              <Link href="#" className="flex w-full ml-5 gap-5">
                <BookIcon className=" text-green-500" fontSize="medium" />
                <h3 className=" text-sm font-bold text-primaryColor">Sheets</h3>
              </Link>
            </div>
            <div className=" rounded-r-full hover:bg-secondaryColor flex items-center py-2">
              <Link href="#" className="flex w-full ml-5 gap-5">
                <BookIcon className=" text-yellow-500" fontSize="medium" />
                <h3 className=" text-sm font-bold text-primaryColor">Slides</h3>
              </Link>
            </div>
            <div className=" rounded-r-full hover:bg-secondaryColor flex items-center py-2">
              <Link href="#" className="flex w-full ml-5 gap-5">
                <BookIcon className=" text-purple-500" fontSize="medium" />
                <h3 className=" text-sm font-bold text-primaryColor">Form</h3>
              </Link>
            </div>
          </div>
          <div className="py-3 pr-3 border-solid border-secondaryColor border-b-[2px]">
            <div className=" rounded-r-full hover:bg-secondaryColor flex items-center py-2">
              <Link href="#" className="flex w-full ml-5 gap-5">
                <SettingsIcon className=" text-primaryColor" fontSize="medium" />
                <h3 className=" text-sm font-bold text-primaryColor">Setting</h3>
              </Link>
            </div>
            <div className=" rounded-r-full hover:bg-secondaryColor flex items-center py-2">
              <Link href="#" className="flex w-full ml-5 gap-5">
                <HelpOutlineIcon className=" text-primaryColor" fontSize="medium" />
                <h3 className=" text-sm font-bold text-primaryColor">Help and Feedback</h3>
              </Link>
            </div>
          </div>
          <div className="py-3 pr-3 border-solid border-secondaryColor border-b-[2px]">
            <div className=" rounded-r-full hover:bg-secondaryColor flex items-center py-2">
              <Link href="#" className="flex w-full ml-5 gap-5">
                <AddToDriveIcon className=" text-orange-500" fontSize="medium" />
                <h3 className=" text-sm font-bold text-primaryColor">Drive</h3>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-3 gap-3 items-center">
          <Link href="#" className=" text-sm text-primaryColor hover:text-gray-800">
            Privacy Policy
          </Link>
          .
          <Link href="#" className=" text-sm text-primaryColor hover:text-gray-800">
            Terms of Service
          </Link>
        </div>
      </div>
      <div
        ref={logOutBoxRef}
        className={
          openLogOutBox
            ? 'absolute bg-[rgba(243,246,253,255)] py-2 w-[350px] rounded-3xl flex flex-col items-center right-5 shadow-boxShadowLogout scale-100 duration-150 ease-in-out opacity-100'
            : 'absolute bg-[rgba(243,246,253,255)] py-2 w-[350px] rounded-3xl flex flex-col items-center right-5 shadow-boxShadowLogout scale-50 duration-150 ease-in-out opacity-0'
        }
        //className="absolute bg-[rgba(243,246,253,255)] py-2 w-[350px] rounded-3xl flex flex-col items-center right-5 shadow-boxShadowLogout translate-x-0 translate-y-0 scale-100 duration-150 ease-in-out"
      >
        <div className="w-[calc(100%_-_16px)] bg-white rounded-3xl pb-5">
          <div className="w-full">
            <div className=" absolute w-[85px] h-[85px] flex justify-center items-center">
              <img
                src={user?.photoURL || undefined}
                alt={user?.email || undefined}
                className="w-[65px] h-[65px] rounded-full object-cover"
              />
              <div className="absolute bg-white rounded-full bottom-0 right-0">
                <IconButton size="small">
                  <CameraAltOutlinedIcon />
                </IconButton>
              </div>
            </div>
            <div className="pl-[90px] py-5">
              <h3 className="text-base text-primaryColor font-bold">{user?.displayName}</h3>
              <span className=" text-sm text-gray-400">{user?.email}</span>
            </div>
          </div>
          <div className="w-full flex pl-[90px] pr-5">
            <button className=" flex-grow py-1 px-3 border-solid border-primaryColor border-[1px] rounded-xl hover:bg-secondaryColor ease-in-out">
              <Link
                href="https://myaccount.google.com/?hl=vi&utm_source=OGB&utm_medium=act"
                className=" break-words text-primaryColor text-base"
                target="_blank"
              >
                Manage your google account
              </Link>
            </button>
          </div>
        </div>
        <button
          onClick={logout}
          className=" w-full flex px-3 py-3 text-primaryColor gap-10 hover:bg-[rgba(226,235,250,255)] justify-center"
        >
          <LoginOutlinedIcon />
          Logout
        </button>
        <div className="flex w-full justify-center py-3 gap-3 items-center border-solid border-secondaryColor border-t-[2px]">
          <Link href="#" className=" text-sm text-primaryColor hover:text-gray-800">
            Privacy Policy
          </Link>
          .
          <Link href="#" className=" text-sm text-primaryColor hover:text-gray-800">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
