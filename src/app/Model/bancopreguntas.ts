export interface Bancopreguntas {
    id: string;
    idnivel: number;
    nombre_nivel: string;
    idcomportamiento: number;
    nombre_comportamiento: string;
    pregunta: string;
}

export interface FiltroBancopreguntas {
    id: number;
    idcomportamiento: number;
    nombre_comportamiento: string;
    pregunta: string;
}

export interface MaxBancopreguntas {
    max_bancopregunta: number;
}