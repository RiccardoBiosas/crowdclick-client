import * as Yup from 'yup'

export const PublisherWizardFormValidationSchema = Yup.object().shape({
  projectName: Yup.string()
    .min(2, 'too short!')
    .max(30, 'too long!')
    .required('required'),
  projectDescription: Yup.string()
    .min(8, 'too short!')
    .max(100, 'too long!')
    .required('required'),
    projectURL: Yup.string()
  .matches(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi, 'not a URL!')
  .required('required!'),
  pricePerClick: Yup.number()
    .typeError('it must be a number!')
    .positive('positive number required!')
    .required('required'),
  campaignBudget: Yup.number()
    .typeError('it must be a number!')
    .positive('positive number required!')
    .required('required'),
  projectQuestion: Yup.string()
    .min(4, 'too short!')
    .max(40, 'too long!')
    .required('required'),
  projectOptions: Yup.array()
    .min(2, 'minimum of 2 answers!')
})
