import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RecipeListPage from './RecipeListPage'
import RecipeInfoPage from './RecipeInfoPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecipeListPage />} />
        <Route path="/recipes" element={<RecipeListPage />} />
        <Route path="/recipes/:id" element={<RecipeInfoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
