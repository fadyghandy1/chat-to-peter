import { FormControlLabel, FormHelperText, Radio } from '@mui/material'
import { RadioGroup } from 'formik-mui'

const FormikRadioGroup = ({ options, fieldLabel, fieldValue, setChangeEvent, rowDirection = false, disabled = false, ...props }) => {
  const {
    field,
    form: { errors, setFieldValue },
  } = props
  const { name } = field
  const { helperText, error, fullWidth, size, ...rest } = props

  return (
    <>
      <RadioGroup
        {...rest}
        name={name}
        row={rowDirection}
        onChange={async (_, value) => {
          await setFieldValue(name, value)

          if (setChangeEvent) {
            setChangeEvent(value)
          }
        }}
      >
        {options.map((option, index) => (
          <FormControlLabel key={index} value={fieldValue ? option[fieldValue] : option} control={<Radio />} label={fieldLabel ? option[fieldLabel] : option} disabled={disabled} />
        ))}
      </RadioGroup>
      {!!errors[name] && <FormHelperText error={!!errors[name]}>{errors[name]}</FormHelperText>}
    </>
  )
}

export default FormikRadioGroup
