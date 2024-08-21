import React from 'react'
import WizardForm from '../../../../../../components/common/WizardForm/WizardForm'
import { Container } from '@mui/material'
import Logic from './logic'
import { modes } from '../../../../../../components/common/wizard'
// import Test from './test'

function Wizard({ mode = modes.ADD, initialValues, handleOnUpdated, clientID }) {
  const { onFormSubmit, isLoading, stepsWizard } = Logic({ mode, handleOnUpdated, clientID })

  return (
    <>
      <Container maxWidth="xl">
        <WizardForm initialValues={{ ...initialValues, existClientNameEn: false, existClientNameAr: false }} onSubmit={onFormSubmit} steps={stepsWizard} isSubmitDisabled={isLoading} mode={mode} />
      </Container>
    </>
  )
}

export default Wizard
