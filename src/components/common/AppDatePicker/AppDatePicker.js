import React from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material'
const AppDatePicker = ({ field, form, ...props }) => {
  const { setFieldValue } = form
  const { name } = field
  const { helperText, error, fullWidth, size } = props

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format="DD-MM-YYYY"
        {...field}
        onChange={(newValue) => {
          setFieldValue(name, newValue)
        }}
        slots={{ textField: TextField }}
        slotProps={{
          textField: {
            helperText,
            error,
            fullWidth,
            size,
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  )
}

export default AppDatePicker
