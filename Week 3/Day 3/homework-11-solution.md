# Homework 11 

Go back to [Week 3](/Week%203/week-3-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

Create a project and:
- Use `forge init <project_name>` for the default template or use this [template]().
>You can find the project [here](/Week%203/Day%203/hw_11/).
>
>**PaulRBerg template** was used.
- Run the tests supplied to familiarise yourself with Foundry.

**Steps**:

```bash
$ forge init hw_11 --template https://github.com/PaulRBerg/foundry-template
Initializing /foundry-workspace/hw_11 from https://github.com/PaulRBerg/foundry-template...
    Initialized forge project.
$ cd hw_11 
$ pnpm install
Lockfile is up to date, resolution step is skipped
Packages: +76
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Packages are hard linked from the content-addressable store to the virtual store.
  Content-addressable store is at: /Library/pnpm/store/v3
  Virtual store is at:             node_modules/.pnpm
Progress: resolved 76, reused 76, downloaded 0, added 76, done

devDependencies:
+ prettier 2.8.4
+ rimraf 4.4.0
+ solhint 3.4.1

Done in 1.7s
$ forge test  
[⠒] Compiling...
[⠆] Compiling 18 files with 0.8.19
[⠑] Solc 0.8.19 finished in 3.27s
Compiler run successful

Running 3 tests for test/Foo.t.sol:FooTest
[PASS] testFork_Example() (gas: 3759)
[PASS] testFuzz_Example(uint256) (runs: 1000, μ: 3150, ~: 3150)
[PASS] test_Example() (gas: 3381)
Test result: ok. 3 passed; 0 failed; finished in 62.41ms
```

Back to [top](#homework-11)