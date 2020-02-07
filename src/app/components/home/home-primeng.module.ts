import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

export const primeNgModules = [
  PanelModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  DropdownModule,
  SelectButtonModule,
  CalendarModule,
  FormsModule
];

@NgModule({
  imports: [...primeNgModules],
  declarations: [],
  providers: [],
  exports: [...primeNgModules]
})
export class HomePrimeNgModule {}
