export interface RecipeInterface {
  _id: string;
  title?: string;
  image?: string;
  subtitle: string;
  description?: string;
  materials?: string;
  ingredient?: string;
  steps: [];
  duration?: string;
  author?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomRequest {
  file: object;
  params: object;
  query: object;
  path: object;
}

interface Recipe {
  $search: string;
}

export interface FilterInterface {
  verified?: string;
  role?: string;
  updated?: string;
  $text: Recipe;
}
