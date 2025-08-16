import CompleteGraphParams from "./CompleteGraphParams";
import GraphParam from "./GraphParam";

export default class WSGraphParams extends CompleteGraphParams {
  private _kNeighbors: GraphParam;
  private _probability: GraphParam;

  constructor(numOfAgents: number, probability: number, kNeighbors: number) {
    super(numOfAgents);
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
      super
        .getParams()
        .find((param) => param.label === "Number of Agents")!.value,
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
          newValue <=
            0.1 *
              super
                .getParams()
                .find((param) => param.label === "Number of Agents")!.value;
        break;
      default:
        throw new Error(`No such param: ${label}`);
    }
    parameter.value = newValue;
    parameter.validatorFun = validatorFunction;

    return updatedParams;
  }

  getParams(): GraphParam[] {
    return super.getParams().concat(this._kNeighbors, this._probability);
  }
}
