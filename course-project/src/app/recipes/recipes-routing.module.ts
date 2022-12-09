import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AnthGuard } from '../auth/auth-guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';


const routes: Route[] = [
    {
        path: 'recipes',
        component: RecipesComponent,
        canActivate: [AnthGuard], children: [
            { path: '', component: RecipeStartComponent },
            // IMPORTANT! 有參數的route應該放在後面 否則會把其他路徑視為參數
            { path: 'new', component: RecipeEditComponent },
            // resolver will be run before component, make sure data is loaded
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class RecipesRoutingModule {

}



