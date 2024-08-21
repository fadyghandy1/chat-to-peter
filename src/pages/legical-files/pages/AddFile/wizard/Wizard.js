import React from 'react'
import { InitialValueWizard } from '../constants'
import WizardForm from '../../../../../components/common/WizardForm/WizardForm'
import { Container } from '@mui/material'
import Logic from './logic'

function Wizard() {
  const { onFormSubmit, isLoading, stepsWizard } = Logic()

  return (
    <>
      <Container maxWidth="xl">
        <WizardForm initialValues={InitialValueWizard} onSubmit={onFormSubmit} steps={stepsWizard} isSubmitDisabled={isLoading} isHideSubmit={true} />
      </Container>
    </>
  )
}

export default Wizard
