import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-loan',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-loan.component.html',
  styleUrl: './add-loan.component.css'
})
export class AddLoanComponent {

  loanType: string = '';
}
