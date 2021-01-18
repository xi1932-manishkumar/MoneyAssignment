import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from 'src/app/core/services/budget.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  budgetId: any;
  accountsData: any;
  todaysDate: any;
  isDeleted: any;
  payeeId: any;
  payeeName: any;

  constructor(private budgetService: BudgetService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.params.budgetId) {
      this.budgetId = this.route.snapshot.params.budgetId
    } else {
      this.budgetService.budgetIdSubject.subscribe((id) => {
        this.budgetId = id;
      });
    }
    this.getAccounts(this.budgetId);
    this.todaysDate = Date.now();
  }

  getAccounts(budgetId) {
    this.budgetService.getAllAccountsInBudget(budgetId).subscribe((account) => {
      this.accountsData = account.data.accounts;

      if(this.accountsData) {
        this.accountsData.forEach(element => {
          this.isDeleted = element.deleted;
          let payeeId = element.transfer_payee_id;
          if(payeeId) {
            this.getPayeeName(this.budgetId, payeeId);
          }
        });
      }
    });
  }

  getPayeeName(budgetId, payeeId) {
    this.accountsData.forEach(element => {
    this.budgetService.getPayeeDetails(budgetId,payeeId).subscribe((payee) => {
      if(element.transfer_payee_id === payee.data.payee.id){
        element.payeeName = payee.data.payee.name;
        console.log("payee name", element.payeeName);
      }
      });
    });
  }

  goToAddAccount() {
    this.router.navigate([`home/${this.budgetId}/add-account`]);
    console.log("hi");
  }
  
}
