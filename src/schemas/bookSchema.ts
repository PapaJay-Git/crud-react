import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  ISBN: z.string().min(1, 'ISBN is required'),
  publishedDate: z.string().date("Published Date is required"),
  genre: z.string().min(1, 'Genre is required'),
});
