/***************************************************
       HANDLING VALIDATION FOR ALL VARIABLES
**************************************************/
export const validateField = (value, fieldName, secondValue) => {
  if (
    !value &&
    fieldName != 'Remark' 
  ) {
    return `${fieldName} is required.`
  } else if (fieldName == 'Remark' && !value && secondValue == 'Inactive') {
    return `${fieldName} is required.`
  } 

  if (fieldName == 'Email' && !value.includes('@')) {
    return 'Invalid email address'
  }
  if (fieldName == 'Confirm Password' && value != secondValue) {
    return "Password does't match."
  }
  if (fieldName == 'Phone') {
    const numeric = value.replace(/[^0-9]/g, '')
    if (value !== numeric) return 'Invalid phone number.'
  }
  return true
}
