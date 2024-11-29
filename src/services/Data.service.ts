import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private rowData: any;

  setRowData(data: any): void {
    this.rowData = data;
  }

  getRowData(): any {
    return this.rowData;
  }
}
