export interface Customer {
    id: string;
    usuario: string;
    contrasena: string;
    nombres: string;
    apellido1: string;
    apellido2: string;
    tipodocumento: string;
    identificacion: string;
    telefono: string;
    idperfil: number;
    
}

export interface usuarios{
    id: string;
    usuario: string;
    contrasena: string;
    nombres: string;
    apellido1: string;
    apellido2: string;
    tipodocumento: string;
    identificacion: string;
    telefono: string;
    nombreperfil: string;
}


export interface Country{
    code:string,
    name:string
}