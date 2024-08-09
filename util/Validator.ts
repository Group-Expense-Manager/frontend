export class Validator {
  private validations: Validation[];

  constructor(validations: Validation[]) {
    this.validations = validations;
  }

  validate(input: string): string[] {
    const errors: string[] = [];

    this.validations.forEach((validation) => {
      if (typeof validation.rule === 'function') {
        if (!validation.rule(input)) {
          errors.push(validation.errorMessage);
        }
      } else {
        if (!validation.rule.test(input)) {
          errors.push(validation.errorMessage);
        }
      }
    });

    return errors;
  }
}

export interface Validation {
  rule: RegExp | ((input: string) => boolean);
  errorMessage: string;
}
