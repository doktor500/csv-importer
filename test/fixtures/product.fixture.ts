export const aProductSku = () => {
  const id = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;

  return `UK-${id}`;
};
