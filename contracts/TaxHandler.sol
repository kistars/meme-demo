// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ITaxHandler.sol";

contract TaxHandler is ITaxHandler {
    struct stepTax {
        uint256 level;
        uint8 rate;
    }

    stepTax[] public stepTaxes;

    // 简易版本，还没支持权限更新和排序，默认输入是有序的
    function setStepTaxes(uint256[] memory levels, uint8[] memory rates) external {
        require(levels.length > 0);
        require(levels.length == rates.length, "length must same");
        for (uint256 i = 0; i < levels.length; i++) {
            stepTax memory t = stepTax({level: levels[i], rate: rates[i]});
            stepTaxes.push(t);
        }
    }

    function getTax(uint256 amount) external view returns (uint256) {
        for (uint256 i = stepTaxes.length; i > 0; i--) {
            if (amount >= stepTaxes[i - 1].level) {
                return amount * stepTaxes[i - 1].rate / 100;
            }
        }
        return 0;
    }
}
