///
/// Copyright © 2023 ThingsBoard, Inc.
///

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/public-api';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { BarcodeWidgetComponent } from './barcode-widget.component';
import { BarcodeWidgetSettingsComponent } from './barcode-widget-settings.component';
import { WidgetSettingsModule } from '@home/components/widget/lib/settings/widget-settings.module';
@NgModule({
  declarations: [
    BarcodeWidgetComponent,
    BarcodeWidgetSettingsComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    AccordionModule,

    WidgetSettingsModule
  ],
  exports: [
    BarcodeWidgetComponent,
    BarcodeWidgetSettingsComponent

  ]
})
export class BarcodeWidgetModule {
}
