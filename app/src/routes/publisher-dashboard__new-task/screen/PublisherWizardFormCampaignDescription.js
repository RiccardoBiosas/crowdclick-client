import React, { Fragment, useEffect } from 'react'
import { CampaignHeader } from '../styles/CampaignStyles'
import {
  WizardInputForms,
  CustomTextareaField,
  CustomInputField
} from '../styles/WizardFormStyles'


export const PublisherWizardFormCampaignDescription = ({
  step,
  errors,
  touched,
  dispatch,
  isError
}) => {
  useEffect(() => {
    const { projectName, projectDescription, projectURL } = errors
    if (
      !projectName &&
      !projectDescription &&
      !projectURL &&
      touched.projectName &&
      touched.projectDescription &&
      touched.projectURL
    ) {
      dispatch({ type: 'first_step' })
    }
  }, [errors, touched])



  if (step != 1) {
    return null
  } else {
    return (
      <Fragment>
        <CampaignHeader>
          <h2>Tell us about your project!</h2>
          <p>Introduce your project to the crowd</p>
        </CampaignHeader>
        <WizardInputForms>
          <div className='labelFieldContainer'>
            <label htmlFor='projectName'>Project title:</label>
            <div className='inputAndErrorContainer'>
              <CustomInputField
                type='text'
                name='projectName'
                id='projectName'
                placeholder='project name'
                component='input'
              />
              {errors.projectName && touched.projectName ? (
                <span
                  style={{ color: `${isError ? 'red' : ''}` }}
                  className='errorMessage'
                >
                  {errors.projectName}
                </span>
              ) : null}
            </div>
          </div>
          <div className='labelFieldContainer'>
            <label htmlFor='projectDescription'>
              Project description (max 100 characters):
            </label>
            <div className='inputAndErrorContainer'>
              <CustomTextareaField
                type='text'
                name='projectDescription'
                id='projectDescription'
                placeholder='project description'
                component='textarea'
              />
              {errors.projectDescription && touched.projectDescription ? (
                <span
                  style={{ color: `${isError ? 'red' : ''}` }}
                  className='errorMessage'
                >
                  {errors.projectDescription}
                </span>
              ) : null}
            </div>
          </div>

          <div className='labelFieldContainer'>
            <label htmlFor='projectURL'>Project URL:</label>
            <div className='inputAndErrorContainer'>
              <CustomInputField
                type='text'
                name='projectURL'
                id='projectURL'
                placeholder='your project URL'
                component='input'
              />
              {errors.projectURL && touched.projectURL ? (
                <span
                  style={{ color: `${isError ? 'red' : ''}` }}
                  className='errorMessage'
                >
                  {errors.projectURL}
                </span>
              ) : null}
            </div>
          </div>
        </WizardInputForms>
      </Fragment>
    )
  }
}
