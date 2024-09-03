import { Earning, responseMessage } from './../../common/constants';
import { Component } from '@angular/core';
import { RestApiServiceService } from '../../services/rest-api-service.service';
import { Employee } from '../../common/constants';
import { CommonModule, NgFor } from '@angular/common';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { InputValidationsService } from '../../services/input-validations.service';
import { Router } from '@angular/router';


export interface Earnings {
  earning_id: number;
  amount_of_earning: number;
  date_of_earning: string;
}

export interface Deductions {
  deduction_id: number;
  amount_of_deduction: number;
  date_of_deduction: string;
}
@Component({
  selector: 'app-add-salary',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './add-salary.component.html',
  styleUrl: './add-salary.component.css'
})
export class AddSalaryComponent {

  employees: Employee[] = [];
  selectEarningTypes: any = [];
  selectDeductionTypes: any = [];
  isFormSubmitted: boolean = false;

  earnings: any = [];
  deductions: any = [];
  earningTypeError: string = '';
  deductionTypeError: string = '';

  form = this.fb.group({
    "employee_id": new FormControl(),
    "total_earnings": new FormControl(),
    "total_deductions": new FormControl(),
    "net_salary": new FormControl(),
    "base_salary": new FormControl(),

  })

  earningsForm = this.fb.group({
    earning_id: new FormControl(),
    amount_of_earning: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)])
  });
  deductionForm = this.fb.group({
    deduction_id: new FormControl(),
    amount_of_deduction: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)])

    // amount_of_deduction: new FormControl(Validators.pattern(/^(d=.*?[0-9]).{1,}$/)),
  })
  constructor(public http: RestApiServiceService, private fb: FormBuilder, public validate: InputValidationsService, public router: Router) {
    this.fetchSelectOptions();
  }

  fetchSelectOptions() {
    this.http.getData('fetch-select-options', '').then((res: any) => {
      this.employees = res.employees;
      this.selectEarningTypes = res.earning_type;
      this.selectDeductionTypes = res.deduction_type;
    })
  }

  addSalaryEarnings() {
    this.isFormSubmitted = true;
    const foundEarningType = this.earnings.find((item: any) => item.earning_id === this.earningsForm.value.earning_id);

    if (foundEarningType) {
      this.earningTypeError = 'Already added this earning type';
    } else {
      this.earningTypeError = '';

      const amount = this.earningsForm.value.amount_of_earning;

      if (!this.earningsForm.valid || amount === null || amount === undefined || isNaN(parseFloat(amount))) {
        responseMessage('error', "Please enter a valid amount", true);
      } else {
        this.earnings.push({
          earning_id: this.earningsForm.value.earning_id,
          amount_of_earning: parseFloat(amount).toFixed(2),
        });
      }


    }


    const base_salary = this.form.get('base_salary')?.value || 0;
    const earningAmount = this.earnings.reduce((acc: number, curr: any) => acc + Number(curr.amount_of_earning || 0), 0);
    this.form.get('total_earnings')?.patchValue(earningAmount);
    const total_deductions = this.form.get('total_deductions')?.value || 0;
    const netSalary = Number(base_salary) + Number(earningAmount) - Number(total_deductions);
    this.form.get('net_salary')?.patchValue(netSalary);
  }
  addSalaryDeductions() {
    this.isFormSubmitted = true;

    const foundDeductionType = this.deductions.find((item: any) => item.deduction_id === this.deductionForm.value.deduction_id);

    if (foundDeductionType) {
      this.deductionTypeError = 'Already added this deduction type';
    } else {
      this.deductionTypeError = '';

      const amount = this.deductionForm.value.amount_of_deduction;
      if (!this.deductionForm.valid || amount === null || amount === undefined || isNaN(parseFloat(amount))) {
        responseMessage('error', "Please enter a valid amount", true);
      } else {
        this.deductions.push({
          deduction_id: this.deductionForm.value.deduction_id,
          amount_of_deduction: parseFloat(amount).toFixed(2),
        });
      }

    }
    const base_salary = this.form.get('base_salary')?.value || 0;
    const deductionAmount = this.deductions.reduce((acc: number, curr: any) => acc + Number(curr.amount_of_deduction || 0), 0);
    this.form.get('total_deductions')?.patchValue(deductionAmount);
    const total_earnings = this.form.get('total_earnings')?.value || 0;
    const netSalary = Number(base_salary) + Number(total_earnings) - Number(deductionAmount);
    this.form.get('net_salary')?.patchValue(netSalary);
  }

  addBaseSalary() {
    const base_salary = this.form.get('base_salary')?.value || 0;
    const total_earnings = this.form.get('total_earnings')?.value || 0;
    const total_deductions = this.form.get('total_deductions')?.value || 0;
    const netSalary = Number(base_salary) + Number(total_earnings) - Number(total_deductions);
    this.form.get('net_salary')?.patchValue(netSalary);
  }

  addSalary() {
    this.isFormSubmitted = true;

    const data = {
      'employee_id': this.form.get('employee_id')?.value,
      'base_salary': this.form.get('base_salary')?.value,
      'total_earnings': this.form.get('total_earnings')?.value,
      'total_deductions': this.form.get('total_deductions')?.value,
      'net_salary': this.form.get('net_salary')?.value,
      'deductions': this.deductions,
      'earnings': this.earnings,
    }
    if (this.form.valid && this.earningsForm.valid && this.deductionForm.valid) {
      this.http.postData('add-salary', data).then((res) => {
        responseMessage('success', 'Salary Added Successfully', true);
        this.router.navigate(['/employees_salaries']);
      },
        (err) => {
          responseMessage('error', 'Something went wrong! Please try again later', true);
        })

    }
  }
}