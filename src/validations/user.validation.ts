import { z } from 'zod';

export const createUser = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    first_name: z.string().min(2).max(30),
    last_name: z.string().min(3).max(30),
  }),
});

export const updateUser = z.object({
  body: z.object({
    email: z.string().email().optional(),
    password: z.string().max(25).optional(),
    first_name: z.string().max(30).optional(),
    last_name: z.string().max(30).optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});
