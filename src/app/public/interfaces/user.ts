export interface RegisterData extends User {
    password: string,
}

export interface UserSubs{
    subscriptionId: number,
}

export interface User{
    email: string,
    name: string,
    lastName: string,
}

export interface LoginData {
    email: string,
    password: string
}