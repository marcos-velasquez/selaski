import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '@domain/company/interfaces/company.interface';
import { dataDisplay } from './constants/table-data-display.constant';
import { CompanyService } from './services/company.service';
import Swal from 'sweetalert2';
import { CreateComponent } from './componentes/create/create.component';
import { EditComponent } from './componentes/edit/edit.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements AfterViewInit {
  companies: Company[];
  dataDisplay = dataDisplay;

  constructor(private dialog: MatDialog, private companyService: CompanyService) {}

  ngAfterViewInit() {
    this.setData();
  }

  private setData = (hasNew = true) => {
    if (hasNew) {
      this.companyService.getAll().subscribe((companies) => {
        this.companies = companies;
      });
    }
  };

  create() {
    this.dialog.open(CreateComponent).afterClosed().subscribe(this.setData);
  }

  edit(company: Company): void {
    this.dialog.open(EditComponent, { data: company }).afterClosed().subscribe(this.setData);
  }

  delete(company: Company): void {
    Swal.fire({
      title: '¿Estás segur@?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyService.delete(company.id).subscribe(() => this.setData());
      }
    });
  }
}
