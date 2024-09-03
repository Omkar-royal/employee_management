import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { EmployeeListComponent } from './home/employee-list/employee-list.component';
import { AddEmployeeComponent } from './home/add-employee/add-employee.component';
import { AddSalaryComponent } from './home/add-salary/add-salary.component';
import { ViewEmployeeComponent } from './home/view-employee/view-employee.component';
import { EmployeeSalariesComponent } from './home/employee-salaries/employee-salaries.component';
import { LoansComponent } from './loans/loans.component';
import { AddLoanComponent } from './loans/add-loan/add-loan.component';
import { ViewLoansComponent } from './loans/view-loans/view-loans.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { pageTitle: 'Home' },
        children: [
            {
                path: 'employees_list',
                component: EmployeeListComponent
            },
            {
                path: 'employees_salaries',
                component: EmployeeSalariesComponent
            },
            {
                path: 'add_employee',
                component: AddEmployeeComponent
            },
            {
                path: 'view_employee_details/:employee_id',
                component: ViewEmployeeComponent
            },
            {
                path: 'add_salary',
                component: AddSalaryComponent
            },
            {
                path: 'loans',
                component: LoansComponent,
                children: [
                    { path: 'add_loan', component: AddLoanComponent },
                    {
                        path: 'view_loans',
                        component: ViewLoansComponent
                    }, {
                        path: 'loans',
                        redirectTo: '/loans/add_loan',
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/employees_list',
                pathMatch: 'full'
            }
        ]

    },

    {
        path: 'sign_in',
        component: SignInComponent
    },

    // {
    //     path: '**',
    //     redirectTo: '',
    // }
];
