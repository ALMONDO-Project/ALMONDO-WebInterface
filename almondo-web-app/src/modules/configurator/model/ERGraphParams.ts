import CompleteGraphParams from "./CompleteGraphParams";
import GraphParam from "./GraphParam";

export default class ERGraphParams extends CompleteGraphParams {
  private _probability: GraphParam;
  private _seed: GraphParam;

  constructor(numOfAgents: number, probability: number, seed: number = 42) {
    super(numOfAgents);
    this._probability = new GraphParam(
      "Probability",
      probability,
      () => probability >= 0 && probability <= 1
    );
    this._seed = new GraphParam(
      "Seed",
      seed,
      () => seed > 0
    )
  }

  updateParam(label: string, newValue: number) {
    const updatedParams = new ERGraphParams(
      super
        .getParams()
        .find((param) => param.label === "Number of Agents")!.value,
      this._probability.value,
      this._seed.value
    );

    const parameter = updatedParams
      .getParams()
      .find((param) => param.label === label)!;
    let validatorFunction;
    switch (parameter.label) {
      case "Number of Agents":
        validatorFunction = () => newValue >= 2 && newValue <= 10000;
        break;
      case "Probability":
        validatorFunction = () => newValue >= 0 && newValue <= 1;
        break;
      case "Seed":
        validatorFunction = () => newValue > 0;
        break;
      default:
        throw new Error(`No such param: ${label}`);
    }
    parameter.value = newValue;
    parameter.validatorFun = validatorFunction;

    return updatedParams;
  }

  getParams(): GraphParam[] {
    return super.getParams().concat(this._probability, this._seed);
  }
}
