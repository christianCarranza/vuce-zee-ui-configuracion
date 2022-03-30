import { Component, OnInit } from '@angular/core';
import { Validators, FormControl  } from '@angular/forms';
import { Rol } from 'src/app/core/models/Rol';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { NewModalService } from 'src/app/shared/components/new-modal/new-modal.service';
import { Menu } from '../core/models/Menu';
import { MenuRol } from '../core/models/MenuRol';
import { RolService } from './rol.service';

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-form-role-menu',
  templateUrl: './form-role-menu.component.html',
  styleUrls: ['./form-role-menu.component.scss']
})
export class FormRoleMenuComponent implements OnInit {

  //menu 
  allComplete: boolean = false;
  isEdit:boolean = false;

  private Mrol: MenuRol = new MenuRol();
  private rolClass: Rol = new Rol();
  // private menuClass: Menu = new Menu();

  subMenus: Menu[];
  menuRol: MenuRol[];
  byRol: MenuRol[]=[];

  menu: Menu = {
    namePage: 'Todo',
    completed: false,
    // subMenus: this.subMenus,
  };
  menuClass: Menu[]=[];
  //roles
  Roles: Rol[];
  idRolSelect: number;

  constructor(
    private rolService: RolService,
    private _newModal: NewModalService,
    private _alert: AlertService,
  ) { }

  ngOnInit() {
    this.Menu();
    this.Role();
    this.MenuRol();
  }

  selectRolControl = new FormControl('', Validators.required);
  
  //roles

  Role(): void{
    this.rolService.getRoles().subscribe(
      roles => this.Roles = roles
    );
  }

  openModal(tipo: string) {
    this._newModal.OpenModal(tipo);
  }

  selectRol(){
    this.idRolSelect = this.selectRolControl.value;
    this.setAll(false);
    this.MenuRol();
    this.ByRol(this.idRolSelect);
    
    if(this.idRolSelect !== undefined && this.menuRol.length!=0){
      for (let menusRol of this.menuRol) {
        if(menusRol.rolModel.id === this.idRolSelect){
          for (let menuItem of menusRol.itemsModels) {
            this.MenuSelected(menuItem.id);
          }
        }
      }
    }
    
  }

  //Menu
  Menu(): void{
    this.rolService.getMenus().subscribe(
      menus => this.subMenus = menus      
    );
  }

  updateAllComplete() {
    this.allComplete = this.subMenus != null && this.subMenus.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.subMenus == null) {
      return false;
    }
    return this.subMenus.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.subMenus == null) {
      return;
    }
    this.subMenus.forEach(t => (t.completed = completed));
  }

  //activar check de los menus asignados al rol
  MenuSelected(id: number | undefined):void{
    for (let submenu of this.subMenus) {
      if(submenu.id === id){
        submenu.completed = true;
      }
    }
  }

  //MenuRol
  MenuRol(): void{
    this.rolService.getMenuRol().subscribe(
      menuRol => this.menuRol = menuRol      
    );
  }

  ByRol(id:number): void{
    this.rolService.getByRol(id).subscribe(
      bymenuRol => this.byRol = bymenuRol      
    );
  }

  saveMenuRol(){
    this.rolClass.id = this.idRolSelect;
    
    for (let submenu of this.subMenus) {
      if(submenu.completed === true){
        this.menuClass.push(submenu);
      }
    }

    this.Mrol.rolModel = this.rolClass;
    this.Mrol.itemsModels = this.menuClass;
    
    this.isEdit=false;
    for (let Byrole of this.byRol) {
      if(Byrole != undefined){
        this.isEdit=true;
        this.Mrol.id = Byrole.id;
        this.Mrol.fechaCreacion = Byrole.fechaCreacion;
      } 
    }

    if(this.isEdit){
      this.rolService.updateMenuRol(this.Mrol).subscribe(data => {
        this._alert.open({ texto: 'Menu asignado correctamente' });
      })
    }else{
      this.rolService.createMenuRol(this.Mrol).subscribe(data => {
        this._alert.open({ texto: 'Menu asignado correctamente' });
        this.ByRol(this.idRolSelect);
      })
    }
    this.menuClass=[];
  }

}
