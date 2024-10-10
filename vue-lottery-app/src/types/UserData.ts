export class UserData {
  private static _idCounter: number = 1
  id: number
  name: string
  dob: Date
  email: string
  phone: string

  constructor(name: string, dob: Date, email: string, phone: string) {
    this.id = UserData._idCounter++
    this.name = name
    this.dob = dob
    this.email = email
    this.phone = phone
    console.log('New user created with id: ' + this.id)
  }
}
