import { Component } from '@angular/core';
import { PoInfoModule, PoLinkModule, PoDividerModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-ajuda',
  standalone: true,
  imports: [PoLinkModule, PoInfoModule, PoDividerModule],
  templateUrl: './ajuda.component.html',
  styleUrl: './ajuda.component.css'
})
export class AjudaComponent {

}
