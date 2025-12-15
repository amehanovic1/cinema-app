export const hideEmail = (email) => {
    const [user, domain] = email.split("@");
    const hideUser = user[0] + "*".repeat(user.length - 2) + user.slice(-1);
    return `${hideUser}@${domain}`;
};