import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'color-picker',
  templateUrl: 'color-picker.component.html'
})
export class ColorPickerComponent {
  color: string;

  @Output()
  public colorChange = new EventEmitter<string>();

  setColor(color: string) {
    this.color = color;
    this.colorChange.emit(color);
  }
}
