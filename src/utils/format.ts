export const formatMoney = (amount: number): string =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(amount);

export const formatString = (
  maskType: "cpf" | "cnpj" | "random_key" | "phone",
  value: string
) => {
  let format = {
    cpf: value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
    cnpj: value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    ),
    random_key: value.replace(
      /(.{8})(.{4})(.{4})(.{4})(.{12})/,
      "$1-$2-$3-$4-$5"
    ),
    phone: value.replace(/(\d{9})(\d{4})(\d{4})/, "$1 $2-$3"),
  };

  return format[maskType];
};
