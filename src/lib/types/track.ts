export interface Track {
  _id: string
  id?: string
  name: string
  price: number
  instructor: string
  duration: string
  image: string
  description: string
  admin: {
    _id: string
    firstName: string
    lastName: string
    email: string
    role: string
    contact: string
    isVerified: boolean
    lastLogin: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  courses: {
    _id: string
    admin: string
    track: string
    title: string
    image: string
    description: string
    createdAt: string
    updatedAt: string
    __v: number
  }[]
  ratings: any[]
  createdAt: string
  updatedAt: string
  __v: number
}
