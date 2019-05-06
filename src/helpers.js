import validator from 'validator'

export const isHandlerValid = handler => {
  return validator.contains(handler, ' ')
}

export const isDogValid = dog => {
  return !validator.isEmpty(dog)
}

export const isHeightValid = height => {
  return height >= 13 && height <= 42.99
}

export const isEmailValid = email => {
  return validator.isEmail(email)
}
