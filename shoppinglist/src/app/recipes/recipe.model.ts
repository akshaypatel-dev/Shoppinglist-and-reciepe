import {IngrediantsModel} from "../shared/ingrediants.model";

export interface RecipeModel extends IngrediantsModel {
  name:string
  description:string;
  imagepath:string;
  ingrediant_name:string;
  amount:number;

}
