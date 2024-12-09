/***************************************************
      CHECKING UPLOAD FILE 
**************************************************/

const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
const allowedExtensions = ['.png', '.jpeg', '.jpg', '.gif', '.webp']

export const validateFileType = (file) => {
  if (file.type && allowedImageTypes.includes(file.type)) {
    return true
  }
  const fileName = file.name.toLowerCase()

  return allowedExtensions.some((extension) => fileName.endsWith(extension))
}
