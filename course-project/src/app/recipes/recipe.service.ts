import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 10)
      ]),
    new Recipe('Burger',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Buns', 1),
        new Ingredient('Meat', 10)
      ]),
  ];
  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice()
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id]
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
  }

}
