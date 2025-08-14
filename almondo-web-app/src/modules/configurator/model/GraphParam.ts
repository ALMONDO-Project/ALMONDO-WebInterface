export default class GraphParam {
    private readonly _label: string;
    private _value: number;
    private _validatorFun: Function;

    constructor(label: string, value: number, validatorFun: Function) {
        this._label = label;
        this._value = value;
        this._validatorFun = validatorFun;
    }

    get label() {
        return this._label;
    }

    get value() {
        return this._value;
    }

    set value(newValue: number) {
        this._value = newValue;
    }

    set validatorFun(newValidatorFun: Function) {
        this._validatorFun = newValidatorFun;
    }

    isValid() {
        return this._validatorFun();
    }
}