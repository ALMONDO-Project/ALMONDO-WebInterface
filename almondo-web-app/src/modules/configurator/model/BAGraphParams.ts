import CompleteGraphParams from "./CompleteGraphParams";
import GraphParam from "./GraphParam";

export default class BAGraphParams extends CompleteGraphParams {
  private _edges: GraphParam;
  private _seed: GraphParam;

  constructor(numOfAgents: number, edges: number, seed: number = 42) {
    super(numOfAgents);
    this._edges = new GraphParam(
      "Edges to Attach",
      edges,
      () => edges >= 1 && edges <= numOfAgents
    );
    this._seed = new GraphParam("Seed", seed, () => seed > 0);
  }

  updateParam(label: string, newValue: number) {
    const updatedParams = new BAGraphParams(
      super
        .getParams()
        .find((param) => param.label === "Number of Agents")!.value,
      this._edges.value,
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
      case "Edges to Attach":
        validatorFunction = () =>
          newValue >= 1 &&
          newValue <=
            super
              .getParams()
              .find((param) => param.label === "Number of Agents")!.value -
              1;
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
    return super.getParams().concat(this._edges, this._seed);
  }
}
