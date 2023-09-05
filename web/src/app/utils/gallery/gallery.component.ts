import { Component, Input } from '@angular/core';
import { Carrousel } from 'src/app/feed/feed';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

  _items: Carrousel[] = [];

  @Input()
  set items(value: Carrousel[]) {
    this._items = value;
    this.selectedItem = value[0];
  }
  get items(): Carrousel[] {
    return this._items;
  }
  
  selectedItem: Carrousel | undefined;
  currentIndex: number = 0;

  prevItem() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedItem = this.items[this.currentIndex];
    }
  }

  nextItem() {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
      this.selectedItem = this.items[this.currentIndex];
    }
  }

  selectItem(i: number) {
    this.currentIndex = i;
    this.selectedItem = this.items[this.currentIndex];  
  }
}