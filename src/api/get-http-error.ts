export type HTTPError = {
  message: string;
};

export const getHTTPError = (
  error: any,
  defaultMessage = "Some error occured in request action!"
): HTTPError => {
  let message = defaultMessage;

  if (error.data?.message) message = error?.error?.message;

  if (error?.error?.message) message = error?.error?.message;

  if (error?.error?.error) message = error?.error?.error;

  if (error?.message?.error) message = error?.message?.error;

  if (error?.message) message = error?.message;

  if (typeof error === "string") message = error;

  return { message };
};
