import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import ProtectedRoute from './pages/ProtectedRoute';
import AllJobs from './pages/AllJobs';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AllJobs></AllJobs>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <StatsPage></StatsPage>
            </ProtectedRoute>
          }
        ></Route>
        <Route path="auth" element={<Register />} />
        {/* <Route path="*" /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
