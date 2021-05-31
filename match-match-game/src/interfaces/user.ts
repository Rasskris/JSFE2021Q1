interface MapUser {
  [key: string]: string | number | undefined,
}

export default interface User extends MapUser {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  avatar: string,
  score?: number,
}