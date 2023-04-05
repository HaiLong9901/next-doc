import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import BookIcon from '@mui/icons-material/Book'
import { IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
type Props = {}

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})
function CreateDoc({}: Props) {
  const [value, setValue] = useState('')
  const router = useRouter()
  return (
    <div className="w-screen">
      <div className="w-full sticky px-5 flex py-2">
        <div className="flex">
          <Tooltip title="Document home page">
            <IconButton onClick={() => router.push('/')}>
              <BookIcon className=" text-blueColor" fontSize="large" />
            </IconButton>
          </Tooltip>
          <div>
            <div>
              <input
                type="text"
                className=" w-[250px] text-lg text-primaryColor font-bold outline-none border-solid border-[2px] hover:border-gray-400 focus:border-gray-400 border-transparent px-1"
                value="The document has no title"
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
      </div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  )
}

export default CreateDoc
