import { Timestamp } from 'firebase/firestore'
export interface Document {
  title: string
  value: string
  user: string
  mutable: boolean
  updatedAt: string
  share: string[]
}
