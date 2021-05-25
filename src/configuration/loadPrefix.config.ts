/**
 * LoadPrefix.
 * @description Load prefix acordding to the environment.
 */

export const loadPrefix = () => {
  const env = process.env.NODE_ENV
  switch (env) {
    case 'production':
      return ''
    default:
      return 'DEV_'
  }
}
