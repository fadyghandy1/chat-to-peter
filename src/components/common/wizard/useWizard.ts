import { useState, useCallback } from 'react'
import { stepState } from './newTypes'
import { Step } from './types'
import { isFunction } from './utils'

const useWizard = (activeStepIndex: number, steps: Step[], validateOnNext: boolean) => {
  const total = steps.length
  const [currentStep, setCurrentStep] = useState(activeStepIndex)
  const [stepsStatus, setStepsStatus] = useState(steps.map((ele) => stepState.notVisited))
  const isPrevDisabled: boolean = currentStep === 0
  const isFirstStep: boolean = currentStep === 0
  const isLastStep: boolean = currentStep >= total - 1
  const goToPrev = useCallback(() => setCurrentStep(Math.max(0, currentStep - 1)), [setCurrentStep, currentStep])

  const goTo = useCallback(
    (index: any) => {
      setCurrentStep(Math.max(0, index - 1))
    },
    [setCurrentStep, currentStep]
  )

  const goToNext = useCallback(
    (index?: any) => {
      setCurrentStep(index || index === 0 ? index - 1 : Math.min(currentStep + 1, total - 1))
    },
    [setCurrentStep, currentStep, total]
  )

  const stepObj: Step = steps[currentStep]
  const { beforePrev, beforeNext } = stepObj
  const handlePrev = useCallback(
    (formikBag: any) => async () => {
      let isValid = true
      if (isFunction(beforePrev)) {
        try {
          await beforePrev!(formikBag.values, formikBag, currentStep)
        } catch (error) {
          isValid = false
        }
      }
      if (isValid) {
        goToPrev()
      }
    },
    [goToPrev, currentStep, beforePrev]
  )

  const handleNext = useCallback(
    (formikBag: any) => async (index?: any, isJump?: boolean) => {
      let isValid = false
      let _validateOnNext = validateOnNext || steps[currentStep].isMandatory
      if (_validateOnNext) {
        const errors = await formikBag.validateForm()

        isValid = Object.keys(errors).length === 0
      }

      // const errors = await formikBag.validateForm();
      isValid = await steps[currentStep].validationSchema.isValid(formikBag.values)
      // isValid = Object.keys(errors).length === 0;
      stepsStatus[currentStep] = isValid ? stepState.valide : stepState.notVaild
      setStepsStatus([...stepsStatus])

      if (((_validateOnNext && isValid) || !_validateOnNext) && isFunction(beforeNext)) {
        try {
          await beforeNext!(formikBag.values, formikBag, currentStep)
          isValid = true
        } catch (error) {
          isValid = false
        }
      }
      if (index == total) {
        for (let i = 0; i < steps.length; i++) {
          const ele = steps[i]
          let valid = await ele.validationSchema.isValid(formikBag.values)
          if (valid) {
            stepsStatus[i] = stepState.valide
          } else {
            stepsStatus[i] = stepState.notVaild
            isValid = false
          }
        }
        setStepsStatus([...stepsStatus])
      }

      if (isJump) {
        let isNextEnabled = true
        for (let i = 0; i < index - 1; i++) {
          console.log(steps[i].isMandatory)
          console.log(steps)
          console.log(stepsStatus[i] == stepState.notVisited)
          console.log(!(await steps[i].validationSchema.isValid(formikBag.values)))
          // if (steps[i].isMandatory && stepsStatus[i] == stepState.notVisited && !await steps[i].validationSchema.isValid(formikBag.values)) {
          if (steps[i].isMandatory && !(await steps[i].validationSchema.isValid(formikBag.values))) {
            console.log('false')
            isNextEnabled = false
            break
          }
        }
        if (isNextEnabled) {
          goToNext(index)
        }
      } else if ((!isLastStep && !_validateOnNext) || isValid) {
        isLastStep ? formikBag.submitForm() : goToNext(index)
      }
    },
    [goToNext, currentStep, beforeNext, isLastStep, validateOnNext]
  )

  const handleGoTo = useCallback(
    (formikBag: any) => async (index: any) => {
      let isValid = false

      if (validateOnNext) {
        const errors = await formikBag.validateForm()
        isValid = Object.keys(errors).length === 0
      }

      if (((validateOnNext && isValid) || !validateOnNext) && isFunction(beforeNext)) {
        try {
          await beforeNext!(formikBag.values, formikBag, currentStep)
          isValid = true
        } catch (error) {
          isValid = false
        }
      }

      if (isValid) {
        goTo(index)
      }
    },
    [goTo, currentStep, beforeNext, validateOnNext]
  )

  return {
    currentStepIndex: currentStep,
    isPrevDisabled,
    isFirstStep,
    isLastStep,
    goToPrev,
    goToNext,
    goTo,
    handlePrev,
    handleNext,
    handleGoTo,
    stepsStatus,
  }
}

export { useWizard }
