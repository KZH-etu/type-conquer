import { AnimatePresence } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'

/* Route */
import MainLayout from './layouts/MainLayout'
import BattleTypePage from './pages/BattleTypePage'

function App() {

  return (
    <AnimatePresence mode='wait'>
      <Routes>
        <Route path='/' element={<MainLayout />} >
          <Route index element={<BattleTypePage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
