import bcrypt from 'bcryptjs'

export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

export const authenticatePassword = async (password, hash) => {
    try {
        const isValid = await bcrypt.compare(
            password,
            hash
        )
        if (!isValid) throw new Error(`invalid password - user is not authorized`)
        return

    } catch (error) {
        throw new Error(`unable to validate password at the time; ${err.message}`)
    }
}