import GraphParam from "./GraphParam";

export default class CompleteGraphParams {
  private _numOfAgents: GraphParam;

  constructor(numOfAgents: number) {
    this._numOfAgents = new GraphParam(
      "Number of Agents",
      numOfAgents,
      () => numOfAgents >= 2 && numOfAgents <= 10000
    );
  }

  updateParam(label: string, newValue: number) {
    const updatedParams = new CompleteGraphParams(this._numOfAgents.value);

    const parameter = updatedParams
      .getParams()
      .find((param) => param.label === label)!;
    parameter.value = newValue;
    parameter.validatorFun = () => newValue >= 2 && newValue <= 10000;

    return updatedParams;
  }

  areParamsValid() {
    return this.getParams().every(p => p.isValid());
  }

  getParams() {
    return [this._numOfAgents];
  }
}
