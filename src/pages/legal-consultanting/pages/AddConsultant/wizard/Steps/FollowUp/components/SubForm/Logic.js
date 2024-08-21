import React, { useMemo, useState } from 'react'

function Logic(row, setStages) {
  const initialValues = {
    date: row?.date || null,
    consultant: row?.consultant || null,
    followUpDetails: row?.followUpDetails || null,
    action: row?.action || null,
    
  }
  const onSubmit = (values, { resetForm }) => {
    setStages(values)
    resetForm()
  }
  const [consultants, setConsultants] = useState([
    { title: 'ابتدائي', year: 1994 },
    { title: 'نقض', year: 1972 },
    { title: 'استئناف', year: 1974 },
  ])
 
  const [directorates, setDirectorates] = useState([
    { title: 'directorates 1', year: 1994 },
    { title: 'directorates 2', year: 1972 },
    { title: 'directorates 3', year: 1974 },
  ])
  const [caseTypes, setCaseTypes] = useState([
    { title: 'directorates 1', year: 1994 },
    { title: 'directorates 2', year: 1972 },
    { title: 'directorates 3', year: 1974 },
  ])
  return { initialValues, onSubmit, directorates, caseTypes, consultants }
}

export default Logic
