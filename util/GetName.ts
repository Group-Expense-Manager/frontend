export function getName(firstName?: string, lastName?: string): string | undefined {
  switch (true) {
    case !!firstName && !!lastName:
      return `${firstName} ${lastName}`;
    case !!firstName:
      return firstName;
    case !!lastName:
      return lastName;
    default:
      return undefined;
  }
}
