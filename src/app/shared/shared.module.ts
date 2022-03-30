import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NewModalComponent } from './components/new-modal/new-modal.component';
import { NewModalService } from './components/new-modal/new-modal.service';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AlertComponent } from './components/alert/alert.component';

const components = [
  NewModalComponent,
  AlertComponent,
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    NewModalService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3 } },
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    components,
  ],
})
export class SharedModule {}
