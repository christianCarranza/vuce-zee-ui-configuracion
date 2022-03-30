import { Menu } from "./Menu";
import { Rol } from "./Rol";

export class MenuRol {
    id           : number;
    rolModel     : Rol;
    itemsModels  : Array<Menu>;
    fechaCreacion: string;
}