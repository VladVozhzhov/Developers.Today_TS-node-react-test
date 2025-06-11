import {
  getAllRecipes,
  getRecipesByFilter,
  getRecipeById
} from '../services/recipeService';
import { Request, Response } from 'express';

const handleGetByCategory = async (req: Request, res: Response): Promise<void> => {
  const { ingredient, area, category } = req.query;
  try {
    if (ingredient || area || category) {
      const filtered = await getRecipesByFilter({
        ingredient: ingredient as string,
        area: area as string,
        category: category as string
      });
      res.json(filtered);
    } else {
      const all = await getAllRecipes();
      res.json(all);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
}

const handleGetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipe = await getRecipeById(req.params.id);
    res.json(recipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch recipe details' });
  }
}

export {
  handleGetByCategory,
  handleGetById
};