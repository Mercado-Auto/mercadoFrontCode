export const debounce = async (time: number) => {
  return await new Promise<void>((resolve) =>
    setTimeout(() => resolve(), time));
};
