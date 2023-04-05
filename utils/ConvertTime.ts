import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore'
import { Document } from '@/types'

export const convertFirebaseTimestamp = (time: Timestamp) => new Date(time.toDate().getTime()).toLocaleString()

export const convertDocument = (document: DocumentSnapshot<DocumentData>) =>
  ({
    ...document.data(),
    //   updatedAt: document ? convertDocument(document.data().createdtAt)
    updatedAt: convertFirebaseTimestamp(document.data()?.updatedAt),
  } as Document)
