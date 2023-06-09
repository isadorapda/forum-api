import { ServicesError } from '@/core/errors/services-error'

export class NotAllowedError extends Error implements ServicesError {
  constructor() {
    super('Not allowed.')
  }
}
