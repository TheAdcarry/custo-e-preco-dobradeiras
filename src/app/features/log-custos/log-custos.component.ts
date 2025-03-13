import { Component, OnInit } from '@angular/core';
import {
  PoInfoModule,
  PoLoadingModule,
  PoPageModule,
  PoTableColumn,
  PoTableModule,
  PoTableAction,
} from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../../api/api.config';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { Router } from '@angular/router';
import { DataService } from '../../core/services/Data.service';

@Component({
  selector: 'app-log-custos',
  standalone: true,
  imports: [
    PoInfoModule,
    PoTableModule,
    PoLoadingModule,
    PoPageDynamicSearchModule,
    PoPageModule,
  ],
  templateUrl: './log-custos.component.html',
  styleUrls: ['./log-custos.component.css'],
})
export class LogCustosComponent implements OnInit {
  columns: PoTableColumn[] = [];
  products: any[] = [];
  actions: PoTableAction[] = [
    {
      action: this.displayCost.bind(this),
      label: 'Consultar',
    },
  ];
  isLoading = false;
  hasMore = true;
  private currentPage = 1;
  private currentFilter: string | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly dataService: DataService
  ) {}

  ngOnInit(): void {
    this.setupColumns();
    this.loadProducts();
  }

  private setupColumns(): void {
    this.columns = [
      { property: 'product', label: 'Produto', width: '20%' },
      { property: 'similar', label: 'Similar', width: '20%' },
      { property: 'description', label: 'Descrição', width: '60%' },
    ];
  }

  loadProducts(): void {
    this.fetchProducts(this.getApiUrl());
  }

  searchProducts(filter: string): void {
    this.resetState(filter);
    this.fetchProducts(this.getApiUrl());
  }

  loadMoreProducts(): void {
    if (this.hasMore) {
      this.fetchProducts(this.getApiUrl());
    }
  }

  private fetchProducts(url: string): void {
    this.isLoading = true;

    this.http.get<{ items: any[]; hasNext: boolean }>(url).subscribe({
      next: ({ items, hasNext }) => {
        this.products = [...this.products, ...items];
        this.hasMore = hasNext;
        if (hasNext) this.currentPage++;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  private getApiUrl(): string {
    const baseUrl = `${ApiUrls.LOG_CUSTOS_PRODUCTS}?page=${this.currentPage}&pageSize=100`;
    return this.currentFilter
      ? `${baseUrl}&filter=${this.currentFilter}`
      : baseUrl;
  }

  private resetState(filter: string): void {
    this.products = [];
    this.currentPage = 1;
    this.hasMore = true;
    this.currentFilter = filter;
  }

  displayCost(row: any): void {
    this.dataService.setRowData(row);
    this.router.navigate(['visualiza-custos']);
  }
}
