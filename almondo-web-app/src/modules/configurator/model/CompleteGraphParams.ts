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
    const parameter = this.getParams().find(param => param.label === label)!;
    parameter.value = newValue;
    parameter.validatorFun = () => newValue >= 100 && newValue <= 10000;
  }

  getParams() {
    return [this._numOfAgents];
  }
}
