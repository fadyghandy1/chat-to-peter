import React, { useState } from 'react'
import { Box, Button, Paper, Step, StepButton, StepLabel, Stepper } from '@mui/material'
import { FormikWizard } from '../../../components/common/wizard/index.js'
import { modes } from '../../../components/common/wizard/modeTypes.tsx'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { StyledButton, StyledWizardHeader } from './WizardForm.styles.js'
import AppButton from '../../../components/common/AppButton/AppButton.js'
import { useIntl } from 'react-intl'

const WizardForm = ({ mode = modes.ADD, initialValues = {}, onSubmit, steps, isSubmitDisabled = false, isHideSubmit = false, ...props }) => {
  console.log('initialValues', initialValues)
  const intl = useIntl()
  return (
    <FormikWizard
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log('submit value', values)
        onSubmit(values)
      }}
      // validateOnBlur={false}
      // validateOnChange
      // enableReinitialize
      validateOnNext
      activeStepIndex={0}
      steps={steps}
      mode={mode}
      {...props}
    >
      {({ currentStepIndex, renderComponent, handlePrev, handleNext, isNextDisabled, isPrevDisabled, isLastStep, stepsStatus }) => {
        return (
          <>
            <Box sx={{ width: '100%', my: '1rem' }}>
              <StyledWizardHeader>
                <Button
                  onClick={() => {
                    handlePrev()
                  }}
                  type="button"
                  variant="contained"
                  color="primary"
                  className="_btn _btnBack"
                  disabled={isPrevDisabled}
                >
                  <ArrowBackIosIcon />
                </Button>
                <Stepper nonLinear alternativeLabel activeStep={currentStepIndex}>
                  {steps.map((obj, index) => (
                    <Step completed={stepsStatus[index] === 0} key={index}>
                      <StepButton
                        onClick={(event) => {
                          handleNext(index + 1, true)
                        }}
                        // active={true}
                      >
                        <StepLabel error={stepsStatus[index] === 1}>{obj.label}</StepLabel>
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>

                <Button
                  type="button"
                  onClick={() => {
                    handleNext()
                  }}
                  variant="contained"
                  color="primary"
                  className="_btn _btnNext"
                  disabled={isNextDisabled || isLastStep}
                >
                  <ArrowForwardIosIcon />
                </Button>
              </StyledWizardHeader>
            </Box>

            <div className="drivingLicenseWrap">
              <Paper>
                <Box p={4}>{renderComponent()}</Box>
              </Paper>
              {/* {!hideNavigationButton && ( */}
              <StyledButton className="btnContainerForm">
                <AppButton onClick={() => handlePrev()} disabled={isPrevDisabled}>
                  {intl.formatMessage({ id: 'WIZARD.BACK' })}
                </AppButton>
                {(!isLastStep || (isLastStep && !isHideSubmit)) && (
                  <AppButton disabled={isNextDisabled || isSubmitDisabled} onClick={() => handleNext()}>
                    {isLastStep ? intl.formatMessage({ id: 'WIZARD.SUBMIT' }) : intl.formatMessage({ id: 'WIZARD.NEXT' })}
                  </AppButton>
                )}
              </StyledButton>
              {/* )}  */}
            </div>
          </>
        )
      }}
    </FormikWizard>
  )
}

export default WizardForm
