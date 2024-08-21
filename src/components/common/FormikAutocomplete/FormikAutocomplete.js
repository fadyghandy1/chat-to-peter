import React, { useEffect, useLayoutEffect } from 'react'
import { Autocomplete, Checkbox, TextField } from '@mui/material'
import { fieldToTextField } from 'formik-mui'
import dotPropImmutable from 'dot-prop-immutable'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1)
// }
const FormikAutocomplete = ({ textFieldProps, setChangeEvent, optionKey, optionLabel, idPropName, checkboxOption = false, ...props }) => {
  const {
    form: { setTouched, touched, errors, setFieldValue },
    label,
    options = [],
  } = props
  const { error, helperText, ...field } = fieldToTextField(props)
  const { name } = field
  //
  // let idNameFromNAme = 'n' + capitalizeFirstLetter(name) + 'Id'
  // let idPropName = props.idPropName ? props.idPropName : idNameFromNAme
  // useEffect(() => {
  //   if (props.field.value === 0) {

  //   }
  //   if (!(typeof props.field.value === 'object') && typeof props.field.value === 'number' && options?.length > 0 && typeof options[0] === 'object') {
  //     setFieldValue(name, options.filter((ele) => ele[idPropName] == props.field.value)[0])
  //   }
  // }, [options, props.field.value])

  useLayoutEffect(() => {
    //
    if (!(typeof field.value === 'object') && idPropName && options?.length > 0 && typeof options[0] === 'object') {
      //
      if (options.filter((ele) => dotPropImmutable.get(ele, idPropName) == field.value).length > 0) {
        setFieldValue(name, options.filter((ele) => dotPropImmutable.get(ele, idPropName) == field.value)[0] ?? null)
      }
    }
  }, [options, field.value])

  const value = idPropName && !(typeof field.value === 'object') ? (options.filter((ele) => dotPropImmutable.get(ele, idPropName) == field.value).length > 0 ? options.filter((ele) => dotPropImmutable.get(ele, idPropName) == field.value)[0] : null) : field.value

  return (
    <Autocomplete
      renderOption={(props, option, { selected }) => {
        return (
          <li {...props} key={option[optionKey] || option[optionLabel]}>
            {checkboxOption && <Checkbox icon={<CheckBoxOutlineBlankIcon fontSize="small" />} checkedIcon={<CheckBoxIcon fontSize="small" />} style={{ marginRight: 8 }} checked={selected} />}

            {dotPropImmutable.get(option, optionLabel)}
          </li>
        )
      }}
      getOptionLabel={(option) => dotPropImmutable.get(option, optionLabel) || ''} // Specify the getOptionLabel function
      {...field}
      value={value}
      onChange={async (_, value) => {
        await setFieldValue(name, value)

        if (setChangeEvent) {
          setChangeEvent(value)
        }
        // fieldRef.current.blur()
      }}
      // onInputChange={(event, value, reason) => {
      //
      //   if (event?.type !== 'change' && value) {
      //     if (setChangeEvent) {
      //       console.log('testVal', field.value)
      //       setChangeEvent(field.value, value)
      //     }
      //   }
      // }}
      // loading
      // noOptionsText={'No Results'}
      // filterOptions={customFilterOptions}
      onBlur={(e) => setTouched({ ...touched, [name]: true })}
      renderInput={(props) => {
        console.log(textFieldProps)
        return (
          <TextField
            label={label}
            {...props}
            fullWidth
            variant="outlined"
            {...textFieldProps}
            helperText={helperText}
            error={error}
            // error={!!errors[name]}
            // helperText={!!errors[name] && errors[name]}
          />
        )
      }}
    />
  )
}

export default FormikAutocomplete
