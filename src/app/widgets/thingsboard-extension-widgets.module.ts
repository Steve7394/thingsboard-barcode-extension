///
/// Copyright © 2023 ThingsBoard, Inc.
///

import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import addCustomWidgetLocale from './locale/custom-widget-locale.constant';
import { BarcodeWidgetModule } from './components/barcode/barcode-widget.module';
import { IWidgetSettingsComponent, SharedModule } from '@shared/public-api';
import { HomeComponentsModule } from '@home/components/public-api';
import { WidgetSettingsModule } from '@home/components/widget/lib/settings/widget-settings.module';
import { HomePageWidgetsModule } from 'thingsboard/src/app/modules/home/components/widget/lib/home-page/home-page-widgets.module';
import { SharedHomeComponentsModule } from 'thingsboard/src/app/modules/home/components/shared-home-components.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeComponentsModule,
    SharedModule,
    HomePageWidgetsModule,
    SharedHomeComponentsModule,


    WidgetSettingsModule,
  ],
  exports: [
    BarcodeWidgetModule,
  ]
})
export class ThingsboardExtensionWidgetsModule {

  constructor(translate: TranslateService) {
    addCustomWidgetLocale(translate);
  }

}