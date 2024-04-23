import { Piatto } from "./piatto.model";
import { Utente } from "./utente.model";

export class PiattoNelCarrello {
    codice!: number;
    data!: Date;
    piatto!: Piatto;
    quantita !: number; 
    utente !: Utente;
}