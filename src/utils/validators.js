// Validaciones de formularios
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePassword = (password) => {
  // Al menos 6 caracteres, una mayúscula, un número
  const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/
  return regex.test(password)
}

export const validateName = (name) => {
  // Al menos 2 caracteres, solo letras y espacios
  return name.trim().length >= 2 && /^[a-záéíóúñ\s]+$/i.test(name)
}

export const getPasswordErrors = (password) => {
  const errors = []
  if (password.length < 6) {
    errors.push('Mínimo 6 caracteres')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Debe contener una mayúscula')
  }
  if (!/\d/.test(password)) {
    errors.push('Debe contener un número')
  }
  return errors
}

export const validateLoginForm = (email, password) => {
  const errors = {}
  
  if (!email) {
    errors.email = 'El email es requerido'
  } else if (!validateEmail(email)) {
    errors.email = 'Email inválido'
  }
  
  if (!password) {
    errors.password = 'La contraseña es requerida'
  }
  
  return errors
}

export const validateRegisterForm = (firstName, lastName, email, password, confirmPassword) => {
  const errors = {}
  
  if (!firstName) {
    errors.firstName = 'El nombre es requerido'
  } else if (!validateName(firstName)) {
    errors.firstName = 'Nombre inválido (mínimo 2 caracteres)'
  }
  
  if (!lastName) {
    errors.lastName = 'El apellido es requerido'
  } else if (!validateName(lastName)) {
    errors.lastName = 'Apellido inválido (mínimo 2 caracteres)'
  }
  
  if (!email) {
    errors.email = 'El email es requerido'
  } else if (!validateEmail(email)) {
    errors.email = 'Email inválido'
  }
  
  if (!password) {
    errors.password = 'La contraseña es requerida'
  } else if (!validatePassword(password)) {
    const passwordErrors = getPasswordErrors(password)
    errors.password = passwordErrors.join(', ')
  }
  
  if (!confirmPassword) {
    errors.confirmPassword = 'Debe confirmar la contraseña'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden'
  }
  
  return errors
}
