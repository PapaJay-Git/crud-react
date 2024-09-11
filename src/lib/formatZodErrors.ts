import { ZodError } from 'zod';

export const formatZodErrors = (error: ZodError) => {
  let errorMessage = '';

  const formattedErrors = error.errors.map((err) => {
    errorMessage += err.message + '. ';  

    return {
      field: err.path.join('.'),
      message: err.message,
    };
  });

  return {
    error: formattedErrors,
    errorMessage: errorMessage.trim(), 
  };
};