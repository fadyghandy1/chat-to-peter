import React from 'react'
import WizardForm from '../../../../../components/common/WizardForm/WizardForm'
import { Container } from '@mui/material'
import Logic from './logic'
// import Test from './test'

function Wizard() {
  const { onFormSubmit, InitialValueWizard, isLoading, stepsWizard } = Logic()

  return (
    <>
      <Container maxWidth="xl">
        <WizardForm initialValues={InitialValueWizard} onSubmit={onFormSubmit} steps={stepsWizard} isSubmitDisabled={isLoading} />
      </Container>
    </>
  )
}

export default Wizard
