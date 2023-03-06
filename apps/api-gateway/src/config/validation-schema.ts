import * as Joi from 'joi';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    export interface ProcessEnv {
      readonly PORT: string;
      readonly NODE_ENV: 'development' | 'production' | 'test' | 'ci';
      readonly SECRET: string;
    }
  }
}

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'ci')
    .default('development'),
  PORT: Joi.number().default(3333),
  SECRET: Joi.string().min(16).required(),
});
