import { NavModule } from './nav/nav.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material/material.module';
import { AuthModule } from '@domain/auth/auth.module';
import { TableModule } from './table/table.module';

@NgModule({
  imports: [CommonModule, NavModule, RouterModule, ReactiveFormsModule, AuthModule, MaterialModule, TableModule],
  exports: [NavModule, TableModule],
})
export class ComponentModule {}
