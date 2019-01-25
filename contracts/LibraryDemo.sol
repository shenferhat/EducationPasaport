pragma solidity ^0.5.0;

contract LibraryDemo {
    /*
    Combines DemoLibrary functionality with uint256 variable.
    Extending uint256 with DemoLibraries functions
    so math doesnt cause any buffer overflows
    */
    using DemoLibrary for uint256;

    function addTwoValues(uint256 x, uint256 y) public pure returns (uint256 z) {
        z = x.add(y);
        return z;
    }
}

library DemoLibrary {

    function mul(uint256 a, uint256 b) external pure returns (uint256) {
        uint256 c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) external pure returns (uint256) {
        uint256 c = a / b;
        return c;
    }


    function sub(uint256 a, uint256 b) external pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }


    function add(uint256 a, uint256 b) external pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}