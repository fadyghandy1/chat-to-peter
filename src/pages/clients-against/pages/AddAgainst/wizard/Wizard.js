import React from 'react'
import WizardForm from '../../../../../components/common/WizardForm/WizardForm'
import { Container } from '@mui/material'
import Logic from './logic'
import { modes } from '../../../../../components/common/wizard'
// import Test from './test'

function Wizard({ mode = modes.ADD, initialValues, againstId, handleOnUpdated }) {
  const { onFormSubmit, isLoading, stepsWizard } = Logic({ mode, againstId, handleOnUpdated })

  return (
    <>
      <Container maxWidth="xl">
        <WizardForm initialValues={{ ...initialValues, existNameEn: false, existNameAr: false }} onSubmit={onFormSubmit} steps={stepsWizard} isSubmitDisabled={isLoading} mode={mode} />
      </Container>
    </>
  )
}

export default Wizard
