import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
const Editor = dynamic(() => import('react-draft-wysiwyg').then((module) => module.Editor), {
  ssr: false,
})
//
import { auth, db } from '@/configs/firebase'
import DocumentHeader from '@/components/DocumentHeader'
import { GetServerSideProps } from 'next'
import { getDoc, doc, Timestamp, updateDoc } from 'firebase/firestore'
import { Document } from '../../types'
import { convertDocument, convertFirebaseTimestamp } from '@/utils/ConvertTime'
import { Router, useRouter } from 'next/router'
// import { useScreenshot } from 'use-react-screenshot'

type Props = {
  document: Document
}

function Document({ document }: Props) {
  const route = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const { value } = document
  const editor = convertFromRaw(JSON.parse(value))
  const [editorState, setEditorState] = useState(EditorState.createWithContent(editor))
  const onEditorStateChange = async (editorState: EditorState) => {
    setEditorState(editorState)
    const { id } = route.query
    const updatedDoc = doc(db, 'documents', id as string)

    await updateDoc(updatedDoc, {
      value: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    })
  }
  useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true))
    Router.events.on('routeChangeComplete', () => setLoading(false))
    Router.events.on('routeChangeError', () => setLoading(false))
    return () => {
      Router.events.off('routeChangeStart', () => setLoading(true))
      Router.events.off('routeChangeComplete', () => setLoading(false))
      Router.events.off('routeChangeError', () => setLoading(false))
    }
  }, [Router.events])
  return (
    <>
      {loading ? (
        <div>Loading Document</div>
      ) : (
        <div className="w-full">
          <DocumentHeader documentTitle={document.title} />
          <div className="bg-documentBg min-h-screen px-5">
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                fontSize: {
                  inDropdown: true,
                },
              }}
              ariaExpanded="true"
              wrapperClassName="wrapper-class flex flex-col items-center"
              editorClassName="editor-class w-[55%] bg-white min-h-[1000px] border-solid border-[#e4e5e6] border-[1px] my-5 p-10"
              toolbarClassName="toolbar-class w-full sticky"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Document

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async (context) => {
  const documentId = context.params?.id
  const documentRef = doc(db, 'documents', documentId as string)
  const documentSnapshot = await getDoc(documentRef)
  const document = convertDocument(documentSnapshot)
  return {
    props: {
      document: document,
    },
  }
}
