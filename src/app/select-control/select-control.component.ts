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
  public selectedOption: OptionWithLabel<T> | undefined;
  public optionsVisible = false;

  constructor(@Self() ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(obj: T | null): void {
    const selectedOption = this.options.find(option => option.value === obj);
    this.updateSelection(selectedOption)
  }

  public inputClicked() {
    this.optionsVisible = true;
  }

  public inputBlurred() {
    this.onTouched();
  }

  public inputFocused() {
    this.optionsVisible = true;
  }

  public optionClicked(option: OptionWithLabel<T>) {
    this.updateSelection(option)
    this.onChange(option.value);
    this.onTouched();
    this.optionsVisible = false;
    this.selectionChanged.emit(option.value);
  }

  private onChange: (_: any) => void = () => {
  };

  private onTouched: () => void = () => {
  };

  private updateSelection(selectedOption: OptionWithLabel<T> | undefined) {
    this.selectedOption = selectedOption;
    this.viewModel = this.selectedOption ? this.selectedOption.label : ''
  }
}
