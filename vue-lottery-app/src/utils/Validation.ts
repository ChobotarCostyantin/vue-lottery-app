import { UserRepo } from '@/utils/UserRepo'

export class Validation {
  private static readonly _phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  private static readonly _emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

  public static readonly MinimalDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 100)
  )
  public static readonly MaximalDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 18)
  )
  public static minimalNameLength: number = 1

  public static validateName(name: string): boolean {
    return name.length >= Validation.minimalNameLength
  }
  public static validateDob(dob: Date): boolean {
    return dob <= Validation.MaximalDate && dob >= Validation.MinimalDate
  }
  public static validateEmail(email: HTMLInputElement, check: string): boolean {
    const isValidFormat = Validation._emailRegex.test(String(check).toLocaleLowerCase())
    if (!isValidFormat) {
      this.changeValidateMessage(email, 'Please enter a valid email (email@example.com)')
      return false
    }
    if (!this.isEmailUnique(check)) {
      this.changeValidateMessage(email, 'This email already exists')
      return false
    }
    return isValidFormat
  }
  public static isEmailUnique(email: string): boolean {
    return !UserRepo.getUsers().find(
      (user) => user.email.toLocaleLowerCase() === email.toLocaleLowerCase()
    )
  }
  public static validatePhone(phone: string): boolean {
    return Validation._phoneRegex.test(phone)
  }
  public static validateForm(form: HTMLFormElement): boolean {
    let isValid: boolean = true
    const formName = form.querySelector('#nameValidation') as HTMLInputElement
    const formDob = form.querySelector('#dobValidation') as HTMLInputElement
    const formEmail = form.querySelector('#emailValidation') as HTMLInputElement
    const formPhone = form.querySelector('#phoneValidation') as HTMLInputElement
    const inputs = [formName, formDob, formEmail, formPhone]

    inputs.forEach((input) => {
      if (input) {
        if (isValid) {
          isValid = isValid && this.validateInput(input)
        } else {
          this.validateInput(input)
        }
      }
    })

    if (isValid) {
      inputs.forEach((input) => {
        if (input) {
          input.classList.remove('is-valid')
          input.classList.remove('is-invalid')
        }
      })
    }
    return isValid
  }

  private static validateInput(target: HTMLInputElement): boolean {
    let isValid: boolean = false
    switch (target.name) {
      case 'name':
        isValid = Validation.validateName(target.value)
        break
      case 'dob':
        isValid = Validation.validateDob(new Date(target.value))
        break
      case 'email':
        isValid = Validation.validateEmail(target, target.value)
        break
      case 'phone':
        isValid = Validation.validatePhone(target.value)
        break
    }
    target.classList.add(isValid ? 'is-valid' : 'is-invalid')
    return isValid
  }

  public static validateInputOnChange(event: Event): void {
    const target = event.target as HTMLInputElement
    if (target.classList.contains('is-invalid') || target.classList.contains('is-valid')) {
      target.classList.remove('is-invalid')
      target.classList.remove('is-valid')
      this.validateInput(target)
    }
  }

  private static changeValidateMessage(target: HTMLInputElement, message: string) {
    const validateDiv = target.nextElementSibling as HTMLDivElement
    if (validateDiv && validateDiv.classList.contains('invalid-feedback')) {
      validateDiv.innerHTML = message
    }
  }
}
