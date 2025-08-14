import CompleteGraphParams from "./CompleteGraphParams";
import GraphParam from "./GraphParam";

export default class BAGraphParams extends CompleteGraphParams {
  private _edges: GraphParam;

  constructor(numOfAgents: number, edges: number) {
    super(numOfAgents);
    this._edges = new GraphParam(
      "Edges to Attach",
      edges,
      () => edges >= 1 && edges <= numOfAgents
    );
  }

  updateParam(label: string, newValue: number) {
    const parameter = this.getParams().find((param) => param.label === label)!;
    let validatorFunction;
    switch (parameter.label) {
      case "Number of Agents":
        validatorFunction = () => newValue >= 100 && newValue <= 10000;
        break;
      case "Edges to Attach":
        validatorFunction = () =>
          newValue >= 1 &&
          newValue <=
            super
              .getParams()
              .find((param) => param.label === "Number of Agents")!.value - 1;
        break;
      default:
        throw new Error(`No such param: ${label}`);
    }
    parameter.value = newValue;
    parameter.validatorFun = validatorFunction;
  }

  getParams(): GraphParam[] {
    return super.getParams().concat(this._edges);
  }
}
