/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Host, Inject, Input, Optional, Output, Self, SkipSelf, forwardRef } from '@angular/core';
import { EventEmitter } from '../../facade/async';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from '../../validators';
import { AbstractFormGroupDirective } from '../abstract_form_group_directive';
import { ControlContainer } from '../control_container';
import { NG_VALUE_ACCESSOR } from '../control_value_accessor';
import { NgControl } from '../ng_control';
import { ReactiveErrors } from '../reactive_errors';
import { composeAsyncValidators, composeValidators, controlPath, isPropertyUpdated, selectValueAccessor } from '../shared';
import { FormGroupDirective } from './form_group_directive';
import { FormArrayName, FormGroupName } from './form_group_name';
export const controlNameBinding = {
    provide: NgControl,
    useExisting: forwardRef(() => FormControlName)
};
export class FormControlName extends NgControl {
    constructor(_parent, validators, asyncValidators, valueAccessors) {
        super();
        this._parent = _parent;
        this._added = false;
        this.update = new EventEmitter();
        this._rawValidators = validators || [];
        this._rawAsyncValidators = asyncValidators || [];
        this.valueAccessor = selectValueAccessor(this, valueAccessors);
    }
    set isDisabled(isDisabled) { ReactiveErrors.disabledAttrWarning(); }
    ngOnChanges(changes) {
        if (!this._added) {
            this._checkParentType();
            this.formDirective.addControl(this);
            if (this.control.disabled)
                this.valueAccessor.setDisabledState(true);
            this._added = true;
        }
        if (isPropertyUpdated(changes, this.viewModel)) {
            this.viewModel = this.model;
            this.formDirective.updateModel(this, this.model);
        }
    }
    ngOnDestroy() {
        if (this.formDirective) {
            this.formDirective.removeControl(this);
        }
    }
    viewToModelUpdate(newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
    }
    get path() { return controlPath(this.name, this._parent); }
    get formDirective() { return this._parent ? this._parent.formDirective : null; }
    get validator() { return composeValidators(this._rawValidators); }
    get asyncValidator() {
        return composeAsyncValidators(this._rawAsyncValidators);
    }
    get control() { return this.formDirective.getControl(this); }
    _checkParentType() {
        if (!(this._parent instanceof FormGroupName) &&
            this._parent instanceof AbstractFormGroupDirective) {
            ReactiveErrors.ngModelGroupException();
        }
        else if (!(this._parent instanceof FormGroupName) && !(this._parent instanceof FormGroupDirective) &&
            !(this._parent instanceof FormArrayName)) {
            ReactiveErrors.controlParentException();
        }
    }
}
/** @nocollapse */
FormControlName.decorators = [
    { type: Directive, args: [{ selector: '[formControlName]', providers: [controlNameBinding] },] },
];
/** @nocollapse */
FormControlName.ctorParameters = [
    { type: ControlContainer, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf },] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] },] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] },] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALUE_ACCESSOR,] },] },
];
/** @nocollapse */
FormControlName.propDecorators = {
    'name': [{ type: Input, args: ['formControlName',] },],
    'model': [{ type: Input, args: ['ngModel',] },],
    'update': [{ type: Output, args: ['ngModelChange',] },],
    'isDisabled': [{ type: Input, args: ['disabled',] },],
};
//# sourceMappingURL=form_control_name.js.map