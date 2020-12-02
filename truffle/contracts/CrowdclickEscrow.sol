pragma solidity ^0.5.0;
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract CrowdclickEscrow is Ownable {
    using SafeMath for uint256;

    struct Task {
        uint256 taskBudget;
        uint256 taskReward;
        bool isActive;
        string url;
        uint256 currentBudget;
    }

    uint256 HARDCODED_MINIMUM_WITHDRAWAL = 30000000000000000 wei; // = 0.03 ethereum
    mapping(address => Task[]) public taskCollection;
    mapping(address => uint256) private publisherAccountBalance;
    mapping(address => uint256) private userAccountBalance;

    function openTask(
        uint256 _taskBudget,
        uint256 _taskReward,
        string calldata _url
    ) external payable returns (uint256) {
        require(msg.value == _taskBudget, "wrong budget");

        Task memory task_instance;
        task_instance.taskBudget = _taskBudget;
        task_instance.taskReward = _taskReward;
        task_instance.currentBudget = _taskBudget;
        task_instance.isActive = true;
        task_instance.url = _url;
        taskCollection[msg.sender].push(task_instance);

        publisherAccountBalance[msg.sender] = publisherAccountBalance[msg
            .sender]
            .add(msg.value);
        return publisherAccountBalance[msg.sender];
    }

    function balanceOfPublisher(address _address)
        external
        view
        returns (uint256)
    {
        return publisherAccountBalance[_address];
    }

    function balanceOfUser(address _address) external view returns (uint256) {
        return userAccountBalance[_address];
    }

    function withdrawUserBalance(uint256 withdrawAmount)
        external
        payable
        returns (uint256 updatedBalance)
    {
        require(
            withdrawAmount >= HARDCODED_MINIMUM_WITHDRAWAL &&
                withdrawAmount <= userAccountBalance[msg.sender]
        );
        userAccountBalance[msg.sender] = userAccountBalance[msg.sender].sub(
            withdrawAmount
        );
        msg.sender.transfer(withdrawAmount);
        return userAccountBalance[msg.sender];
    }

    function withdrawFromCampaign(string calldata _url) external payable {
        (uint256 campaignIndex, ) = helperSelectTask(msg.sender, _url);
        require(
            taskCollection[msg.sender][campaignIndex].currentBudget > 0 &&
                publisherAccountBalance[msg.sender] >=
                taskCollection[msg.sender][campaignIndex].currentBudget
        );
        taskCollection[msg.sender][campaignIndex].isActive = false;
        publisherAccountBalance[msg.sender] = publisherAccountBalance[msg
            .sender]
            .sub(taskCollection[msg.sender][campaignIndex].currentBudget);
        msg.sender.transfer(
            taskCollection[msg.sender][campaignIndex].currentBudget
        );
        taskCollection[msg.sender][campaignIndex].currentBudget = 0;
    }

    function helperSelectTask(address _address, string memory _url)
        internal
        view
        returns (uint256, bool)
    {
        uint256 indx = 0;
        bool found = false;
        for (uint256 i = 0; i < taskCollection[_address].length; i++) {
            string memory url = taskCollection[_address][i].url;
            if (keccak256(bytes(url)) == keccak256(bytes(_url))) {
                indx = i;
                found = true;
            }
        }
        return (indx, found);
    }

    function forwardRewards(
        address _userAddr,
        address _publisherAddr,
        string calldata _url
    ) external payable onlyOwner() {
        (uint256 campaignIndex, ) = helperSelectTask(_publisherAddr, _url);
        require(
            taskCollection[_publisherAddr][campaignIndex].isActive &&
                publisherAccountBalance[_publisherAddr] >
                taskCollection[_publisherAddr][campaignIndex].taskReward &&
                taskCollection[_publisherAddr][campaignIndex].taskReward <=
                taskCollection[_publisherAddr][campaignIndex].currentBudget,
            "not enough balance"
        );
        taskCollection[_publisherAddr][campaignIndex]
            .currentBudget = taskCollection[_publisherAddr][campaignIndex]
            .currentBudget
            .sub(taskCollection[_publisherAddr][campaignIndex].taskReward);
        publisherAccountBalance[_publisherAddr] = publisherAccountBalance[_publisherAddr]
            .sub(taskCollection[_publisherAddr][campaignIndex].taskReward);
        userAccountBalance[_userAddr] = userAccountBalance[_userAddr].add(
            taskCollection[_publisherAddr][campaignIndex].taskReward
        );

        if (
            publisherAccountBalance[_publisherAddr] <=
            taskCollection[_publisherAddr][campaignIndex].taskReward
        ) {
            taskCollection[_publisherAddr][campaignIndex].isActive = false;
        }
    }
}
