import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {OptionWithLabel} from "./select-control/option-with-label.interface";

const option1 = {value: 'o1', label: 'Option 1'};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public nameControl = new FormControl(option1.value);
  public form =  new FormGroup({
    name: this.nameControl
  })
  public nameOptions: OptionWithLabel<string>[] =  [];

  public ngOnInit() {
    this.nameOptions =[
      option1,
      {value: 'o2', label: 'Option 2'}
    ]
  }

  nameSelectionChanged(option: string) {
    console.log(option)
  }
}
