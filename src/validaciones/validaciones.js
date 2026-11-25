// 1. Texto: > 3 caracteres (sin contar espacios extremos) y al menos 1 letra
export const validarTextoMinimo = (valor, min = 4, label = "El campo") => {
  const texto = String(valor ?? "").trim();

  if (texto.length < min) {
    return `${label} debe tener al menos ${min} caracteres`;
  }
  if (!/[a-zA-ZÀ-ÿ]/.test(texto)) {
    return `${label} debe contener al menos una letra`;
  }

  return "";
};

// 2. Numérico con signos y separadores (-, +, ., ,) y al menos 1 dígito
export const validarNumeroFormato = (valor, label = "El campo") => {
  const texto = String(valor ?? "").trim();

  if (!texto) {
    return `${label} es obligatorio`;
  }
  // Solo permite dígitos y los caracteres -, +, ., , (sin espacios intermedios ni letras)
  if (!/^[+\-.,\d]+$/.test(texto) || !/\d/.test(texto)) {
    return `${label} tiene un formato numérico inválido`;
  }

  return "";
};

// 3. No vacío (ej. peso)
export const validarNoVacio = (valor, label = "El campo") => {
  const texto = String(valor ?? "").trim();

  if (!texto) {
    return `${label} es obligatorio`;
  }

  return "";
};