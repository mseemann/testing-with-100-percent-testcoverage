import {SelectControlComponent} from './select-control.component';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Component, DebugElement} from "@angular/core";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OptionWithLabel} from "./option-with-label.interface";
import {By} from "@angular/platform-browser";

@Component({
  template: `
    <form [formGroup]="form">
      <app-select-control
        [options]="nameOptions"
        [formControl]="nameControl"
        (selectionChanged)="nameSelectionChanged($event)"
      ></app-select-control>
    </form>
  `
})
class TestComponent {
  public nameControl = new FormControl();
  public form = new FormGroup({
    name: this.nameControl
  })
  public nameOptions: OptionWithLabel<string>[] = [
    {value: 'o1', label: 'Option 1'},
    {value: 'o2', label: 'Option 2'}
  ];

  nameSelectionChanged(option: string) {
    console.log(option);
  }
}

describe('SelectControlComponent', () => {
  let component: TestComponent;
  let selectComponent: SelectControlComponent<string>;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        SelectControlComponent
      ],
      imports: [ReactiveFormsModule, FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    selectComponent = fixture.debugElement.query(By.directive(SelectControlComponent)).componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });


  it('should create the SelectControlComponent with an empty value', () => {
    expect(selectComponent).toBeTruthy();
    expect(inputEl.nativeElement.value).toEqual('');
  });

  it('should show the options if the input is clicked', () => {
    expect(fixture.debugElement.query(By.css('.options'))).toBeNull();

    inputEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.options'))).not.toBeNull();
  });

  it('should show the options if the input get the focus', () => {
    inputEl.triggerEventHandler('focus', null);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.options'))).not.toBeNull();
  });

  it('should mark the form control as touched if the input lost the focus', () => {
    expect(component.nameControl.touched).toBeFalsy();

    inputEl.triggerEventHandler('blur', null);
    fixture.detectChanges();

    expect(component.nameControl.touched).toBeTruthy();
  });

  it('should emit the selected option, adapt the view value and update the control value', async () => {
    spyOn(component,'nameSelectionChanged');
    // ensure the options are visible and can be selected
    inputEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    const optionItems = fixture.debugElement.queryAll(By.css('.option-item'));
    optionItems[0].triggerEventHandler('click', null);

    fixture.detectChanges();
    // ensure the update reaches every part of the view
    await fixture.whenStable()
    expect(component.nameSelectionChanged).toHaveBeenCalledWith('o1')
    expect(component.nameControl.value).toEqual('o1');
    expect(inputEl.nativeElement.value).toEqual('Option 1');

    const optionsPanel = fixture.debugElement.query(By.css('.options'));
    expect(optionsPanel).toBeNull();
  })

});
