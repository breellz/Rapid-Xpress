import { User } from "../entities/user.entity"
import datasource from "../db/db"
import bcrypt from "bcryptjs"

export const createUser = async (email: string, password: string) => {
  try {
    const userRepo = datasource.getRepository(User)
    const user = userRepo.create({ email, password })
    await userRepo.save(user)
    return user
  } catch (error) {
    throw error
  }
}

export const findByCredentials = async (email: string, password: string) => {
  try {
    const userRepo = datasource.getRepository(User)
    const user = await userRepo.findOne({ where: { email } })
    if (!user) {
      throw new Error("Invalid login credentials")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error("Invalid login credentials")
    }
    return user
  } catch (error) {
    throw error
  }
}
