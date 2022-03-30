import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/core/models/Rol';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { NewModalService } from 'src/app/shared/components/new-modal/new-modal.service';
import { Menu } from '../core/models/Menu';
import { MenuRol } from '../core/models/MenuRol';
import { RolService } from './rol.service';


@Component({
  selector: 'app-form-role-menu',
  templateUrl: './form-role-menu.component.html',
  styleUrls: ['./form-role-menu.component.scss']
})
export class FormRoleMenuComponent implements OnInit {

  //menu 
  allComplete: boolean = false;

  // subMenus: Menu[] = [
  //   { id: 1, namePage: 'Administrador', urlPage: 'Administrador del sistema', fechaCreacion: '2017-12-11', completed: false },
  // ];

  subMenus: Menu[];
  menuRol: MenuRol[];

  menu: Menu = {
    namePage: 'Todo',
    completed: false,
    // subMenus: this.subMenus,
  };

  //roles
  Roles: Rol[];
  selected: string = '';
  

  constructor(
    private rolService: RolService,
    private _newModal: NewModalService,
  ) { }

  ngOnInit() {
    this.Menu();
    this.Role();
    this.MenuRol();
  }

  //roles

  Role(): void{
    this.rolService.getRoles().subscribe(
      roles => this.Roles = roles
    );
  }

  openModal(tipo: string) {
    this._newModal.OpenModal(tipo);
  }

  // selectRol(_Rol){

  // }

  realizeActionWithForm(rpta: any) {
    console.log("--> "+rpta.data);
    if (rpta.result) {
      // this.formLotes.get(rpta.nameField)?.setValue(rpta.data);
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


  //MenuRol
  MenuRol(): void{
    this.rolService.getMenuRol().subscribe(
      menuRol => this.menuRol = menuRol      
    );
  }


}
