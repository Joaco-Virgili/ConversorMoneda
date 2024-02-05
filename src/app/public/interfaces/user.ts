export interface RegisterData extends User {
    password: string,
}

export interface User{
    email: string,
    Name: string,
    lastName: string,
}

export interface LoginData {
    email: string,
    password: string
}