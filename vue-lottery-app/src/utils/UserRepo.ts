import { UserData } from '@/types/UserData'
import { ref, watch } from 'vue'

export class UserRepo {
  private static _users = ref<UserData[]>([])
  public static Init(): void {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers && storedUsers.length > 0) {
      const userList = JSON.parse(storedUsers)
      userList.forEach((user: UserData) => (user.dob = new Date(user.dob)))
      UserRepo.setData(userList)
    }
    watch(
      this._users,
      (newUsers) => {
        localStorage.setItem('users', JSON.stringify(newUsers))
      },
      { deep: true }
    )
  }
  public static SeedData(): UserData[] {
    const defaultUsers = [
      new UserData('Amsterdam', new Date('1990-10-01'), 'email1@domain.com', '(063) 555-5555'),
      new UserData('Washington', new Date('1985-02-05'), 'email2@domain.com', '(063) 555-5555'),
      new UserData('Sydney', new Date('1987-08-15'), 'email3@domain.com', '(063) 555-5555')
    ]
    const users = localStorage.getItem('users')
    let usersList = users ? JSON.parse(users) : defaultUsers
    if (usersList.length == 0) usersList = defaultUsers

    usersList.forEach((user: UserData) => (user.dob = new Date(user.dob)))
    return usersList
  }
  public static setData(users: UserData[]): void {
    this._users.value = users
  }
  public static get Users() {
    return this._users
  }
  public static getUsers(): UserData[] {
    return this._users.value
  }
  public static addUser(user: UserData): void {
    this._users.value.push(user)
  }
  public static removeUser(user: UserData): void {
    const index = this._users.value.findIndex((u) => u.id === user.id)
    if (index !== -1) {
      this._users.value.splice(index, 1)
    }
  }
  public static getWinners(): UserData[] {
    return this._users.value.filter((u) => u.isWinner)
  }
  public static updateUser(user: UserData): void {
    const index = this._users.value.findIndex((u) => u.id === user.id)
    if (index !== -1) {
      this._users.value[index] = user
    }
  }
  public static sortUsersByName(): void {
    this._users.value.sort((a, b) => a.name.localeCompare(b.name))
  }
  public static sortUsersByDob(): void {
    this._users.value.sort((a, b) => a.dob.getTime() - b.dob.getTime())
  }
  public static filterUsersByName(name: string): UserData[] {
    return this._users.value.filter((u) => u.name.toLowerCase().includes(name.toLowerCase()))
  }
}
