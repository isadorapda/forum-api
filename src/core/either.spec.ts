import { Either, left, right } from './either'

function doSomething(isSuccess: boolean): Either<string, string> {
  if (isSuccess) {
    return right('success')
  } else {
    return left('error')
  }
}

test('Success Result', () => {
  const success = doSomething(true)

  expect(success.isRight()).toBeTruthy()
  expect(success.isLeft()).toBe(false)
})

test('Error Result', () => {
  const error = doSomething(false)
  expect(error.isLeft).toBeTruthy()
  expect(error.isRight()).toBe(false)
})
