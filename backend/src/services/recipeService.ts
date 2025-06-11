import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.RECIPE_API;

export const getAllRecipes = async () => {
  const res = await axios.get(`${BASE_URL}/search.php?s=`);
  return res.data;
};

export const getRecipesByFilter = async ({
  ingredient,
  area,
  category
}: {
  ingredient?: string;
  area?: string;
  category?: string;
}) => {
  let url = '';
  switch (true) {
    case !!ingredient:
      url = `${BASE_URL}/filter.php?i=${ingredient}`;
      break;
    case !!area:
      url = `${BASE_URL}/filter.php?a=${area}`;
      break;
    case !!category:
      url = `${BASE_URL}/filter.php?c=${category}`;
      break;
  }
  const res = await axios.get(url);
  return res.data;
};

export const getRecipeById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
  return res.data;
};
