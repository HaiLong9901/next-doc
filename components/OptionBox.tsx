import React, { useState } from 'react'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { db } from '@/configs/firebase'
import { doc, updateDoc } from 'firebase/firestore'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  listType: boolean
  docId?: string
  docTitle?: string
}

const OptionBox = ({ isOpen, listType, docId, docTitle, setIsOpen }: Props) => {
  const [isOpenChangeTitleBox, setIsOpenChangeTitleBox] = useState<boolean>(false)
  const [isOpenDeleteBox, setIsOpenDeleteBox] = useState<boolean>(false)
  const [title, setTitle] = useState<string | undefined>(docTitle)
  const handleUpdateTitle = async () => {
    setIsOpenChangeTitleBox(false)
    const updatedDoc = doc(db, 'documents', docId as string)
    console.log(updatedDoc)
    await updateDoc(updatedDoc, {
      title: !title?.length ? 'The document has no title' : title,
    })
  }
  return (
    <>
      <div
        className={
          isOpen
            ? `absolute w-[350px] shadow-boxShadowInput z-[2000] ${
                listType ? 'top-[90%] right-0 translate-x-[20%]' : 'top-[98%] left-[20px]'
              } bg-white rounded-lg opacity-100 duration-150 ease-in-out overflow-hidden block`
            : `absolute w-[350px] shadow-boxShadowInput z-[2000] ${
                listType ? 'top-[90%] left-[0] translate-x-[20%]' : 'top-[98%] left-[20px]'
              } bg-white rounded-lg opacity-0 duration-150 ease-in-out hidden`
        }
      >
        <div className="flex text-primaryColor gap-5 py-3 hover:bg-gray-100 px-4">
          <TextFieldsIcon />{' '}
          <span
            className="text-base"
            onClick={() => {
              setIsOpen(false)
              setIsOpenChangeTitleBox(true)
            }}
          >
            Change document title
          </span>
        </div>
        <div className="flex text-primaryColor gap-5 py-3 hover:bg-gray-100 px-4">
          <DeleteOutlineIcon />{' '}
          <span className="text-base" onClick={() => setIsOpenDeleteBox(true)}>
            Delete document
          </span>
        </div>
        <Link
          href={`/document/${docId}`}
          target="_black"
          className="flex text-primaryColor gap-5 py-3 hover:bg-gray-100 px-4"
          onClick={() => setIsOpen(false)}
        >
          <OpenInNewIcon /> <span className="text-base">Open in new tab</span>
        </Link>
      </div>
      <div
        className={
          isOpenChangeTitleBox
            ? ' fixed bg-black/50 top-0 left-0 w-full h-[100vh] z-[5000] flex justify-center items-center opacity-100'
            : ' fixed bg-black/50 top-0 left-0 w-full h-[100vh] z-[5000] hidden opacity-0 duration-150 ease-in-out'
        }
      >
        <div className="bg-white w-[420px] h-[250px] rounded-xl p-10 flex flex-col justify-between">
          <h2 className=" text-primaryColor text-2xl">Change title</h2>
          <h3 className="text-primaryColor text-base">Please enter a new title for this document: </h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-blueColor border-solid border-[1px] rounded-md text-base outline-none p-1"
          />
          <div className="w-full flex gap-5 justify-end">
            <Button variant="outlined" onClick={() => setIsOpenChangeTitleBox(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdateTitle}>
              Ok
            </Button>
          </div>
        </div>
      </div>
      <div
        className={
          isOpenDeleteBox
            ? ' fixed bg-black/50 top-0 left-0 w-full h-[100vh] z-[5000] flex justify-center items-center opacity-100'
            : ' fixed bg-black/50 top-0 left-0 w-full h-[100vh] z-[5000] hidden opacity-0 duration-150 ease-in-out'
        }
        // className=" fixed bg-black/50 top-0 left-0 w-full h-[100vh] z-[5000] flex justify-center items-center opacity-100"
      >
        <div className="bg-white w-[420px] h-[250px] rounded-xl p-10 flex flex-col justify-between">
          <h2 className=" text-primaryColor text-2xl">Do you want to delete this document?</h2>
          <div className="w-full flex gap-5 justify-end">
            <Button variant="outlined" onClick={() => setIsOpenDeleteBox(false)}>
              Cancel
            </Button>
            <Button variant="contained">Ok</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default OptionBox
