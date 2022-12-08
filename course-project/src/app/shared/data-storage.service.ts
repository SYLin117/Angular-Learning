import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from "../auth/auth.service";

// providedIn: 'root' has same effect as add it in app.module.ts
@Injectable({ providedIn: 'root' })
export class DataStorageService {

  // adding private let typescript auto create property for us
  constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService) {

  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes()
    // here we use put depends on firebase api to "override" all data
    this.http.put('https://ng-course-recipe-568b6-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response)
      })
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-course-recipe-568b6-default-rtdb.firebaseio.com/recipes.json')
      // NOTICE !! these two map are different
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            // if ingredients not exist, set a empty array
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          })
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes)
        })
      )
      // .subscribe(recipes => {
      //   console.log(recipes)
      //   this.recipesService.setRecipes(recipes)
      // })
  }

}

