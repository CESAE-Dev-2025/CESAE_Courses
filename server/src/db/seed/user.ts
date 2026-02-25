import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { drizzle } from 'drizzle-orm/mysql2'
import { eq } from 'drizzle-orm'
import { users } from '../schema'

async function main() {
  const db = drizzle(process.env.DATABASE_URL!)

  const username = 'admin'
  const plainPassword = 'admin'
  const role = 'admin'

  const [existing] = await db.select().from(users).where(eq(users.username, username)).limit(1)

  const hashed = await bcrypt.hash(plainPassword, 10)

  if (!existing) {
    await db.insert(users).values({ username, password: hashed, role })
    console.log('Usuário admin criado com sucesso.')
  } else {
    // Garante que a password/role estejam corretas
    // Atualiza apenas se a hash for diferente ou role diferente
    if (existing.password !== hashed || existing.role !== role) {
      await db
        .update(users)
        .set({ password: hashed, role })
        .where(eq(users.username, username))
      console.log('Usuário admin já existia. Password/role atualizados.')
    } else {
      console.log('Usuário admin já existe com as mesmas credenciais. Nada a fazer.')
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
