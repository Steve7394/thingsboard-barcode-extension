import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation} from '@angular/core';
// import {
//   DISPLAY_COLUMNS_PANEL_DATA,
//   DisplayColumnsPanelComponent,
//   DisplayColumnsPanelData
// } from './display-columns-panel.component';
// import {
//   ALARM_FILTER_PANEL_DATA,
//   AlarmFilterPanelComponent,
//   AlarmFilterPanelData
// } from './alarm-filter-panel.component';
import {
  DataKeyType,
  DatasourceData,
  FormattedData,
  PageComponent} from '@shared/public-api';
import { Store } from '@ngrx/store';
import { AppState } from '@core/core.state';
import {
  createLabelFromPattern,
  flatDataWithoutOverride,
  formattedDataFormDatasourceData,
  isNumber,
  isObject,
  parseFunction,
  safeExecute} from '@core/public-api';
import { WidgetContext } from '../../models/widget-component.models';
import JsBarcode from 'jsbarcode';
// import { AlarmDetailsDialogComponent, AlarmDetailsDialogData } from './alarm-details-dialog.component';
interface BarcodeWidgetSettings {
  barcodeTextPattern: string;
  useBarcodeTextFunction: boolean;
  barcodeTextFunction: string;
}

type BarcodeTextFunction = (data: FormattedData[]) => string;

@Component({
  selector: 'tb-barcode-widget',
  templateUrl: './barcode-widget.component.html',
  styleUrls: [
    './barcode-widget.component.scss',
    '../../../../../node_modules/primeicons/primeicons.css',
    '../../../../../node_modules/primeng/resources/themes/nova/theme.css',
    '../../../../../node_modules/primeng/resources/primeng.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})

export class BarcodeWidgetComponent extends PageComponent implements OnInit, AfterViewInit {

  settings: BarcodeWidgetSettings;
  barcodeTextFunction: BarcodeTextFunction;

  @Input()
  ctx: WidgetContext;

  barcodeText: string;
  invalidBarcodeText = false;

  private viewInited: boolean;
  private scheduleUpdateCanvas: boolean = true;

  @ViewChild('canvas', {static: false}) canvasRef: ElementRef<HTMLCanvasElement>;


  constructor(protected store: Store<AppState>,
    protected cd: ChangeDetectorRef) {
    super(store);
}

  ngOnInit() {
    this.ctx.$scope.barcodeWidget = this;
    this.settings = this.ctx.settings;
    this.barcodeTextFunction = this.settings.useBarcodeTextFunction ? parseFunction(this.settings.barcodeTextFunction, ['data']) : null;

    
  }
  ngAfterViewInit(): void {
    this.viewInited = true;
    if (this.scheduleUpdateCanvas) {
      this.scheduleUpdateCanvas = false;
      this.updateCanvas();
    }
  }




  public onDataUpdated() {
    let initialData: DatasourceData[];
    let barcodeText: string;
    if (this.ctx.data?.length) {
      initialData = this.ctx.data;
    } else if (this.ctx.datasources?.length) {
      initialData = [
        {
          datasource: this.ctx.datasources[0],
          dataKey: {
            type: DataKeyType.attribute,
            name: 'empty'
          },
          data: []
        }
      ];
    } else {
      initialData = [];
    }
    const data = formattedDataFormDatasourceData(initialData);
    const pattern = this.settings.useBarcodeTextFunction ?
      safeExecute(this.barcodeTextFunction, [data]) : this.settings.barcodeTextPattern;
    const allData: FormattedData = flatDataWithoutOverride(data);
    barcodeText = createLabelFromPattern(pattern, allData);
    this.updateBarcodeText(barcodeText);
  }




  private updateBarcodeText(newBarcodeText: string): void {
    if (this.barcodeText !== newBarcodeText) {
      this.barcodeText = newBarcodeText;
      if (!(isObject(newBarcodeText) || isNumber(newBarcodeText))) {
        this.invalidBarcodeText = false;
        if (this.barcodeText) {
          this.updateCanvas();
        }
      } else {
        this.invalidBarcodeText = true;
      }
      this.cd.detectChanges();
    }
  }

  private updateCanvas() {
    if (this.viewInited) {
           
      // this.barcodeText="62612";
      // this.invalidBarcodeText= false;
      JsBarcode("#canvas", this.barcodeText);
    } else {
      this.scheduleUpdateCanvas = true;
    }
  }


}
