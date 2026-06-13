export function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${String(x)}`);
}

export { getTerm, isSecurityCompanyRole } from './terminology';
export type { TerminologyRole } from './terminology';

