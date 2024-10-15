export class UserData {
  // private static _idCounter: number = 0
  id: string
  name: string
  dob: Date
  email: string
  phone: string
  isWinner: boolean = false

  constructor(name: string, dob: Date, email: string, phone: string) {
    this.id = Math.random().toString(16).slice(2)
    this.name = name
    this.dob = dob
    this.email = email
    this.phone = phone
  }
}
