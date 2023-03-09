export const getError = (error: any): { title: string; message: string; } => {
  let message = 'An error occured';

  if (error.message) {
    message = error.message;
  } else if (error.data.message) {
    message = error.data.message;
  } else if (error.error.message) {
    message = error.error.message;
  }

  return {
    title: 'Error',
    message,
  }
}
