import slugify from 'slugify'

export const toSlug = (value: string) =>
  slugify(value, {
    strict: true,
    lower: true,
    remove: /[*#}{]/,
  })
