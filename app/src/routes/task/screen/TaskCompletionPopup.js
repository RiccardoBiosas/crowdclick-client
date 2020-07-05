import React from "react"
import { TaskCompletionLayout } from "../styles/TaskCompletionLayout"
import { ReactComponent as SVGReward} from '../../../assets/Iframe/ETH-Reward.svg'
import StyledGlobalButton  from '../../../shared/styles/StyledGlobalButton'
import { useRedirectWithProps } from '../../../hooks/useRedirectWithProps'
import { USER_TASKS_LIST_ROUTE } from "../../../config/routes-config"

export const TaskCompletionPopup = ({url}) => {

    return(
        <TaskCompletionLayout>
            <h2>Your Ether is on its way</h2>
            <div style={{width: "180px", height: "180px"}} >
                <SVGReward />

            </div>
            <div className="buttonContainer">
                <StyledGlobalButton buttonColor={"white"} buttonTextColor={"#206DFF"} buttonMargin={'0px 20px 20px 0px'} buttonWidth={200} onClick={() => window.open(url, '_blank')}>View Site</StyledGlobalButton>
                {useRedirectWithProps(USER_TASKS_LIST_ROUTE, 'blue', 'New Task')}
            </div>
        </TaskCompletionLayout>
    )
}