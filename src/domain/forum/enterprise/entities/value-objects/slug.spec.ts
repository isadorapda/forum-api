import { Slug } from './slug'

test('Should be able to create a new slug from a text', () => {
  const slug = Slug.createFromText('Example of_text to- slug!')

  expect(slug.value).toEqual('example-of-text-to-slug')
})
