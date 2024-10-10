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
  public static validateEmail(email: string): boolean {
    return Validation._emailRegex.test(String(email).toLocaleLowerCase())
  }
  public static validatePhone(phone: string): boolean {
    return Validation._phoneRegex.test(phone)
  }
  public static validateForm(form: HTMLFormElement): boolean {
    let isValid: boolean = false
    const formName = form.querySelector('#nameValidation') as HTMLInputElement
    const formDob = form.querySelector('#dobValidation') as HTMLInputElement
    const formEmail = form.querySelector('#emailValidation') as HTMLInputElement
    const formPhone = form.querySelector('#phoneValidation') as HTMLInputElement
    const inputs = [formName, formDob, formEmail, formPhone]
    if (formName && formDob && formEmail && formPhone) {
      isValid =
        Validation.validateName(formName.value) &&
        Validation.validateDob(new Date(formDob.value)) &&
        Validation.validateEmail(formEmail.value) &&
        Validation.validatePhone(formPhone.value)

      inputs.forEach((input: HTMLInputElement) => {
        input.classList.remove('is-invalid')
        input.classList.remove('is-valid')
      })
      if (!isValid) {
        formName.classList.add(this.validateName(formName.value) ? 'is-valid' : 'is-invalid')
        formDob.classList.add(this.validateDob(new Date(formDob.value)) ? 'is-valid' : 'is-invalid')
        formEmail.classList.add(this.validateEmail(formEmail.value) ? 'is-valid' : 'is-invalid')
        formPhone.classList.add(this.validatePhone(formPhone.value) ? 'is-valid' : 'is-invalid')
      }
    }
    return isValid
  }
}
