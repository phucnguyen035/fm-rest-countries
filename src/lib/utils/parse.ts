import { error } from '@sveltejs/kit';
import type { z } from 'zod';

const handleParseResult = <Input, Output>(result: z.SafeParseReturnType<Input, Output>) => {
  if (!result.success) {
    throw error(500, { message: 'Error parsing object', stack: result.error.stack });
  }

  return result.data;
};

export const parseJsonObject = async <Shape extends z.ZodRawShape>(
  object: z.ZodObject<Shape>,
  json: unknown,
) => {
  return handleParseResult(await object.safeParseAsync(json));
};

export const parseJsonArray = async <O extends z.AnyZodObject>(object: O, json: unknown) => {
  return handleParseResult(await object.array().safeParseAsync(json));
};
