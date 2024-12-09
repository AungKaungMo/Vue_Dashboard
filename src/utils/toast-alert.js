/***************************************************
      SHOWING ERROR TOAST ALERT
**************************************************/
export const errorToast = (toast, message) => {
  toast.add({
    severity: 'error',
    summary: 'Error Message',
    detail: message || 'Something went wrong.',
    life: 3000
  })
}

/***************************************************
       SHOWING SUCCESS TOAST ALERT 
**************************************************/
export const successToast = (toast, message) => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: message,
    life: 3000
  })
}
