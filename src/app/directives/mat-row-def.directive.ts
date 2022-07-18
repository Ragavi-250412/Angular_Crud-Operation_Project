import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[MatRowDef]'
})
export class MatRowDefDirective {

  @Input() matRowDefColumns: string[];

}
