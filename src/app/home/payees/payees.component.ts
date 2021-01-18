import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from 'src/app/core/services/budget.service';

@Component({
  selector: 'app-payees',
  templateUrl: './payees.component.html',
  styleUrls: ['./payees.component.scss']
})
export class PayeesComponent implements OnInit {

  public payeeList = [];
  public budgetId: any;

  constructor(private budgetService: BudgetService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.params.budgetId) {
      this.budgetId = this.route.snapshot.params.budgetId;
    } else {
      this.budgetService.budgetIdSubject.subscribe((id) => {
        this.budgetId = id;
      })
    }

    this.getPayeeList(this.budgetId);
  }
  getPayeeList(budgetId) {
    this.budgetService.getPayeeList(budgetId).subscribe((payee) => {
      console.log("payees", payee)
      this.payeeList = payee.data.payees;
    });
  }
  goToPayeeDetails(payeeId) {
    this.router.navigate([`home/${this.budgetId}/payees/${payeeId}/payee-details`]);
  }

}
