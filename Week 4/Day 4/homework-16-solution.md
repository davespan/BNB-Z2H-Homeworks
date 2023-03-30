# Homework 16

Go back to [Week 4](/Week%204/week-4-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

**CTF** Details:
- Interface: [0xBdAD640fAAF2F505ed59ecd67A5e51880142f51f](https://testnet.bscscan.com/address/0xBdAD640fAAF2F505ed59ecd67A5e51880142f51f#code).
- Click on a level to start. **Level 0** is a tutorial.
- Levels:

    | #	|Level Name       |	Max Score |
    |:--|:----------------|:----------|
    | 0	| Tutorial        |	2         |
    | 1	| Matrix Addition |	3         |
    | 2	| Array Sorting	  | 5         |
    | 3	| CodeSize	      | 2         |
    | 4 | Storage	      | 3         |

You get 1 point for submitting a solution and up to the maximum for correct solutions.

With the following solutions you get **Max score** but they are not gas efficient:

**Level0.sol**

```sol
pragma solidity 0.8.19;

contract Level_0_Solution {

	  function solution() external pure returns (uint8) {
        return 42; 
      }
}
```

**Level1.sol**

```sol
pragma solidity 0.8.19;

contract Level_1_Solution {

    function solution(uint256[2][2] calldata x, uint256[2][2] calldata y) external pure returns (uint256[2][2] memory finalArray) {
    
        uint256[2][2] memory result;

        for (uint256 i = 0; i < 2; i++) {
            for (uint256 j = 0; j < 2; j++) {
                result[i][j] = x[i][j] + y[i][j];
            }
        }

        return result; 
    
    }
}
```

**Level2.sol**

```sol
pragma solidity 0.8.19;

contract Level_2_Solution {
        
    function solution(uint256[10] calldata unsortedArray) external returns (uint256[10] memory sortedArray) {
        sortedArray = unsortedArray;
        uint tmp;
        
        for (uint i = 0; i < sortedArray.length - 1; i++) {
            for (uint j = 0; j < sortedArray.length - i - 1; j++) {
                if (sortedArray[j] > sortedArray[j + 1]) {
                    tmp = sortedArray[j];
                    sortedArray[j] = sortedArray[j + 1];
                    sortedArray[j + 1] = tmp;
                }
            }
        }
        return sortedArray;
    }
}
```

**Levels3.sol**

```sol
pragma solidity 0.8.19;

contract Level_3_Solution {
        
    function solution(address addr) external view returns (uint256 codeSize) {
        assembly {
            codeSize := extcodesize(addr)
        }
    }
}
```

**Level4.sol**

```sol
pragma solidity 0.8.19;

contract Level_4_Solution {
        
    function solution(uint256 value) external {
        assembly {
            sstore(3, value)
        }

    }
    
}
```

Back to [top](#homework-16)