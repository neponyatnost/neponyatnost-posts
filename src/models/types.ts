export interface IPost {
  userId: number
  id: number
  title: string
  body: string
}

export interface IComment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface IUser {
  id: number
  name: string
  username: string
  email: string
  address: IUserAddress
  phone: string
  website: string
  company: IUserCompany
}

export interface IUserAddress {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: IUserGeo
}

export interface IUserGeo {
  lat: string
  lng: string
}

export interface IUserCompany {
  name: string
  catchPhrase: string
  bs: string
}
