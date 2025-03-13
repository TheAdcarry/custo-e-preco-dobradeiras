import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import {
  ProtheusLibCoreModule,
  ProAppConfigService,
} from '@totvs/protheus-lib-core';
import { LoadingService } from './core/services/Loading.service';

import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
  PoLoadingModule,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    ProtheusLibCoreModule,
    PoLoadingModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoading = false;
  showPoPageDefault = true;

  readonly menus: Array<PoMenuItem> = [
    {
      label: 'Log de custos',
      action: () => this.navigateTo('log-custos'),
      icon: 'ph ph-archive',
      shortLabel: 'Custos',
    },
    {
      label: 'Reprocessa preços',
      action: () => this.navigateTo('reprocessa-precos'),
      icon: 'ph ph-money-wavy',
      shortLabel: 'Preços',
    },
    {
      label: 'Ajuda',
      action: () => this.navigateTo('ajuda'),
      icon: 'po-icon-help',
      shortLabel: 'Ajuda',
    },
    {
      label: 'Sair',
      action: this.closeApp.bind(this),
      icon: 'po-icon-exit',
      shortLabel: 'Sair',
    },
  ];

  constructor(
    private proAppConfigService: ProAppConfigService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    const insideProtheus = this.proAppConfigService.insideProtheus()
      ? '1'
      : '0';
    sessionStorage.setItem('insideProtheus', insideProtheus);

    this.loadingService.loading$.subscribe(
      (loading) => (this.isLoading = loading)
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showPoPageDefault = event.url !== '/log-custos';
      }
    });
  }

  ngOnInit() {
    this.navigateTo('log-custos');
  }

  private navigateTo(route: string) {
    this.router.navigate(['/', route]);
  }

  private closeApp() {
    this.proAppConfigService.insideProtheus()
      ? this.proAppConfigService.callAppClose()
      : alert('O App não está sendo executado dentro do Protheus.');
  }
}
