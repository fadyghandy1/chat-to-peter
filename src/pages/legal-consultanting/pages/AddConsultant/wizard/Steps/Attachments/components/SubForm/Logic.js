import React, { useMemo, useState } from 'react'

function Logic(row, setAttachments) {
  const initialValues = {
    attachmentType: row?.attachmentType || null,
    attachmentEndDate: row?.attachmentEndDate || '',
    attachmentName: row?.attachmentName || '',
    attachment: row?.attachment || '',
  }
  const onSubmit = (values, { resetForm }) => {
    setAttachments(values)
    resetForm()
  }
  const [attachmentTypes, setAttachmentsTypes] = useState([
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
  ])

  return { initialValues, onSubmit, attachmentTypes }
}

export default Logic
