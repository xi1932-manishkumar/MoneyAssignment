import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetService } from 'src/app/core/services/budget.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() isOpen: boolean;
  public showDetails: boolean;
  budgetId: any;

  constructor(private router: Router, private budgetService: BudgetService) {
  }

  ngOnInit() {
    this.budgetService.budgetIdSubject.subscribe((id) => {
      this.budgetId = id;
    });
    if (localStorage.length) {
      this.budgetId = localStorage.getItem('budgetId');
    }
  }

  public goToBudgetDetails(): void {
    this.showDetails = false;
    this.router.navigate([`home/${this.budgetId}/budget`]);
  }

  public goToAllBudgets(): void {
    this.router.navigate(['home/budgets']);
  }

  public activateDetails(): void {
    this.showDetails = !this.showDetails;
  }

  public goToAccounts(): void {
    this.showDetails = false;
    this.router.navigate([`home/${this.budgetId}/accounts`]);
  }

  public goToPayeesList(): void {
    this.showDetails = false;
    this.router.navigate([`home/${this.budgetId}/payees`]);
  }

}
