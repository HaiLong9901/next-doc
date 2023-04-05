import React, { useRef, useState, useEffect } from 'react'
import BookIcon from '@mui/icons-material/Book'
import { IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { auth, db } from '@/configs/firebase'
import Link from 'next/link'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import { doc, updateDoc } from 'firebase/firestore'

type Props = {
  documentTitle: string
}

const DocumentHeader = ({ documentTitle }: Props) => {
  const [user, _loading, _error] = useAuthState(auth)
  const router = useRouter()
  const [openLogOutBox, setOpenLogOutBox] = useState<boolean>(false)
  const logOutBoxRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const route = useRouter()
  const [title, setTile] = useState<string>(documentTitle)
  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }
  const handleClickOutSideSideBar = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!logOutBoxRef.current?.contains(target) && !avatarRef.current?.contains(target)) {
      setOpenLogOutBox(false)
    }
  }
  const handleChangeTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTile(e.target.value)
    const { id } = route.query
    const updatedDoc = doc(db, 'documents', id as string)
    await updateDoc(updatedDoc, {
      title: !title.length ? 'The document has no title' : title,
    })
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutSideSideBar)

    return () => {
      document.removeEventListener('click', handleClickOutSideSideBar)
    }
  }, [])
  return (
    <div className="w-full sticky z-[1000]">
      <div className="px-5 flex py-2 justify-between items-center">
        <div className="flex">
          <div>
            <Tooltip title="Document home page">
              <IconButton onClick={() => router.push('/')}>
                <BookIcon className=" text-blueColor" fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <div>
              <input
                type="text"
                className=" w-[250px] text-lg text-primaryColor font-bold outline-none border-solid border-[2px] hover:border-gray-400 focus:border-gray-400 border-transparent px-1"
                value={title}
                onChange={handleChangeTitle}
              />
            </div>
            <div className="flex">
              <div className=" text-base text-primaryColor px-3 cursor-pointer hover:bg-secondaryColor rounded-sm">
                File
              </div>
              <div className=" text-base text-primaryColor px-3 cursor-pointer hover:bg-secondaryColor rounded-sm">
                Edit
              </div>
              <div className=" text-base text-primaryColor px-3 cursor-pointer hover:bg-secondaryColor rounded-sm">
                View
              </div>
              <div className=" text-base text-primaryColor px-3 cursor-pointer hover:bg-secondaryColor rounded-sm">
                Insert
              </div>
              <div className=" text-base text-primaryColor px-3 cursor-pointer hover:bg-secondaryColor rounded-sm">
                Format
              </div>
              <div className=" text-base text-primaryColor px-3 cursor-pointer hover:bg-secondaryColor rounded-sm">
                Tool
              </div>
              <div className=" text-base text-primaryColor px-3 cursor-pointer hover:bg-secondaryColor rounded-sm">
                Help
              </div>
            </div>
          </div>
        </div>
        <div>
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
        ref={logOutBoxRef}
        className={
          openLogOutBox
            ? 'absolute bg-[rgba(243,246,253,255)] py-2 w-[350px] rounded-3xl flex flex-col items-center right-5 shadow-boxShadowLogout scale-100 duration-150 ease-in-out opacity-100'
            : 'absolute bg-[rgba(243,246,253,255)] py-2 w-[350px] rounded-3xl flex flex-col items-center right-5 shadow-boxShadowLogout scale-50 duration-150 ease-in-out opacity-0'
        }
        // className="absolute bg-[rgba(243,246,253,255)] py-2 w-[350px] rounded-3xl flex flex-col items-center right-5 shadow-boxShadowLogout translate-x-0 translate-y-0 scale-100 duration-150 ease-in-out"
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

export default DocumentHeader
