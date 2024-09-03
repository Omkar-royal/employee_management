import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.css'
})
export class LoansComponent {

  constructor(public router: Router) {
    this.router.navigate(['/loans/view_loans']);
  }
}
