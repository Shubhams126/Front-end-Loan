import { Routes } from '@angular/router';
import { Cibil } from './cibil/cibil';
import { CustomerList } from './customer-list/customer-list';
import { ScoreCard } from './scorecard/scorecard';
import { EligibilityResult } from './eligibilityresult/eligibilityresult';
import { ManualReview } from './manualreview/manualreview';

export const routes: Routes = [
    {path:'',redirectTo:'/cibil',pathMatch:'full'},
    {path:'cibil',component:Cibil},
    {path:'customers',component:CustomerList},
    {path:'scorecard/:id',component:ScoreCard},
    {path:'eligibility',component:EligibilityResult},
    {path:'manual-review',component:ManualReview}
];
