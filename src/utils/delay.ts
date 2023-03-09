export const delay = (time = 500): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, time, void 0));
