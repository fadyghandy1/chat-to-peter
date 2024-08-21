import dayjs from 'dayjs'

export const FnDateFormat = (date) => {
  if (date) {
    return dayjs(date).format('MM/DD/YYYY')
  }
  return ''
}

export const prepareAttachmentURLForPreview = ({ file, fileType }) => 'data:' + fileType + ';base64, ' + file

export const without = (array, ...values) => {
  return array.filter((item) => !values.includes(item))
}
export const getImageTypeFromBase64 = (base64String) => {
  // Regular expression to match the data URI scheme with a MIME type
  const regex = /^data:(.+?);base64,/

  // Validate and extract MIME type
  const match = base64String.match(regex)
  if (match && match.length > 1) {
    // The MIME type is in the first capturing group
    return match[1]
  }
  return null
}

export const getFileTypeFromDataURI = (dataURI) => {
  const match = dataURI.match(/^data:(.*?\/.*?);/)

  if (match && match[1]) {
    const fileType = match[1].split('/')[1]
    return '.' + fileType || null
  }

  return null
}

export const handleBase64ToPreview = ({ base64, extension }) => {
  if (!base64 || !extension) return null
  const pureExtension = extension.substring(1)
  if (pureExtension === 'pdf') {
    return 'data:application/pdf;base64,' + base64
  }
  return `data:data/${pureExtension};base64,${base64}`
}

export const extractBase64FromDataURI = (dataURI) => {
  const commaIndex = dataURI.indexOf(',')

  if (commaIndex !== -1) {
    return dataURI.slice(commaIndex + 1)
  }

  return null
}

export const deleteNullOrUndefinedProperties = (obj) => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key]
    }
  }
  return obj
}
export const generatePassword = (length = 8) => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '0123456789'
  const specialChars = '!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~`'

  // Guaranteed characters
  const guaranteedChars = [lowercase.charAt(Math.floor(Math.random() * lowercase.length)), uppercase.charAt(Math.floor(Math.random() * uppercase.length)), digits.charAt(Math.floor(Math.random() * digits.length)), specialChars.charAt(Math.floor(Math.random() * specialChars.length))]

  // Remaining characters
  const remainingChars = Array.from({ length: length - guaranteedChars.length }).map(() => {
    const pool = lowercase + uppercase + digits + specialChars
    return pool.charAt(Math.floor(Math.random() * pool.length))
  })

  // Combine and shuffle
  const password = guaranteedChars.concat(remainingChars)
  password.sort(() => Math.random() - 0.5) // Randomly shuffle

  // Return the password
  return password.join('')
}


export const debounce = (func, wait) => {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};