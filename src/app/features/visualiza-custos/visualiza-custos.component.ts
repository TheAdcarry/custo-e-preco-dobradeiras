import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/services/Data.service';
import {
  PoInfoModule,
  PoTableModule,
  PoTableColumn,
} from '@po-ui/ng-components';
import { ApiUrls } from '../../api/api.config';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-visualiza-custos',
  standalone: true,
  imports: [PoInfoModule, PoTableModule],
  templateUrl: './visualiza-custos.component.html',
  styleUrls: ['./visualiza-custos.component.css'],
})
export class VisualizaCustosComponent implements OnInit {
  public rowData: any;
  public columns: PoTableColumn[] = [];
  public items: any[] = [];
  public isLoading = false;
  public hasMore = true;
  private currentPage = 1;

  constructor(
    private readonly dataService: DataService,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.setupColumns();
    this.rowData = this.dataService.getRowData();

    if (!this.rowData) {
      this.router.navigate(['/']);
    } else {
      this.loadCosts();
    }
  }

  private setupColumns(): void {
    this.columns = [
      { property: 'branch', label: 'Filial' },
      { property: 'invoice', label: 'Nota' },
      { property: 'code_supplier', label: 'Fornecedor' },
      { property: 'name_supplier', label: 'Nome' },
      { property: 'date', label: 'Data' },
      { property: 'product', label: 'Produto' },
      { property: 'similar', label: 'Similar' },
      { property: 'group', label: 'Grupo' },
      { property: 'price', label: 'Preço' },
      { property: 'icms', label: 'ICMS' },
      { property: 'icms_st', label: 'ICMS ST' },
      { property: 'ipi', label: 'IPI' },
      { property: 'pis_cof', label: 'PIS/COFINS' },
      { property: 'icms_ttd', label: 'ICMS TTD' },
      { property: 'cost_di', label: 'CUSTO DI' },
      { property: 'invoice_value', label: 'Valor da nota' },
      { property: 'cte', label: 'CTE' },
      { property: 'invoice_cost', label: 'Custo NF' },
      { property: 'reposition_cost', label: 'Custo reposição' },
    ];
  }

  public loadCosts(): void {
    this.fetchCosts(this.getApiUrl());
  }

  private getApiUrl(): string {
    return `${ApiUrls.LOG_CUSTOS_VISUALIZA_CUSTOS}/${this.rowData.product}?page=${this.currentPage}&pageSize=5`;
  }

  private fetchCosts(url: string): void {
    this.isLoading = true;

    this.http.get<{ items: any[]; hasNext: boolean }>(url).subscribe({
      next: ({ items, hasNext }) => {
        const formattedItems = items.map((item) => ({
          ...item,
          date: formatDate(item.date, 'dd/MM/yyyy', 'en-US'),
        }));

        this.items = [...this.items, ...formattedItems];
        this.hasMore = hasNext;
        if (hasNext) {
          this.currentPage++;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  public loadMoreCosts(): void {
    if (this.hasMore && !this.isLoading) {
      this.loadCosts();
    }
  }
}
