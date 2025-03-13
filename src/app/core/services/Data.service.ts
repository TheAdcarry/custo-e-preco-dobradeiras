import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService<T = any> {
  private _rowData: T | null = null;

  setRowData(data: T): void {
    this._rowData = data;
  }

  getRowData(): T | null {
    return this._rowData;
  }
}
