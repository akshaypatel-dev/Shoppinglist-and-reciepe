import {IngrediantsModel} from "../shared/ingrediants.model";

export interface RecipeModel{
  name:string
  description:string;
  imagepath:string;
  ingredients:IngrediantsModel[]

}
