import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: []
})
export class RecipesComponent implements OnInit {
  // we remove it because using routing
  // selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    // this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe
    // })
    // this.dataStorageService.fetchRecipes()
  }

}
