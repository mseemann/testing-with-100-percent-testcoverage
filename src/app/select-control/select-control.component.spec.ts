import {SelectControlComponent} from './select-control.component';

describe('SelectControlComponent', () => {
  let component: SelectControlComponent<unknown>;

  beforeEach(async () => {
    component = new SelectControlComponent<unknown>({} as any)
  });

  it('should create the component and have default inits', () => {
    expect(component).toBeTruthy();
    // just to ensure we reach 100% - so let's see if we have initialized teh callbacks ;)
    (component as any).onTouched();
    (component as any).onChange();
  });

  it('should register the onChange function', () => {
    const fn = () => {
    };

    component.registerOnChange(fn);

    expect((component as any).onChange).toBe(fn)
  });

  it('should register the onTouch function', () => {
    const fn = () => {
    };

    component.registerOnTouched(fn);

    expect((component as any).onTouched).toBe(fn)
  });

  it('should write a value and update the state', () => {
    spyOn((component as any), 'updateSelection');
    const option = {value: 'a', label: 'a'};
    component.options = [option];

    component.writeValue('a');

    expect((component as any).updateSelection).toHaveBeenCalledOnceWith(option)
  });

  it('should open the options panel if the input is clicked', () => {
    expect(component.optionsVisible).toBeFalsy();

    component.inputClicked();

    expect(component.optionsVisible).toBeTruthy();
  });

  it('should call onTouch if the input lost the focus', () => {
    spyOn((component as any), 'onTouched');

    component.inputBlurred();

    expect((component as any).onTouched).toHaveBeenCalled()
  });

  it('should open the options panel if the input is focused', () => {
    expect(component.optionsVisible).toBeFalsy();

    component.inputFocused();

    expect(component.optionsVisible).toBeTruthy();
  });

  it('should update view, control and emit the option if a option is clicked', () => {
    spyOn((component as any), 'updateSelection');
    spyOn((component as any), 'onChange');
    spyOn((component as any), 'onTouched');
    spyOn(component.selectionChanged, 'emit');
    const option1 = {value: 'a', label: 'a'};
    const option2 = {value: 'b', label: 'b'};
    component.options = [option1, option2];

    component.optionClicked(option2);

    expect(component.optionsVisible).toBeFalsy();
    expect((component as any).onChange).toHaveBeenCalledOnceWith('b');
    expect((component as any).onTouched).toHaveBeenCalled();
    expect((component as any).updateSelection).toHaveBeenCalledOnceWith(option2);
    expect(component.selectionChanged.emit).toHaveBeenCalledOnceWith('b')
  });

  it('should update the current selection and the view model', () => {
    const option = {value: 'a', label: 'a'};
    (component as any).updateSelection(option);
    expect(component.selectedOption).toBe(option);
    expect(component.viewModel).toBe('a');
  });

  it('should update the current selection and the view model in case there is no matching option', () => {
    (component as any).updateSelection(undefined);
    expect(component.selectedOption).toBe(undefined);
    expect(component.viewModel).toBe('');
  });
});
