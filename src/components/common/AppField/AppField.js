import React from 'react'
import { Field, useField } from 'formik'
import { TextField } from '@mui/material'

const AppField = ({ className, fullWidth = true, variant = 'outlined', label, size = 'large', name, children, ...props }) => {
  const [field, meta] = useField(name)

  return (
    <Field
      as={TextField}
      name={name}
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      className={className}
      size={size}
      error={!!meta.error}
      helperText={!!meta.error && meta.error}
      // error={meta.touched && !!meta.error}
      // helperText={meta.touched && meta.error}
      {...props}
    >
      {children}
    </Field>
  )
}

export default AppField
