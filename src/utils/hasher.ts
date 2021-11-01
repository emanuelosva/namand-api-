export class Hasher {
  HASH_SALT_ROUNDS = 10
  bcrypt = require('bcrypt')

  async generateHash(value: string): Promise<string> {
    const salt = await this.bcrypt.genSalt(this.HASH_SALT_ROUNDS)
    return this.bcrypt.hash(value, salt)
  }

  async compareHash(value: string, hash: string): Promise<boolean> {
    return this.bcrypt.compare(value, hash).catch(() => false)
  }
}

export default new Hasher()
