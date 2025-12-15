export const hideEmail = (email) => {
    const [user, domain] = email.split("@");
    const censoredUser = user[0] + "*".repeat(user.length - 2) + user.slice(-1);
    return `${censoredUser}@${domain}`;
};