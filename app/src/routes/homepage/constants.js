// assets
import ethereum from '../../assets/homepage/becomeUser/ethereum.svg'
import matic from '../../assets/homepage/becomeUser/matic.svg'
import crowdholding from '../../assets/homepage/becomeUser/crowdholding.svg'
import createProject from '../../assets/homepage/becomePublisher/createYourProject.svg'
import planYourBudget from '../../assets/homepage/becomePublisher/planYourBudget.svg'
import askAQuestion from '../../assets/homepage/becomePublisher/askAQuestion.svg'
import campaignCompleted from '../../assets/homepage/becomePublisher/campaignCompleted.svg'
import { answerQuestions } from '../../assets'

export const becomeUserSteps = {
  item: 'user',
  reversed: false,
  data: [
    {
      src: matic,
      altCaption: 'matic-icon',
      content: {
        title: 'Discover Websites',
        text:
          'Simply choose a project to participate in. Each card showcases the description of the project and the reward per task.'
      }
    },
    {
      src: crowdholding,
      altCaption: 'crowdholding-icon',
      content: {
        title: 'Review the website',
        text:
          'A timer will display while you review the websites content. Browse so you are prepared to give your input when the timer ends.'
      }
    },
    {
      src: answerQuestions,
      altCaption: 'quiz-questions-icon',
      content: {
        title: 'Answer question(s)',
        text:
          'Once the timer ends, question(s) will display from the publishing partner to gather feedback or see what you’ve learned.'
      }
    },
    {
      src: ethereum,
      altCaption: 'ethereum-icon',
      content: {
        title: 'Receive Crypto',
        text:
          'Once answered, you will receive a money reward for your attention. You can choose to go to the site or back to a new task.'
      }
    }
  ]
}

export const becomePublisherSteps = {
  item: 'publisher',
  reversed: true,
  data: [
    {
      src: createProject,
      altCaption: 'create-project-icon',
      content: {
        title: 'Showcase your project',
        text:
          'Fill in your project title, 100 character description & your website URL where you will move traffic to.'
      }
    },
    {
      src: planYourBudget,
      altCaption: 'plan-budget-icon',
      content: {
        title: 'Set reward plan',
        text:
          'Set your reward per answer, max budget to spend & time duration on your site. Know how many people you will reach.'
      }
    },
    {
      src: askAQuestion,
      altCaption: 'ask-question-icon',
      content: {
        title: 'Ask a question(s)',
        text:
          'Place the question that you want answers. Is it a question to educate like a quiz or do you want to get feedback? Anything is possible.'
      }
    },
    {
      src: campaignCompleted,
      altCaption: 'campaign-completed-icon',
      content: {
        title: 'Simple deposit',
        text:
          'Simply deposit crypto in the smart contract and you are ready to go Check live traffic & survey results real time.'
      }
    }
  ]
}
