import { Component } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { AuthorizationServiceService } from '../../services/authorization-service.service';
import { RestApiServiceService } from '../../services/rest-api-service.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-salaries',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, RouterLink],
  templateUrl: './employee-salaries.component.html',
  styleUrl: './employee-salaries.component.css'
})
export class EmployeeSalariesComponent {


  //Common variables
  loader: boolean = false;
  imagePath: string = '../../../assets/images/';


  // Task list data source variables
  allEmployeesSalaries: any = [];
  employeesSalaries: any = [];
  // Search technique  variables
  searchTerm: string = '';


  //Pagination  variables
  totalPages: any = [];
  pageNumber: number = 1;
  currentPageNumber: number = 1;
  paginationInfo: any = [];


  paySlip: any = [];



  constructor(private admin: AdminServiceService, public auth: AuthorizationServiceService, public api: RestApiServiceService, public router: Router) {
    auth.verifyAdminCredentials().subscribe(res => {
      this.getallEmployeesSalaries(this.pageNumber);
    });

  }
  getallEmployeesSalaries(page: number) {
    this.admin.getAllEmployeeSalaries(page).subscribe((data: any) => {
      this.allEmployeesSalaries = data.salaries.data;
      this.employeesSalaries = this.allEmployeesSalaries;
      this.paginationInfo = data.paginationInfo;
      this.loader = true;

    })
  }
  changePage(pageNumber: number): void {
    this.getallEmployeesSalaries(pageNumber);
  }
  getPageNumbers(totalPages: number) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  onSearch() {
    if (this.searchTerm) {
      this.employeesSalaries = this.allEmployeesSalaries.filter((item: any) =>
        item.employee.fullname.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.employeesSalaries = this.allEmployeesSalaries;
    }
  }
  viewPayslip(salaryIndex: number) {
    this.paySlip = this.employeesSalaries[salaryIndex];
  }
}