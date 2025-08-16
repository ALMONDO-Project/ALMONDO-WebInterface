import GraphParam from "./GraphParam";

export default class CompleteGraphParams {
  private _numOfAgents: GraphParam;

  constructor(numOfAgents: number) {
    this._numOfAgents = new GraphParam(
      "Number of Agents",
      numOfAgents,
      () => numOfAgents >= 100 && numOfAgents <= 10000
    );
  }

  updateParam(label: string, newValue: number) {
    const updatedParams = new CompleteGraphParams(this._numOfAgents.value);

    const parameter = updatedParams
      .getParams()
      .find((param) => param.label === label)!;
    parameter.value = newValue;
    parameter.validatorFun = () => newValue >= 100 && newValue <= 10000;

    return updatedParams;
  }

  areParamsValid() {
    const allParams = this.getParams();
    return (
      allParams.filter((param) => param.isValid()).length === allParams.length
    );
  }

  getParams() {
    return [this._numOfAgents];
  }
}
