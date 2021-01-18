import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from 'src/app/core/services/budget.service';

@Component({
  selector: 'app-payee-details',
  templateUrl: './payee-details.component.html',
  styleUrls: ['./payee-details.component.scss']
})
export class PayeeDetailsComponent implements OnInit {

  budgetId: any;
  payeeId: any;
  payeeTransactions = [];

  constructor(
    private budgetService: BudgetService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params.budgetId) {
      this.budgetId = this.route.snapshot.params.budgetId;
    } else {
      this.budgetService.budgetIdSubject.subscribe((id) => {
        this.budgetId = id;
      });
    }

    this.payeeId = this.route.snapshot.params.payeeId;

    this.getPayeeTransactionDetails(this.budgetId, this.payeeId);
  }

  getPayeeTransactionDetails(budgetId, payeeId) {
    this.budgetService.getPayeeTransaction(budgetId, payeeId).subscribe((transaction) => {
      this.payeeTransactions = transaction.data.transactions;
    });
  }

}
