export interface Impresora{
    id: number;
    marca: string;
    modelo: string;
    serie: string;
}


export interface Cliente{
   id: number;
    dni: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    direccion: string;
    impresoras: Impresora[];
}




export interface ClienteResponse{
    success: boolean;
    data: Cliente[];
    mensaje?: string;
    error?: string;
}