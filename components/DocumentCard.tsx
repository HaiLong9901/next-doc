import React, { useEffect, useState, useRef, RefObject } from 'react'
import { Document } from '@/types'
import { IconButton, Tooltip } from '@mui/material'
import BookIcon from '@mui/icons-material/Book'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { convertFirebaseTimestamp, getDate } from '@/utils/ConvertTime'
import OptionBox from './OptionBox'
import { documentId } from 'firebase/firestore'

type Props = {
  document: Document
  documentId: string
  outsideRef?: RefObject<HTMLDivElement>
}

const DocumentCard = (props: Props) => {
  const route = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const [optionBox, setOptionBox] = useState<boolean>(false)
  const { outsideRef } = props
  const handleClickOutSideOptionBox = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (outsideRef?.current?.contains(target) && !cardRef.current?.contains(target)) {
      setOptionBox(false)
    }
  }
  const handleOpenOptionBox = (event: React.MouseEvent) => {
    event.preventDefault()
    setOptionBox((prev) => !prev)
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
      onContextMenu={handleOpenOptionBox}
      ref={cardRef}
    >
      <div
        className="w-full h-[260px] bg-gradient rounded-sm"
        onClick={() => route.push(`/document/${props.documentId}`)}
      ></div>
      <div className=" py-2 px-4">
        <h3 className="text-base text-primaryColor">
          {props.document.title.length > 20 ? props.document.title.slice(0, 19).concat('...') : props.document.title}
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <BookIcon className="text-blueColor" />
            <span className=" text-sm text-gray-400">{getDate(props.document.updatedAt)}</span>
          </div>
          <div className="translate-x-[20%]" onClick={handleOpenOptionBox}>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <OptionBox
        listType={false}
        isOpen={optionBox}
        setIsOpen={setOptionBox}
        docId={props.documentId}
        docTitle={props.document.title}
      />
    </div>
  )
}

export default DocumentCard
