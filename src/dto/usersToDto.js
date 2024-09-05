

/**
 *  returns Data transfer object for Users
 * 
 * @param {User} user 
 * @returns 
 */
export const userToDto = (user) => {
    return {
        id: user.id ?? '',
        username: user.username ?? '',
        createdAt: user.createdAt ?? '',
        updatedAt: user.updatedAt ?? ''
    }
}