pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./constants/CrowdclickEscrowErrors.sol";

contract CrowdclickEscrow is Ownable, CrowdclickEscrowErrors {
    using SafeMath for uint256;

    struct Task {
        uint256 taskBudget;
        uint256 taskReward;
        uint256 currentBudget;
        string url;
        bool isActive;
    }

    uint256 HARDCODED_MINIMUM_WITHDRAWAL = 30000000000000000 wei; // = 0.03 ethereum
    mapping(address => Task[]) private taskCollection;
    mapping(address => uint256) private publisherAccountBalance;
    mapping(address => uint256) private userAccountBalance;

    /**
        ####
        external functions
        ####
    */

    /** open task */
    function openTask(
        uint256 _taskBudget,
        uint256 _taskReward,
        string calldata _campaignUrl
    ) external payable {
        require(msg.value == _taskBudget, WRONG_CAMPAIGN_BUDGET);

        Task memory taskInstance;
        taskInstance.taskBudget = _taskBudget;
        taskInstance.taskReward = _taskReward;
        taskInstance.currentBudget = _taskBudget;
        taskInstance.isActive = true;
        taskInstance.url = _campaignUrl;
        taskCollection[msg.sender].push(taskInstance);

        publisherAccountBalance[msg.sender] = publisherAccountBalance[msg
            .sender]
            .add(msg.value);
    }

    /** balance of publisher */
    function balanceOfPublisher(address _address)
        external
        view
        returns (uint256)
    {
        return publisherAccountBalance[_address];
    }

    /** balance of user */
    function balanceOfUser(address _address) external view returns (uint256) {
        return userAccountBalance[_address];
    }

    /** withdraw user balance */
    function withdrawUserBalance(uint256 withdrawAmount) external payable {
        require(
            withdrawAmount >= HARDCODED_MINIMUM_WITHDRAWAL,
            LESS_THAN_MINIMUM_WITHDRAWAL
        );
        require(
            userAccountBalance[msg.sender] >= withdrawAmount,
            NOT_ENOUGH_USER_BALANCE
        );
        userAccountBalance[msg.sender] = userAccountBalance[msg.sender].sub(
            withdrawAmount
        );
        msg.sender.transfer(withdrawAmount);
    }

    /** withdraw from campaign */
    function withdrawFromCampaign(string calldata _campaignUrl)
        external
        payable
    {
        (uint256 campaignIndex, ) = helperSelectTask(msg.sender, _campaignUrl);
        require(
            taskCollection[msg.sender][campaignIndex].currentBudget > 0,
            NOT_ENOUGH_CAMPAIGN_BALANCE
        );
        require(
            publisherAccountBalance[msg.sender] >=
                taskCollection[msg.sender][campaignIndex].currentBudget,
            NOT_ENOUGH_PUBLISHER_BALANCE
        );
        taskCollection[msg.sender][campaignIndex].isActive = false;
        publisherAccountBalance[msg.sender] = publisherAccountBalance[msg
            .sender]
            .sub(taskCollection[msg.sender][campaignIndex].currentBudget);
        uint256 campaignCurrentBudget = taskCollection[msg
            .sender][campaignIndex]
            .currentBudget;
        taskCollection[msg.sender][campaignIndex].currentBudget = 0;
        msg.sender.transfer(campaignCurrentBudget);
    }

    /** look up task based on the campaign's url */
    function lookupTask(string calldata _campaignUrl)
        external
        view
        returns (Task memory task)
    {
        (uint256 campaignIndex, ) = helperSelectTask(msg.sender, _campaignUrl);
        return taskCollection[msg.sender][campaignIndex];
    }

    /** forward rewards */
    function forwardRewards(
        address _userAddress,
        address _publisherAddress,
        string calldata _campaignUrl
    ) external payable onlyOwner() {
        (uint256 campaignIndex, ) = helperSelectTask(
            _publisherAddress,
            _campaignUrl
        );
        require(
            taskCollection[_publisherAddress][campaignIndex].isActive,
            CAMPAIGN_NOT_ACTIVE
        );
        require(
            publisherAccountBalance[_publisherAddress] >
                taskCollection[_publisherAddress][campaignIndex].taskReward,
            NOT_ENOUGH_PUBLISHER_BALANCE
        );
        /** decreases campaign task's current budget by campaign's reward */
        taskCollection[_publisherAddress][campaignIndex]
            .currentBudget = taskCollection[_publisherAddress][campaignIndex]
            .currentBudget
            .sub(taskCollection[_publisherAddress][campaignIndex].taskReward);
        /** decreases the balance of the campaign's owner by the campaign's reward */
        publisherAccountBalance[_publisherAddress] = publisherAccountBalance[_publisherAddress]
            .sub(taskCollection[_publisherAddress][campaignIndex].taskReward);
        /** increases the user's balance by the campaign's rewrd */
        userAccountBalance[_userAddress] = userAccountBalance[_userAddress].add(
            taskCollection[_publisherAddress][campaignIndex].taskReward
        );
        /** if the updated campaign's current budget is less than the campaign's reward, then the campaign is not active anymore */
        if (
            publisherAccountBalance[_publisherAddress] <=
            taskCollection[_publisherAddress][campaignIndex].taskReward
        ) {
            taskCollection[_publisherAddress][campaignIndex].isActive = false;
        }
    }

    /**
        ####
        internal functions
        ####
     */

    /** select correct task based on the address of the publisher and the campaign's url */
    function helperSelectTask(address _address, string memory _campaignUrl)
        internal
        view
        returns (uint256, bool)
    {
        uint256 indx = 0;
        bool found = false;
        for (uint256 i = 0; i < taskCollection[_address].length; i++) {
            string memory url = taskCollection[_address][i].url;
            if (keccak256(bytes(url)) == keccak256(bytes(_campaignUrl))) {
                indx = i;
                found = true;
            }
        }
        return (indx, found);
    }
}
