import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Menu } from '../core/models/Menu';
import { MenuRol } from '../core/models/MenuRol';
import { Rol } from '../core/models/Rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private urlEndPoint: string = 'http://localhost:8070/';
  private _httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this._httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getRoles(): Observable<Rol[]> {
    return this.http.get(`${this.urlEndPoint}roles/`).pipe(
      map(response => response as Rol[])
    );
  }

  getMenus(): Observable<Menu[]> {
    return this.http.get(`${this.urlEndPoint}items/`).pipe(
      map(response => response as Menu[])
    );
  }

  getMenuRol(): Observable<MenuRol[]> {
    return this.http.get(`${this.urlEndPoint}menu/`).pipe(
      map(response => response as MenuRol[])
    );
  }

  getByRol(id: number): Observable<MenuRol[]> {
    return this.http.get(`${this.urlEndPoint}menu/byrol/?rolId=${id}`).pipe(
      map(response => response as MenuRol[])
    );
  }

  createMenuRol(menuRol: MenuRol): Observable<MenuRol> {
    return this.http.post<MenuRol>(`${this.urlEndPoint}menu/`, menuRol, { headers: this._httpHeaders });
  }

  updateMenuRol(menuRol: MenuRol): Observable<MenuRol> {
    return this.http.put<MenuRol>(`${this.urlEndPoint}menu/${menuRol.id}`, menuRol, { headers: this._httpHeaders });
  }

}
