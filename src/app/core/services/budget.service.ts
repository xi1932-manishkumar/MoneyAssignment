import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  budgetIdSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getAllBudgets() : Observable<any> {
    return this.http.get(`${environment.baseUrl}/budgets`);
  }

  getBudgetDetail(budgetId) : Observable<any> {
    return this.http.get(`${environment.baseUrl}/budgets/${budgetId}`);
  }

  getAllAccountsInBudget(budgetId) : Observable<any> {
    return this.http.get(`${environment.baseUrl}/budgets/${budgetId}/accounts`);
  }

  createAccount(budgetId, body) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/budgets/${budgetId}/accounts`, body);
  }
  
  getPayeeDetails(budgetId, payeeId) : Observable<any> {
    return this.http.get(`${environment.baseUrl}/budgets/${budgetId}/payees/${payeeId}`);
  }

  getPayeeList(budgetId) : Observable<any> {
    return this.http.get(`${environment.baseUrl}/budgets/${budgetId}/payees`);
  }

  getPayeeTransaction(budgetId, payeeId) : Observable<any> {
    return this.http.get(`${environment.baseUrl}/budgets/${budgetId}/payees/${payeeId}/transactions`);
  }
  
}
