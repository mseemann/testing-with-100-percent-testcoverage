import {Component, EventEmitter, Input, Output, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {OptionWithLabel} from "./option-with-label.interface";

@Component({
  selector: 'app-select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss']
})
export class SelectControlComponent<T> implements ControlValueAccessor {
  @Input()
  public options: OptionWithLabel<T>[] = []
  @Output()
  public selectionChanged = new EventEmitter<T>();

  public viewModel: string = '';
  public optionsVisible = false;

  constructor(@Self() ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  private _selectedOption: OptionWithLabel<T> | undefined;

  public get selectedOption(): OptionWithLabel<T> | undefined {
    return this._selectedOption;
  }

  public set selectedOption(option: OptionWithLabel<T> | undefined) {
    this._selectedOption = option;
    this.viewModel = option ? option.label : ''
    this.optionsVisible = false;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = (value) => {
      fn(value);
      this.onTouched();
      this.selectionChanged.emit(value);
    }
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(obj: T | null): void {
    this.selectedOption = this.options.find(option => option.value === obj);
  }

  public optionSelected(option: OptionWithLabel<T>) {
    this.selectedOption = option;
    this.onChange(option.value);
  }

  private onChange: (_: any) => void = () => {
  };

  public onTouched: () => void = () => {
  };

}
