import { Routes } from '@angular/router';
import { EmiPayment } from './emi-payment/emi-payment';
import { ForeClosure } from './fore-closure/fore-closure';

export const routes: Routes = [

       {path :'emi', component : EmiPayment},
       {path :'foreclosure', component : ForeClosure},
       
];
