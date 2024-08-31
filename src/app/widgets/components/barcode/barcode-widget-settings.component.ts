///
/// Copyright © 2016-2024 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { Component } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "thingsboard/src/app/core/core.state";
import { WidgetSettingsComponent, WidgetSettings } from "thingsboard/src/app/shared/public-api";



@Component({
  selector: 'tb-barcode-widget-settings',
  templateUrl: './barcode-widget-settings.component.html',
  styleUrls: ['./barcode-widget-settings.component.scss']
})
export class BarcodeWidgetSettingsComponent extends WidgetSettingsComponent {

  barcodeWidgetSettingsForm: UntypedFormGroup;

  constructor(protected store: Store<AppState>,
              private fb: UntypedFormBuilder) {
    super(store);
  }

  protected settingsForm(): UntypedFormGroup {
    return this.barcodeWidgetSettingsForm;
  }

  protected defaultSettings(): WidgetSettings {
    return {
      barcodeTextPattern: '${entityName}',
      useBarcodeTextFunction: false,
      barcodeTextFunction: 'return data[0][\'entityName\'];'
    };
  }

  protected onSettingsSet(settings: WidgetSettings) {
    this.barcodeWidgetSettingsForm = this.fb.group({
      barCodeTextPattern: [settings.qrCodeTextPattern, [Validators.required]],
      useBarcodeTextFunction: [settings.useBarCodeTextFunction, [Validators.required]],
      barCodeTextFunction: [settings.barCodeTextFunction, [Validators.required]]
    });
  }

  protected validatorTriggers(): string[] {
    return ['useBarCodeTextFunction'];
  }

  protected updateValidators(emitEvent: boolean) {
    const useBarcodeTextFunction: boolean = this.barcodeWidgetSettingsForm.get('useBarcodeTextFunction').value;
    if (useBarcodeTextFunction) {
      this.barcodeWidgetSettingsForm.get('barcodeTextPattern').disable();
      this.barcodeWidgetSettingsForm.get('barcodeTextFunction').enable();
    } else {
      this.barcodeWidgetSettingsForm.get('barcodeTextPattern').enable();
      this.barcodeWidgetSettingsForm.get('barcodeTextFunction').disable();
    }
    this.barcodeWidgetSettingsForm.get('qrCodeTextPattern').updateValueAndValidity({emitEvent});
    this.barcodeWidgetSettingsForm.get('qrCodeTextFunction').updateValueAndValidity({emitEvent});
  }

}
