import React from 'react'
import { TextField } from '@mui/material'
import { IMaskMixin } from 'react-imask'

const MaskedField = IMaskMixin(({ ...props }) => {
  const {
    form: { setTouched, touched },
    field: { name, value },
  } = props
  const { defaultValue, ...rest } = props

  return <TextField {...rest} value={value || ''} onBlur={(e) => setTouched({ ...touched, [name]: true })} />
})
export default MaskedField
