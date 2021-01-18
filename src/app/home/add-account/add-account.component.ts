import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from 'src/app/core/services/budget.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  public accountForm: FormGroup;
  public typeOfAccount = [];
  budgetId: any;

  constructor(private router: Router, private budgetService: BudgetService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createAccountForm();

    this.typeOfAccount = [
      {name: "Savings Account", code: "saving"},
      {name: "Current Account", code: "current"},
      {name: "Checking Account", code: "checking"},
      {name: "Credit Card", code: "credit"},
      {name: "Line Of Credit", code: "creditLine"}
    ];

    if (this.route.snapshot.params.budgetId) {
      this.budgetId = this.route.snapshot.params.budgetId;
    } else {
      this.budgetService.budgetIdSubject.subscribe((id) => {
        this.budgetId = id;
      })
    }
  }

  createAccountForm() {
    this.accountForm = new FormGroup({
      type: new FormControl(),
      name: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required)
    });
  }
  

  saveForm() {
    let formData = {
        account: {
        type: this.accountForm.value.type.code,
        name: this.accountForm.value.name,
        balance: this.accountForm.value.balance
      }
    };
    if(!this.accountForm.invalid) {
      this.budgetService.createAccount(this.budgetId, formData).subscribe((res) => {
        this.router.navigate([`home/${this.budgetId}/accounts`]);
      })
    }
  }

}
