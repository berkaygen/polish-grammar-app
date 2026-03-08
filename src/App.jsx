import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SidebarLayout from './components/SidebarLayout'
import Home from './pages/Home'
import Learn from './pages/Learn'
import LearnCase from './pages/LearnCase'
import Difficulty from './pages/Difficulty'
import Exercise from './pages/Exercise'
import Results from './pages/Results'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages with persistent sidebar */}
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/learn/:topic" element={<Learn />} />
          <Route path="/learn/noun-cases/:case" element={<LearnCase />} />
        </Route>

        {/* Practice flow — no sidebar */}
        <Route path="/difficulty/:topic" element={<Difficulty />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  )
}
