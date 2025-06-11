import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

type Recipe = {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strArea?: string
  strCategory?: string
}

function getTitle(query: URLSearchParams) {
  if (query.get('ingredient')) return `Recipes with ingredient: ${query.get('ingredient')}`
  if (query.get('area')) return `Recipes from country: ${query.get('area')}`
  if (query.get('category')) return `Recipes in category: ${query.get('category')}`
  return 'All Recipes'
}

export default function RecipeListPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])
  const location = useLocation()
  const navigate = useNavigate()
  const query = new URLSearchParams(location.search)

  useEffect(() => {
    setLoading(true)
    let url = '/api/recipes'
    const params = []
    if (query.get('ingredient')) params.push(`ingredient=${encodeURIComponent(query.get('ingredient')!)}`)
    if (query.get('area')) params.push(`area=${encodeURIComponent(query.get('area')!)}`)
    if (query.get('category')) params.push(`category=${encodeURIComponent(query.get('category')!)}`)
    if (params.length) url += '?' + params.join('&')
    axios.get(url)
      .then(r => {
        setRecipes(r.data.meals || [])
        setLoading(false)
      })
  }, [location.search])

  useEffect(() => {
    axios.get('/api/recipes')
      .then(r => {
        const all = (r.data.meals as Recipe[]) || []
        const cats: string[] = Array.from(new Set(all.map((rec) => rec.strCategory).filter((cat): cat is string => Boolean(cat))))
        setCategories(cats)
      })
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{getTitle(query)}</h1>
      <details className="mb-6 border rounded p-4">
        <summary className="cursor-pointer font-semibold">Select Category</summary>
        <div className="flex flex-wrap gap-2 mt-3">
          {categories.map(cat => (
            <button
              key={cat}
              className="px-3 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm cursor-pointer transition duration-150"
              onClick={() => navigate(`/recipes?category=${encodeURIComponent(cat)}`)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>
      </details>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {recipes.map(r => (
            <div
              key={r.idMeal}
              className="border border-gray-300 rounded-lg p-3 cursor-pointer w-48 text-center hover:shadow-lg transition"
              onClick={() => navigate(`/recipes/${r.idMeal}`)}
            >
              <img src={r.strMealThumb} alt={r.strMeal} className="w-full rounded mb-2" />
              <div className="mt-2 font-medium">{r.strMeal}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
