import { Component, ViewChild } from '@angular/core';
import {
  PoDynamicFormComponent,
  PoInfoModule,
  PoDynamicFormField,
  PoDynamicModule,
  PoButtonModule,
  PoDynamicFormValidation,
  PoDynamicFormFieldChanged,
  PoNotificationService,
  PoDividerModule,
} from '@po-ui/ng-components';
import { ApiUrls } from '../../api/api.config';
import { isRangeValid } from '../../shared/validation.helper';
import { ReprocessaPrecosService } from '../../core/services/ReprocessaPrecos.service';
import { LoadingService } from '../../core/services/Loading.service';

@Component({
  selector: 'app-reprocessa-precos',
  standalone: true,
  imports: [PoInfoModule, PoDynamicModule, PoButtonModule, PoDividerModule],
  templateUrl: './reprocessa-precos.component.html',
  styleUrls: ['./reprocessa-precos.component.css'],
})
export class ReprocessaPrecosComponent {
  @ViewChild('dynamicForm') dynamicForm!: PoDynamicFormComponent;

  public fields: PoDynamicFormField[] = [
    {
      property: 'branchs',
      label: 'Filial(is)',
      required: true,
      optionsMulti: true,
      gridColumns: 12,
      options: ['Joinville', 'Chapecó', 'Cascavel', 'Curitiba', 'São Paulo'],
    },
    {
      property: 'table',
      label: 'Tabela(s)',
      required: true,
      optionsMulti: false,
      gridColumns: 6,
      options: ['Distribuidora', 'Importadora', 'Ambos'],
    },
    {
      property: 'type',
      label: 'Tipo',
      required: true,
      optionsMulti: false,
      gridColumns: 6,
      options: ['Grupo', 'Similar', 'Produto'],
    },
    {
      property: 'typeFrom',
      label: '',
      gridColumns: 6,
      disabled: true,
      visible: true,
    },
    {
      property: 'typeTo',
      label: '',
      gridColumns: 6,
      disabled: true,
      visible: true,
    },
  ];

  public validateFields: string[] = ['type'];

  constructor(
    public readonly poNotification: PoNotificationService,
    private readonly httpPost: ReprocessaPrecosService,
    private readonly loadingService: LoadingService
  ) {}

  submitFormData(): void {
    if (!this.validateRange()) return;

    const data = this.dynamicForm.form.value;
    this.loadingService.setLoading(true);

    this.httpPost.sendData(data).subscribe(
      () => {
        this.poNotification.success('Preços reprocessados com sucesso!');
        this.loadingService.setLoading(false);
      },
      () => {
        this.poNotification.error('Erro ao reprocessar os preços!');
        this.loadingService.setLoading(false);
      }
    );
  }

  isFormValid(): boolean {
    return this.dynamicForm?.form?.valid ?? false;
  }

  onChangeFields(
    changedValue: PoDynamicFormFieldChanged
  ): PoDynamicFormValidation {
    const type = this.dynamicForm.form.value.type;
    const updatedFields = this.getTypeFieldsConfig(type);

    this.clearFields(['typeFrom', 'typeTo']);

    return { fields: updatedFields, focus: 'typeFrom' };
  }

  private clearFields(fields: string[]): void {
    fields.forEach((field) => {
      const control = this.dynamicForm.form.controls[field];
      if (control) {
        control.setValue('');
      }
    });
  }

  private createRangeFieldPair(
    placeholderFrom: string,
    placeholderTo: string,
    mask: string,
    searchService?: string,
    columns?: Array<{ property: string; label: string }>,
    fieldValue?: string,
    format?: string[]
  ): PoDynamicFormField[] {
    const baseFieldConfig = {
      disabled: false,
      clean: true,
      required: true,
      gridColumns: 6,
    };

    return [
      {
        ...baseFieldConfig,
        property: 'typeFrom',
        placeholder: placeholderFrom,
        mask,
        searchService,
        columns,
        fieldValue,
        format,
      },
      {
        ...baseFieldConfig,
        property: 'typeTo',
        placeholder: placeholderTo,
        mask,
        searchService,
        columns,
        fieldValue,
        format,
      },
    ];
  }

  private getColumnsConfig(
    type: string
  ): Array<{ property: string; label: string }> {
    switch (type) {
      case 'Grupo':
        return [
          { property: 'group', label: 'Grupo' },
          { property: 'description', label: 'Descrição' },
        ];
      case 'Similar':
        return [
          { property: 'similar', label: 'Similar' },
          { property: 'description', label: 'Descrição' },
        ];
      case 'Produto':
        return [
          { property: 'product', label: 'Produto' },
          { property: 'description', label: 'Descrição' },
        ];
      default:
        return [];
    }
  }

  private getFieldValue(type: string): string {
    switch (type) {
      case 'Grupo':
        return 'group';
      case 'Similar':
        return 'similar';
      case 'Produto':
        return 'product';
      default:
        return '';
    }
  }

  private getFormat(type: string): string[] {
    switch (type) {
      case 'Grupo':
        return ['group', 'description'];
      case 'Similar':
        return ['similar', 'description'];
      case 'Produto':
        return ['product', 'description'];
      default:
        return [];
    }
  }

  private getMask(type: string): string {
    switch (type) {
      case 'Grupo':
        return '9999';
      case 'Similar':
        return 'C999999';
      case 'Produto':
        return '999999';
      default:
        return '';
    }
  }

  private getTypeFieldsConfig(type: string): PoDynamicFormField[] {
    return this.createRangeFieldPair(
      `${type} De`,
      `${type} Até`,
      this.getMask(type),
      this.getUrl(type),
      this.getColumnsConfig(type),
      this.getFieldValue(type),
      this.getFormat(type)
    );
  }

  private getUrl(type: string): string {
    switch (type) {
      case 'Grupo':
        return ApiUrls.GROUPS;
      case 'Similar':
        return ApiUrls.SIMILAR;
      case 'Produto':
        return ApiUrls.PRODUCTS;
      default:
        return '';
    }
  }

  private validateRange(): boolean {
    const { typeFrom, typeTo } = this.dynamicForm.form.value;
    if (!isRangeValid(typeFrom, typeTo)) {
      this.poNotification.error('Parâmetros "de" e "até" inválidos');
      return false;
    }
    return true;
  }
}
