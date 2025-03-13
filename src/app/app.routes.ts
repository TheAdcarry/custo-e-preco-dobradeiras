import { Routes } from '@angular/router';
import { LogCustosComponent } from './features/log-custos/log-custos.component';
import { ReprocessaPrecosComponent } from './features/reprocessa-precos/reprocessa-precos.component';
import { AjudaComponent } from './features/ajuda/ajuda.component';
import { VisualizaCustosComponent } from './features/visualiza-custos/visualiza-custos.component';

export const routes: Routes = [
    { path: 'log-custos', title: 'Log custos', component: LogCustosComponent },
    { path: 'reprocessa-precos', title: 'Reprocessa preços', component: ReprocessaPrecosComponent },
    { path: 'visualiza-custos', title: 'Visualiza custos', component: VisualizaCustosComponent },
    { path: 'ajuda', title: 'Ajuda', component: AjudaComponent }
];