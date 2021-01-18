import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { BudgetDetailsComponent } from './budget-details/budget-details.component';
import { TreeTableModule } from 'primeng-lts/treetable';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts/accounts.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { DropdownModule } from 'primeng-lts/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayeesComponent } from './payees/payees.component';
import { PayeeDetailsComponent } from './payee-details/payee-details.component';

@NgModule({
  declarations: [BudgetDetailsComponent, AccountsComponent, AddAccountComponent, PayeesComponent, PayeeDetailsComponent],
  imports: [HomeRoutingModule, TreeTableModule, CommonModule, DropdownModule, FormsModule, ReactiveFormsModule],
  providers: []
})
export class HomeModule { 
}
