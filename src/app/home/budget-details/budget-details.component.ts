import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BudgetService } from 'src/app/core/services/budget.service';

export interface TreeNode {
  data?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
}


@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss']
})
export class BudgetDetailsComponent implements OnInit {

  budgetDetails : any;
  budgetId: any;
  budgetIdSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  cols: any[];
  expanded = false;
  treeTableModel: TreeNode;

  constructor(
    private budgetService: BudgetService,
    private route: ActivatedRoute
    ) {}


  ngOnInit() {
    if (this.route.snapshot.params.budgetId) {
      this.budgetId = this.route.snapshot.params.budgetId;
    }
    this.budgetService.budgetIdSubject.next(this.budgetId);
    localStorage.setItem("budgetId", this.budgetId);
    this.getBudgetDetails(this.budgetId);
  }

  getBudgetDetails(id) {
    this.budgetService.getBudgetDetail(id).subscribe((detail) => {
      this.cols = [
        { field: 'name', header: 'CATEGORIES' },
        { field: 'budgeted', header: 'BUDGETED' },
        { field: 'activity', header: 'ACTIVITY' },
        { field: 'balance', header: 'AVAILABLE' }
      ];
      this.budgetDetails = detail.data.budget;
      this.treeTableModel = this.convertDataToTreeModel(this.budgetDetails);
    })
  }

  convertDataToTreeModel(data) {
    return data.category_groups.map((x) => {
        let childrenList = [];

          let childData = data.months[0].categories.filter((y) => {
            return y.category_group_id === x.id
          });
          childData.forEach((element, idx) => {
            childrenList.push({data: {...element}});
          });
          x.balance = x.balance || 0;
          x.budgeted = x.budgeted || 0;
          x.activity = x.activity || 0;
        return {
            data: {...x},
            children: childrenList,
        };
    });
}

}
