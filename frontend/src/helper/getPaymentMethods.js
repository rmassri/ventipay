export const getPaymentMethods = async () => {
  let result = await fetch("http://127.0.0.1/payment_methods");
  const data = await result.json();
  return data.data;
};
