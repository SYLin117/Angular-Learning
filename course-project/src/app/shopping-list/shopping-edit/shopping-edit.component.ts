import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  subscription: Subscription;
  editMode = false
  editedItemIndex: number
  editedItem: Ingredient
  @ViewChild('f') slForm: NgForm

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index
          this.editMode = true
          this.editedItem = this.shoppingListService.getIngredient(index)
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      )
  }

  onAddItem(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    // this.ingredientAdded.emit(newIngredient);

    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    }else{
      this.shoppingListService.addIngredient(newIngredient)
    }
    // this.shoppingListService.addIngredient(newIngredient)
    this.editMode = false
    form.reset()
  }

  onClear(){
    this.slForm.reset()
    this.editMode = false
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
