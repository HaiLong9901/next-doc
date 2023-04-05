import React, { useEffect, useState, useRef } from 'react'
import { Document } from '@/types'
import { IconButton, Tooltip } from '@mui/material'
import BookIcon from '@mui/icons-material/Book'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

type Props = {
  document: Document
}

const DocumentCard = (props: Props) => {
  const moreBtnRef = useRef<HTMLDivElement>(null)
  const [optionBox, setOptionBox] = useState<Boolean>(false)
  const handleClickOutSideOptionBox = (event: MouseEvent) => {
    console.log('click')
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutSideOptionBox)

    return () => {
      document.removeEventListener('click', handleClickOutSideOptionBox)
    }
  }, [])

  return (
    <div
      className=" w-[210px] h-[340px] border-solid bg-white border-secondaryColor border-[1px] hover:border-blueColor rounded-sm cursor-pointer relative"
      onContextMenu={(e) => {
        e.preventDefault()
        console.log('Right click')
      }}
    >
      <div className="w-full h-[260px] bg-gray-300"></div>
      <div className=" py-2 px-4">
        <h3 className="text-base text-primaryColor">{props.document.title}</h3>
        <div className="flex justify-between items-center">
          <div>
            <BookIcon className="text-blueColor" />
            <span className=" text-sm text-gray-400">{props.document.updatedAt}</span>
          </div>
          <div className="translate-x-[20%]">
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="absolute w-[350px] shadow-boxShadowInput z-[2000] top-0 bg-white rounded-lg">
        <div className="flex text-primaryColor gap-5 py-3 hover:bg-gray-100 px-4">
          <TextFieldsIcon /> <span className="text-base">Change document title</span>
        </div>
        <div className="flex text-primaryColor gap-5 py-3 hover:bg-gray-100 px-4">
          <DeleteOutlineIcon /> <span className="text-base">Delete document</span>
        </div>
        <div className="flex text-primaryColor gap-5 py-3 hover:bg-gray-100 px-4">
          <OpenInNewIcon /> <span className="text-base">Open in new tab</span>
        </div>
      </div>
    </div>
  )
}

export default DocumentCard
