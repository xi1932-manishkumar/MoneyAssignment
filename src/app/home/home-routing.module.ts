import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedHomeModule } from './shared-home/shared-home.module';
import { HomeComponent } from './home.component';
import { BudgetComponent } from './budget/budget.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BudgetDetailsComponent } from './budget-details/budget-details.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { PayeesComponent } from './payees/payees.component';
import { PayeeDetailsComponent } from './payee-details/payee-details.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'budgets',
        component: BudgetComponent
      },
      {
        path: ':budgetId/budget',
        component: BudgetDetailsComponent
      },
      {
        path: ':budgetId/accounts',
        component: AccountsComponent
      },
      {
        path: ':budgetId/add-account',
        component: AddAccountComponent
      },
      {
        path: ':budgetId/payees',
        component: PayeesComponent
      },
      {
        path: ':budgetId/payees/:payeeId/payee-details',
        component: PayeeDetailsComponent
      },
      { path: '', redirectTo: 'budgets', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [SharedHomeModule, RouterModule.forChild(homeRoutes), CommonModule, SharedModule],
  declarations: [
    HomeComponent,
    BudgetComponent
  ],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule {}
