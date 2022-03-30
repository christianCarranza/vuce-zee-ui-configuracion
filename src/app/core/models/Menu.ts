export class Menu {
    id?: number;
    namePage?: string;
    urlPage?: string;
    fechaCreacion?: string;
    completed: boolean;
    subMenus?: Menu[];
}