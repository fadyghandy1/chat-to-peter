import { FormControlLabel, Checkbox } from '@mui/material'

const FormikCheckbox = ({
  field, // This includes onChange, onBlur, name, and value
  form: { touched, errors, setFieldValue, setFieldTouched }, // Formik bag
  label,
  ...props
}) => {
  const { helperText, error, fullWidth, size, ...rest } = props
  debugger
  const handleChange = (event) => {
    const { checked } = event.target
    setFieldValue(field.name, checked)
  }

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={field.value}
          onChange={handleChange}
          name={field.name}
          color="primary" // Example to set the color of the Checkbox
          {...rest}
        />
      }
      label={label}
    />
  )
}

export default FormikCheckbox
