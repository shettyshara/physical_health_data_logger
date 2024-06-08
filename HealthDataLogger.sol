// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthDataLogger {
    struct HealthData {
        string name;
        uint256 age;
        string gender;
        string usn;
        string height;
        string weight;
        string bloodGroup;
    }

    HealthData[] public healthDataEntries;

    event DataLogged(
        string name,
        uint256 age,
        string gender,
        string usn,
        string height,
        string weight,
        string bloodGroup
    );

    function logData(
        string memory name,
        uint256 age,
        string memory gender,
        string memory usn,
        string memory height,
        string memory weight,
        string memory bloodGroup
    ) public {
        HealthData memory newData = HealthData({
            name: name,
            age: age,
            gender: gender,
            usn: usn,
            height: height,
            weight: weight,
            bloodGroup: bloodGroup
        });

        healthDataEntries.push(newData);

        emit DataLogged(
            name,
            age,
            gender,
            usn,
            height,
            weight,
            bloodGroup
        );
    }

    function getHealthDataEntries() public view returns (HealthData[] memory) {
        return healthDataEntries;
    }
}
