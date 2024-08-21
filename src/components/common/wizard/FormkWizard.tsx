import React from 'react'
import { Formik } from 'formik'
import { WizardProps, Step } from './types'
import { useWizard } from './useWizard'
import { modes } from './modeTypes'

type mode = keyof modes
const FormikWizard = ({ activeStepIndex = 0, validateOnNext = true, steps, children, mode: mode, ...props }: WizardProps) => {
  const { currentStepIndex, isPrevDisabled, isFirstStep, isLastStep, handlePrev, handleNext, handleGoTo, stepsStatus } = useWizard(activeStepIndex, steps, validateOnNext)
  const currentStep: Step = steps[currentStepIndex]
  const { component: StepComponent, isPreview } = currentStep
  console.log('currentStep')
  console.log(mode)

  return (
    <Formik {...props} validationSchema={currentStep.validationSchema}>
      {typeof children === 'function'
        ? (formikBag) => {
            const wizardProps = {
              handlePrev: async () => {
                await handlePrev(formikBag)()
                await formikBag.validateForm()
              },
              handleNext: handleNext(formikBag),
              handleGoTo: handleGoTo(formikBag),
              isFirstStep,
              isLastStep,
              stepsStatus,
              currentStepIndex,
              isPrevDisabled,
              isNextDisabled: (validateOnNext && !formikBag.isValid) || false,
              renderComponent: () => <StepComponent {...formikBag} {...currentStep.props} currentStepIndex={currentStepIndex} isPreview={isPreview} mode={mode} />,
            }

            return children({
              ...formikBag,
              ...wizardProps,
            })
          }
        : children}
    </Formik>
  )
}

export { FormikWizard }
