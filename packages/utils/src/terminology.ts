export type TerminologyRole = 'default' | 'security_company' | string;

const terms: Record<string, Record<string, string>> = {
  herd: { default: 'Herd', security_company: 'Kennel' },
  animal: { default: 'Animal', security_company: 'Dog' },
  animals: { default: 'Animals', security_company: 'Dogs' },
  waf_id: { default: 'WAF ID', security_company: 'K-ID' },
  register_animal: { default: 'Register animal', security_company: 'Register dog' },
  ear_tag: { default: 'Ear tag', security_company: 'Collar tag' },
  farmer: { default: 'Farmer', security_company: 'Company' },
  herd_stats: { default: 'Herd stats', security_company: 'Kennel stats' },
  farm: { default: 'Farm', security_company: 'Kennel' },
  species: { default: 'Species', security_company: 'Breed' },
  my_herd: { default: 'My Herd', security_company: 'My Kennel' },
};

export function getTerm(key: string, role: TerminologyRole = 'default'): string {
  const normalizedRole = role === 'SECURITY_COMPANY' ? 'security_company' : role;
  return terms[key]?.[normalizedRole] ?? terms[key]?.default ?? key;
}

export function isSecurityCompanyRole(role?: string | null): boolean {
  if (!role) return false;
  const key = role.toLowerCase();
  return key === 'security_company' || key === 'security company';
}
