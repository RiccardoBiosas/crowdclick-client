pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

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
    mapping(address => uint256) private _account_balances;
    mapping(address => uint256) private _campaign_owner_account_balance;
    mapping(address => uint256) private _user_account_balance;
    

     function openTask(uint256 _taskBudget, uint256 _taskReward, string memory _url) public payable returns(uint256) {
        require(msg.value == _taskBudget && (_account_balances[msg.sender] + msg.value) > _account_balances[msg.sender] );
        
        Task memory task_instance;
        task_instance.taskBudget = _taskBudget;
        task_instance.taskReward = _taskReward;
        task_instance.currentBudget = _taskBudget;
        task_instance.isActive = true;
        task_instance.url = _url;
        taskCollection[msg.sender].push(task_instance);
        
        _campaign_owner_account_balance[msg.sender] = _campaign_owner_account_balance[msg.sender].add(msg.value);
        return _campaign_owner_account_balance[msg.sender];
    }
    

    function lookUpTask(address _account_address, uint256 index) public view returns(uint256, uint256)  {
        require(taskCollection[_account_address][index].taskBudget != 0);
        return (taskCollection[_account_address][index].taskBudget, taskCollection[_account_address][index].taskReward);
    }

    function balancesOfPublisher(address _address) public view returns (uint256) {
        return _campaign_owner_account_balance[_address];
    }
    
    function balancesOfUser(address _address) public view returns(uint256) {
        return _user_account_balance[_address];
    }
    
    
    function withdrawUserBalance(uint256 withdrawAmount) payable public returns (uint256 updatedBalance) {
        require(withdrawAmount >= HARDCODED_MINIMUM_WITHDRAWAL && withdrawAmount <= _user_account_balance[msg.sender]);
        _user_account_balance[msg.sender] = _user_account_balance[msg.sender].sub(withdrawAmount);
        msg.sender.transfer(withdrawAmount);
        return _user_account_balance[msg.sender];
    }
    
    function withdrawFromCampaign(string memory _url) payable public returns(uint256) {
        (uint256 campaign_indx, ) = helper_selectTask(msg.sender, _url);
        require(taskCollection[msg.sender][campaign_indx].currentBudget > 0 && _campaign_owner_account_balance[msg.sender] >= taskCollection[msg.sender][campaign_indx].currentBudget); 
        taskCollection[msg.sender][campaign_indx].isActive = false; //move it inside helper_selecttask
        _campaign_owner_account_balance[msg.sender] = _campaign_owner_account_balance[msg.sender].sub(taskCollection[msg.sender][campaign_indx].currentBudget);
        msg.sender.transfer(taskCollection[msg.sender][campaign_indx].currentBudget);            
        taskCollection[msg.sender][campaign_indx].currentBudget = 0;
        return _campaign_owner_account_balance[msg.sender];
    }
    
    

    function helper_selectTask(address _address, string memory _url) internal view returns(uint256, bool) {
        uint indx = 0;
        bool found = false;
        for(uint256 i=0; i<taskCollection[_address].length; i++) {
            string memory url = taskCollection[_address][i].url;
            if(keccak256(bytes(url))  == keccak256(bytes(_url))){
                indx = i;
                found = true;
            }
        }
        return (indx, found);
    }

    function forwardRewards(address _userAddr, address _publisherAddr, string memory _url) public payable onlyOwner() returns(uint256, uint256)  {
        (uint256 campaign_indx, ) = helper_selectTask(_publisherAddr, _url);
        require(taskCollection[_publisherAddr][campaign_indx].isActive && _campaign_owner_account_balance[_publisherAddr] > taskCollection[_publisherAddr][campaign_indx].taskReward && taskCollection[_publisherAddr][campaign_indx].taskReward <= taskCollection[_publisherAddr][campaign_indx].currentBudget, "not enough balance");
        taskCollection[_publisherAddr][campaign_indx].currentBudget = taskCollection[_publisherAddr][campaign_indx].currentBudget.sub(taskCollection[_publisherAddr][campaign_indx].taskReward);
        _campaign_owner_account_balance[_publisherAddr] = _campaign_owner_account_balance[_publisherAddr].sub(taskCollection[_publisherAddr][campaign_indx].taskReward);
        _user_account_balance[_userAddr] = _user_account_balance[_userAddr].add(taskCollection[_publisherAddr][campaign_indx].taskReward);
        
        if(_campaign_owner_account_balance[_publisherAddr] <= taskCollection[_publisherAddr][campaign_indx].taskReward) {
          taskCollection[_publisherAddr][campaign_indx].isActive = false;
        }        
        return (_campaign_owner_account_balance[_publisherAddr], _user_account_balance[_userAddr]);
        
    }

}