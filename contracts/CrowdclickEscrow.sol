pragma solidity ^0.5.0;

// import "openzeppelin-solidity/contracts/math/SafeMath.sol";
// import "@openzeppelin/contracts/math/SafeMath.sol";


/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     *
     * _Available since v2.4.0._
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * _Available since v2.4.0._
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * _Available since v2.4.0._
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}


contract CrowdclickEscrow {
    
    using SafeMath for uint256;
    
    enum TaskState {Closed, Open}   
   
 
    uint256 HARDCODED_MINIMUM_WITHDRAWAL = 30000000000000000 wei; // = 0.03 ethereum
    mapping(address => uint256) public taskBudget;
    mapping(address => uint256) public taskReward;
    mapping(address => uint256) private _account_balances;
    mapping(address => TaskState) private _taskState; 
    address public owner;
    
    constructor() public {
        owner = msg.sender;
        
    }
    
    modifier isOwner() {
        require(msg.sender == owner);       
        _;
    }
    
    // function openTask(uint256 _taskBudget, uint256 _taskReward) public {
    //     require(_taskState[msg.sender] == TaskState.Closed);
    //     taskBudget[msg.sender] = _taskBudget;
    //     taskReward[msg.sender] = _taskReward;
    //     _taskState[msg.sender] = TaskState.Open;
    // }

     function openTask(uint256 _taskBudget, uint256 _taskReward) public payable returns(uint256) {
        require(msg.value == _taskBudget && (_account_balances[msg.sender] + msg.value) > _account_balances[msg.sender] );
        taskBudget[msg.sender] = _taskBudget;
        taskReward[msg.sender] = _taskReward;
        _taskState[msg.sender] = TaskState.Open;

        _account_balances[msg.sender] = _account_balances[msg.sender].add(msg.value);
        return _account_balances[msg.sender];
    }

    function balancesOf(address account_address) public view returns (uint256) {
        return _account_balances[account_address];
    }

    function whoIsOwner() public view returns(address) {
        return owner;
    }
    
    // function deposit() public payable returns (uint256) {
    //     require(msg.value > taskBudget[msg.sender] && (_account_balances[msg.sender] + msg.value) > _account_balances[msg.sender]);
    //     _account_balances[msg.sender] = _account_balances[msg.sender].add(msg.value);
    //     return _account_balances[msg.sender];
    // }
    
    function withdraw(uint256 withdrawAmount) payable public returns (uint256 updatedBalance) {
        require(withdrawAmount >= HARDCODED_MINIMUM_WITHDRAWAL && withdrawAmount <= _account_balances[msg.sender]);
        _account_balances[msg.sender] = _account_balances[msg.sender].sub(withdrawAmount);
        msg.sender.transfer(withdrawAmount);
        return (_account_balances[msg.sender]);
    }
    //careful: i removed the is owner modifier for testing purposes    

    function forwardRewards(address user, address publisher) public payable returns(uint256 userUpdatedBalance, uint256 publisherUpdatedBalance)  {
        require(_taskState[publisher] == TaskState.Open && _account_balances[publisher] > taskReward[msg.sender]);
        _account_balances[publisher] = _account_balances[publisher].sub(taskReward[publisher]);
        _account_balances[user] = _account_balances[user].add(taskReward[publisher]);
        
        if(_account_balances[publisher] < taskReward[msg.sender]) {
           _taskState[publisher] = TaskState.Closed;
        }
        
        return (_account_balances[publisher], _account_balances[user]);
        
    }
    //only the owner of the contract should be able to call taskCompleted
    
    function queryTaskState(address addr) public view returns(string memory) {
        if (TaskState.Open == _taskState[addr]) return "Open";
        if (TaskState.Closed == _taskState[addr]) return "Closed";
        return "";
    }
    
}
