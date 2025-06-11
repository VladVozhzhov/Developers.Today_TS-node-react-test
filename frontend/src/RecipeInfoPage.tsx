import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

type Recipe = {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strArea: string
  strCategory: string
  strInstructions: string
  [key: string]: any
}

export default function RecipeInfoPage() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    axios.get(`/api/recipes/${id}`)
      .then(r => {
        const meal = r.data.meals?.[0]
        setRecipe(meal)
        setLoading(false)
        if (meal?.strCategory) {
          axios.get(`/api/recipes?category=${encodeURIComponent(meal.strCategory)}`)
            .then(catData => setCategoryRecipes(catData.data.meals || []))
        }
      })
  }, [id])

  if (loading || !recipe) return <div className="p-6">Loading...</div>

  const ingredients: string[] = []
  for (let i = 1; i <= 20; ++i) {
    const ing = recipe[`strIngredient${i}`]
    if (ing && ing.trim()) ingredients.push(ing)
  }

  const instructions: string[] = recipe.strInstructions
    ? recipe.strInstructions.split('\r').filter(Boolean)
    : []

  return (
    <div className="flex max-w-5xl mx-auto p-6 gap-8">
      {/* Main content */}
      <div className="flex-1">
        <div className="flex items-start gap-6">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-56 rounded-lg shadow" />
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold">{recipe.strMeal}</h1>
            <div className="my-2">
              <span
                className="text-blue-600 cursor-pointer underline"
                onClick={() => navigate(`/recipes?area=${encodeURIComponent(recipe.strArea)}`)}
              >
                {recipe.strArea}
              </span>
            </div>
            <div className="my-4 font-semibold text-lg">Instructions</div>
            <div className="text-left">
              <ul className="list-disc pl-5">
                {instructions.length > 0
                  ? instructions.map((inst, idx) => (
                      <li key={idx} className='py-1'>{inst.trim()}</li>
                    ))
                  : <li>{recipe.strInstructions}</li>
                }
              </ul>
            </div>
            <div className="my-4 font-semibold text-lg">Ingredients</div>
            <ul className="flex flex-wrap gap-2 list-none p-0 justify-center">
              {ingredients.map(ing => (
                <li key={ing}>
                  <span
                    className="text-indigo-600 cursor-pointer underline"
                    onClick={() => navigate(`/recipes?ingredient=${encodeURIComponent(ing)}`)}
                  >
                    {ing}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-64">
        <div className="font-bold mb-3">
          More in category:{" "}
          <span
            className="text-blue-600 cursor-pointer underline"
            onClick={() => navigate(`/recipes?category=${encodeURIComponent(recipe.strCategory)}`)}
          >
            {recipe.strCategory}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {categoryRecipes
            .filter(r => r.idMeal !== recipe.idMeal)
            .slice(0, 10)
            .map(r => (
              <div
                key={r.idMeal}
                className="flex items-center gap-2 cursor-pointer border border-gray-100 rounded px-2 py-1 hover:bg-gray-50 transition"
                onClick={() => navigate(`/recipes/${r.idMeal}`)}
              >
                <img src={r.strMealThumb} alt={r.strMeal} className="w-10 rounded" />
                <span>{r.strMeal}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
