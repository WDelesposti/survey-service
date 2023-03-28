import { MissingParamError } from '../../errors'
import { type Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  test('Should return an erro if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissingParamError('any_field')
      }
    }
    const validationStubs = new ValidationStub()
    const sut = new ValidationComposite([validationStubs])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
