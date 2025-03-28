"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const factorial_1 = __importDefault(require("./factorial"));
describe('factorial function', () => {
    it('0! === 1', () => {
        expect((0, factorial_1.default)(0)).toBe(1);
    });
    it('1! === 1', () => {
        expect((0, factorial_1.default)(1)).toBe(1);
    });
    it('should return correct factorial for positive numbers', () => {
        expect((0, factorial_1.default)(5)).toBe(120); // 5! = 5 * 4 * 3 * 2 * 1 = 120
        expect((0, factorial_1.default)(3)).toBe(6); // 3! = 3 * 2 * 1 = 6
    });
    it('should throw error for decimal inputs', () => {
        expect(() => (0, factorial_1.default)(Math.PI)).toThrow("This method only supports integers.");
    });
    it('it works for very big numbers, but respect JS Precision limits.', () => {
        expect((0, factorial_1.default)(170)).toBe(7.257415615308004e+306);
        expect(() => (0, factorial_1.default)(171)).toThrow("This operation will cause a numeric overflow.");
    });
    it('should throw an error for negative numbers', () => {
        expect(() => (0, factorial_1.default)(-1)).toThrow();
    });
});
//# sourceMappingURL=factorial.spec.js.map