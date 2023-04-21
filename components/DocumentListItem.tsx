import React, { useState, useRef, useEffect, RefObject } from 'react'
import BookIcon from '@mui/icons-material/Book'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, Tooltip } from '@mui/material'
import OptionBox from './OptionBox'
import { Document } from '@/types'
import { useRouter } from 'next/router'
type Props = {
  documentData: Document
  documentId: string
  outsideRef?: RefObject<HTMLDivElement>
}

function DocumentListItem(props: Props) {
  const route = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const [optionBox, setOptionBox] = useState<boolean>(false)
  const { outsideRef, documentData, documentId } = props
  const handleClickOutSideOptionBox = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (outsideRef?.current?.contains(target) && !cardRef.current?.contains(target)) {
      setOptionBox(false)
    }
  }
  const handleOpenDoc = () => {
    route.push(`/document/${documentId}`)
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutSideOptionBox)

    return () => {
      document.removeEventListener('click', handleClickOutSideOptionBox)
    }
  }, [])
  return (
    <div
      className="w-full relative flex items-center py-2 hover:bg-hoverBg px-2 hover:rounded-full border-borderColor border-solid border-b-[1px] hover:border-none cursor-pointer"
      ref={cardRef}
    >
      <div className="w-[5%]" onClick={handleOpenDoc}>
        <BookIcon className=" text-blueColor" />
      </div>
      <div className="w-[50%]" onClick={handleOpenDoc}>
        {documentData.title}
      </div>
      <div className="w-[20%] text-base text-gray-400" onClick={handleOpenDoc}>
        {documentData.user}
      </div>
      <div className="w-[20%] text-base text-gray-400" onClick={handleOpenDoc}>
        {documentData.updatedAt}
      </div>
      <div className="w-[5%]">
        <IconButton onClick={() => setOptionBox((prev) => !prev)}>
          <MoreVertIcon />
        </IconButton>
      </div>
      <OptionBox
        listType={true}
        isOpen={optionBox}
        setIsOpen={setOptionBox}
        docTitle={documentData.title}
        docId={documentId}
      />
    </div>
  )
}

export default DocumentListItem
