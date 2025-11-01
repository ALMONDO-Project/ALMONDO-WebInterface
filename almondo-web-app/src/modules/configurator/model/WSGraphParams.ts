import GraphParam from "./GraphParam";

export default class WSGraphParams {
  private _numOfAgents: GraphParam;
  private _kNeighbors: GraphParam;
  private _probability: GraphParam;

  constructor(numOfAgents: number, probability: number, kNeighbors: number) {
    this._numOfAgents = new GraphParam(
      "Number of Agents",
      numOfAgents,
      () => numOfAgents >= 100 && numOfAgents <= 10000
    );
    this._probability = new GraphParam(
      "Rewiring Probability",
      probability,
      () => probability >= 0 && probability <= 1
    );
    this._kNeighbors = new GraphParam(
      "K-Neighbors",
      kNeighbors,
      () =>
        kNeighbors >= 2 &&
        kNeighbors % 2 === 0 &&
        kNeighbors <= Math.floor(numOfAgents * 0.1)
    );
  }

  updateParam(label: string, newValue: number) {
    const updatedParams = new WSGraphParams(
      this._numOfAgents.value,
      this._probability.value,
      this._kNeighbors.value
    );
    const parameter = updatedParams
      .getParams()
      .find((param) => param.label === label)!;
    let validatorFunction;
    switch (parameter.label) {
      case "Number of Agents":
        validatorFunction = () => newValue >= 100 && newValue <= 10000;
        break;
      case "Rewiring Probability":
        validatorFunction = () => newValue >= 0 && newValue <= 1;
        break;
      case "K-Neighbors":
        validatorFunction = () =>
          newValue >= 2 &&
          newValue % 2 === 0 &&
          newValue <= this._numOfAgents.value;
        break;
      default:
        throw new Error(`No such param: ${label}`);
    }
    parameter.value = newValue;
    parameter.validatorFun = validatorFunction;

    return updatedParams;
  }

  areParamsValid() {
    return this.getParams().every(p => p.isValid());
  }

  getParams(): GraphParam[] {
    return [this._numOfAgents, this._kNeighbors, this._probability];
  }
}
