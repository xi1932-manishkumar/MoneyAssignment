import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from 'src/app/core/services/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  budgetList = [];

  constructor(
    private budgetService: BudgetService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getBudgetList();
  }

  getBudgetList() {
    this.budgetService.getAllBudgets().subscribe((budgets) => {
      this.budgetList = budgets.data.budgets;
    });
  }
  goToBudgetDetails(id) {
    this.router.navigate([`home/${id}/budget`]);
  }
}
