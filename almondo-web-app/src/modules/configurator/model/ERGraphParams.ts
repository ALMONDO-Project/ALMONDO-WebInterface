import CompleteGraphParams from "./CompleteGraphParams";
import GraphParam from "./GraphParam";

export default class ERGraphParams extends CompleteGraphParams {
  private _probability: GraphParam;

  constructor(numOfAgents: number, probability: number) {
    super(numOfAgents);
    this._probability = new GraphParam(
      "Probability",
      0.1,
      () => probability >= 0 && probability <= 1
    );
  }

  updateParam(label: string, newValue: number) {
    const updatedParams = new ERGraphParams(
      super
        .getParams()
        .find((param) => param.label === "Number of Agents")!.value,
      this._probability.value
    );

    const parameter = updatedParams
      .getParams()
      .find((param) => param.label === label)!;
    let validatorFunction;
    switch (parameter.label) {
      case "Number of Agents":
        validatorFunction = () => newValue >= 100 && newValue <= 10000;
        break;
      case "Probability":
        validatorFunction = () => newValue >= 0 && newValue <= 1;
        break;
      default:
        throw new Error(`No such param: ${label}`);
    }
    parameter.value = newValue;
    parameter.validatorFun = validatorFunction;

    return updatedParams;
  }

  getParams(): GraphParam[] {
    return super.getParams().concat(this._probability);
  }
}
