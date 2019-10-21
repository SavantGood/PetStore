import {Tag} from './tag';
import {Category} from './category';

export interface Pet {
  id: number;
  category: Category;
  name: string;
  photoUrls: string;
  tags: Tag[];
  status: string;
}
