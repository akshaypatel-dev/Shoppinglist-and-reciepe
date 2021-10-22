import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup,Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {ShoppinglistService} from "../../shopping-list/shoppinglist.service";
import {relative} from "@angular/compiler-cli/src/ngtsc/file_system";
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipients:FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeservice: RecipeService,
              private slservice: ShoppinglistService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param) => {
        this.id = +param['id'];
        this.editMode = param['id'] != null;
        this.Initform();
      }
    );

  };
  getControl() {
    return (<FormArray>this.recipients.get('ingredients')).controls
  };
  onsubmit(){
    if(this.editMode){
      this.recipeservice.updaterecipe(this.id,this.recipients.value);
    }
    else {
      this.recipeservice.addrecipe(this.recipients.value)
    }
    this.cancelrecipe();

  };
  addIngredient() {
    const recipes = (<FormArray>this.recipients.get('ingredients'));
    recipes.push(new FormGroup({
      'ingredients_name': new FormControl( 'Enter Igrediants',Validators.required),
      'amount': new FormControl(0,[
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)]),
    }))

  };
  deleteme(index:number){
    ( <FormArray>this.recipients.get('ingredients')).removeAt(index);

  };
  cancelrecipe(){
    this.router.navigate(['../'],{relativeTo:this.route})
  };
  Initform() {
    let name = '';
    let imagepath = '';
    let Description = '';
    let ingredientsFormArray = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeservice.getRecipe(this.id);
      name = recipe.name;
      imagepath = recipe.imagepath;
      Description = recipe.description;
      if (recipe['ingredients']) {
        for (let i of recipe.ingredients) {
          ingredientsFormArray.push(new FormGroup({
            'ingredients_name': new FormControl(i.ingredients_name, Validators.required),
            'amount': new FormControl(i.amount, [Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }
    }
    this.recipients = new FormGroup({
        'name': new FormControl(name, [Validators.required]),
        'imagepath': new FormControl(imagepath, [Validators.required]),
        'description': new FormControl(Description, [Validators.required]),
        'ingredients': ingredientsFormArray
      }
    )

  };

}
