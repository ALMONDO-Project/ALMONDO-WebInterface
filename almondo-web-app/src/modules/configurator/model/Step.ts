export default class Step {
  private stepNumber: number;
  private stepTitle: string;
  private isOptional: boolean;
  private isCompletable: boolean;
  private isCompleted: boolean;

  constructor(
    stepNumber: number,
    title: string,
    optional = false,
    completable = false,
    completed = false
  ) {
    this.stepNumber = stepNumber;
    this.stepTitle = title;
    this.isOptional = optional;
    this.isCompletable = completable;
    this.isCompleted = completed;
  }

  get number() {
    return this.stepNumber;
  }

  get title() {
    return this.stepTitle;
  }

  get optional() {
    return this.isOptional;
  }

  get completable() {
    return this.isCompletable;
  }

  get completed() {
    return this.isCompleted;
  }

  makeCompletable() {
    this.isCompletable = true;
  }

  complete() {
    if (this.completable) {
      this.isCompleted = true;
    }
  }
}
