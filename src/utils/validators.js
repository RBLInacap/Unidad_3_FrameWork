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

export const validateChangePasswordForm = (currentPassword, newPassword, confirmPassword) => {
  const errors = {}
  
  if (!currentPassword) {
    errors.current_password = 'La contraseña actual es requerida'
  }
  
  if (!newPassword) {
    errors.new_password = 'La nueva contraseña es requerida'
  } else if (newPassword.length < 8) {
    errors.new_password = 'La contraseña debe tener mínimo 8 caracteres'
  } else if (!/[A-Z]/.test(newPassword)) {
    errors.new_password = 'Debe contener al menos una mayúscula'
  } else if (!/\d/.test(newPassword)) {
    errors.new_password = 'Debe contener al menos un número'
  }
  
  if (!confirmPassword) {
    errors.confirm_password = 'Debe confirmar la contraseña'
  } else if (newPassword !== confirmPassword) {
    errors.confirm_password = 'Las contraseñas no coinciden'
  }
  
  if (currentPassword && newPassword && currentPassword === newPassword) {
    errors.new_password = 'La nueva contraseña debe ser diferente a la actual'
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
