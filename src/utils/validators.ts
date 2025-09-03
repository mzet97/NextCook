/**
 * Utilitários para validação de dados
 */

/**
 * Validar email
 * @param email - Email a ser validado
 * @returns true se válido, false caso contrário
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validar CPF
 * @param cpf - CPF a ser validado
 * @returns true se válido, false caso contrário
 */
export function isValidCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, '');
  
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleaned)) return false; // Todos os dígitos iguais
  
  // Validar primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i]) * (10 - i);
  }
  let digit1 = 11 - (sum % 11);
  if (digit1 >= 10) digit1 = 0;
  
  if (parseInt(cleaned[9]) !== digit1) return false;
  
  // Validar segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned[i]) * (11 - i);
  }
  let digit2 = 11 - (sum % 11);
  if (digit2 >= 10) digit2 = 0;
  
  return parseInt(cleaned[10]) === digit2;
}

/**
 * Validar CNPJ
 * @param cnpj - CNPJ a ser validado
 * @returns true se válido, false caso contrário
 */
export function isValidCNPJ(cnpj: string): boolean {
  const cleaned = cnpj.replace(/\D/g, '');
  
  if (cleaned.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cleaned)) return false; // Todos os dígitos iguais
  
  // Validar primeiro dígito verificador
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleaned[i]) * weights1[i];
  }
  let digit1 = sum % 11;
  digit1 = digit1 < 2 ? 0 : 11 - digit1;
  
  if (parseInt(cleaned[12]) !== digit1) return false;
  
  // Validar segundo dígito verificador
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleaned[i]) * weights2[i];
  }
  let digit2 = sum % 11;
  digit2 = digit2 < 2 ? 0 : 11 - digit2;
  
  return parseInt(cleaned[13]) === digit2;
}

/**
 * Validar telefone brasileiro
 * @param phone - Telefone a ser validado
 * @returns true se válido, false caso contrário
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || cleaned.length === 11;
}

/**
 * Validar CEP
 * @param cep - CEP a ser validado
 * @returns true se válido, false caso contrário
 */
export function isValidCEP(cep: string): boolean {
  const cleaned = cep.replace(/\D/g, '');
  return cleaned.length === 8;
}

/**
 * Validar URL
 * @param url - URL a ser validada
 * @returns true se válida, false caso contrário
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validar senha forte
 * @param password - Senha a ser validada
 * @returns Objeto com resultado e critérios
 */
export function validatePassword(password: string): {
  isValid: boolean;
  criteria: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
} {
  const criteria = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  
  const isValid = Object.values(criteria).every(Boolean);
  
  return { isValid, criteria };
}

/**
 * Validar idade mínima
 * @param birthDate - Data de nascimento
 * @param minAge - Idade mínima
 * @returns true se atende idade mínima, false caso contrário
 */
export function isValidAge(birthDate: Date | string, minAge: number = 18): boolean {
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= minAge;
  }
  
  return age >= minAge;
}

/**
 * Validar se string não está vazia
 * @param value - Valor a ser validado
 * @returns true se não vazio, false caso contrário
 */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validar comprimento mínimo
 * @param value - Valor a ser validado
 * @param minLength - Comprimento mínimo
 * @returns true se atende comprimento mínimo, false caso contrário
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

/**
 * Validar comprimento máximo
 * @param value - Valor a ser validado
 * @param maxLength - Comprimento máximo
 * @returns true se não excede comprimento máximo, false caso contrário
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

/**
 * Validar se valor está dentro de um range
 * @param value - Valor numérico
 * @param min - Valor mínimo
 * @param max - Valor máximo
 * @returns true se está no range, false caso contrário
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validar se é um número
 * @param value - Valor a ser validado
 * @returns true se é número, false caso contrário
 */
export function isNumber(value: unknown): boolean {
  return !isNaN(parseFloat(String(value))) && isFinite(Number(value));
}

/**
 * Validar se é um inteiro
 * @param value - Valor a ser validado
 * @returns true se é inteiro, false caso contrário
 */
export function isInteger(value: unknown): boolean {
  return Number.isInteger(Number(value));
}