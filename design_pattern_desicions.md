# Design Pattern Decisions

## Singularity Design
Process focused singular smart contract and application interface.

## Fail early and fail loud
All functions check for valid conditions as early as possible, and thow an exception if they fail.

### Circuit Breaker
* The contract has emergency stop functionality

### Don't accept ether.
* The contract is reversing ether sendings.

## Restricting Access
* The contract has ownership, and ownership is transferable

## Upgradability
* The contract can change its backend.

## Rate Limit
* The contract has rate limits connect to the time. Some functions has cooldown time to recall.
