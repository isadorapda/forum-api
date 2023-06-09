import { ServicesError } from '@/core/errors/services-error'

export class ResourceNotFoundError extends Error implements ServicesError {
  constructor() {
    super('Resource not found.')
  }
}
