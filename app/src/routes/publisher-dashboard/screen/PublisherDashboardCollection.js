// theirs
import React from 'react'
// components
import DataFetcher from '../../../shared/components/DataFetcher'
// styles
import StyledGeneralRowWrapper from '../../../shared/styles/StyledGeneralRowWrapper'
import StyledGeneralParagraph from '../../../shared/styles/StyledGeneralParagraph'
import { StyledPercentageBarItem } from '../../publisher-dashboard__new-task/styles/CampaignStyles'
// utils
import { isWhatPercentage } from '../../../utils/isWhatPercentage'
import crowdclickClient from '../../../utils/api/crowdclick'
import { somethingWentWrongIcon } from '../../../assets'

const PublisherDashboardCollection = ({ taskID }) => {
  const axiosCallbackWrapper = async() => {
    return await crowdclickClient.getDashboardTask(taskID)
  }
  return (
    <DataFetcher action={axiosCallbackWrapper}>
      {data => {
        console.log('data: ', data)
        const answersDashboardData = data.find(x => x.id === taskID)
        const answersCount =
          (answersDashboardData && answersDashboardData.answers_result_count) ||
          0
        const answers = answersDashboardData && answersDashboardData.answers
        return answersDashboardData && answers.length > 0 ? (
          <>
            <div className='viewsContainer'>
              <h2>Total Count:</h2>
              <h3>{answersCount}</h3>
            </div>
            <div>
              <h2>Survey results:</h2>
              <div className='answersContainer'>
                {answers.map(x => {
                  let currentPercentage = isWhatPercentage(
                    x.selected_options[0].answer_count,
                    answersCount
                  )
                  return (
                    <div key={`answer${currentPercentage}${taskID}`}>
                      <StyledGeneralRowWrapper
                        rowWidth='60%'
                        rowJustify='space-between'
                      >
                        <p>{x.selected_options[0].title}</p>
                        <p>{currentPercentage}%</p>
                      </StyledGeneralRowWrapper>

                      <StyledPercentageBarItem percentage={currentPercentage}>
                        <div className='itemPercentage' />
                      </StyledPercentageBarItem>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='viewsContainer'>
              <img
                style={{ width: '12rem' }}
                alt='no-views-icon'
                src={somethingWentWrongIcon}
              />
            </div>
            <StyledGeneralRowWrapper rowWidth='100%' rowHeight='100%'>
              <StyledGeneralParagraph
                paragraphColor='#636262'
                paragraphFontSize='1.2rem'
                paragraphFontWeight='500'
                paragraphLineHeight='1.8'
              >
                No collected answers yet! <br />
                Check again later
              </StyledGeneralParagraph>
            </StyledGeneralRowWrapper>
          </>
        )
      }}
    </DataFetcher>
  )
}

export default PublisherDashboardCollection
