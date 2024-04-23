import { PiattoNelCarrello } from "./piattoNelCarrello.model";
import { Utente } from "./utente.model";

export class Ordine{
    nomePiatto!: string;
    data !: Date;
    acquirente!: Utente;
    carrello!: PiattoNelCarrello[];
}