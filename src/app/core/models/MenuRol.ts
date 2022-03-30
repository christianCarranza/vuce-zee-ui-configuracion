import { Menu } from "./Menu";
import { Rol } from "./Rol";

export interface MenuRol {
    id           : number;
    rolModel     : Rol;
    itemsModels  : Array<Menu>;
    fechaCreacion: string;
}