function Logic({ searchTimesheetMutation }) {
  const initialValues = {
    caseFileNumber: '',
    caseNumber: '',
    staffName: '',
    wanted: null,
  }

  const onSubmit = async (values) => {
    try {
      debugger
      const response = await searchTimesheetMutation.mutateAsync({
        caseFileNumber: values.caseFileNumber.trim() || null,
        caseNumber: values.caseNumber.trim() || null,
        staffName: values.staffName.trim() || null,
        wanted: values.wanted || null,
      })
      //   console.log(response, 'fffffffffffff')
    } catch (error) {
      console.log(error)
    }
  }
  return { onSubmit, initialValues }
}

export default Logic
