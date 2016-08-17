/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BaseException } from '@angular/core';
import { isPresent } from '../facade/lang';
/**
 * Base class for control directives.
 *
 * Only used internally in the forms module.
 *
 * @stable
 */
export class AbstractControlDirective {
    get control() { throw new BaseException('unimplemented'); }
    get value() { return isPresent(this.control) ? this.control.value : null; }
    get valid() { return isPresent(this.control) ? this.control.valid : null; }
    get invalid() { return isPresent(this.control) ? this.control.invalid : null; }
    get pending() { return isPresent(this.control) ? this.control.pending : null; }
    get errors() {
        return isPresent(this.control) ? this.control.errors : null;
    }
    get pristine() { return isPresent(this.control) ? this.control.pristine : null; }
    get dirty() { return isPresent(this.control) ? this.control.dirty : null; }
    get touched() { return isPresent(this.control) ? this.control.touched : null; }
    get untouched() { return isPresent(this.control) ? this.control.untouched : null; }
    get statusChanges() {
        return isPresent(this.control) ? this.control.statusChanges : null;
    }
    get valueChanges() {
        return isPresent(this.control) ? this.control.valueChanges : null;
    }
    get path() { return null; }
    reset(value = undefined) {
        if (isPresent(this.control))
            this.control.reset(value);
    }
}
//# sourceMappingURL=abstract_control_directive.js.map