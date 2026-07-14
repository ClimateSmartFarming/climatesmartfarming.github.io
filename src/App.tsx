import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import NetworkPage from './pages/NetworkPage/NetworkPage';
import ContactPage from './pages/ContactPage/ContactPage';
import NewsPage from './pages/NewsPage/NewsPage';
import NewsArticlePage from './pages/NewsPage/NewsArticlePage';
import ProgramsPage from './pages/ProgramsPage/ProgramsPage';
import ToolsSummaryPage from './pages/ToolsPage/ToolsSummaryPage';
import ToolPage from './pages/ToolsPage/ToolPage';
import ResourcesPage from './pages/ResourcesPage/ResourcesPage';
import ResourcePage from './pages/ResourcesPage/ResourcePage';
import ClimateImpactsPage from './pages/ClimateImpactsPage/ClimateImpactsPage';
import BlogPage from './pages/BlogPage/BlogPage';
import BlogArticlePage from './pages/BlogPage/BlogArticlePage';
import FarmerStoriesPage from './pages/FarmerStoriesPage/FarmerStoriesPage';
import FarmerStoryPage from './pages/FarmerStoriesPage/FarmerStoryPage';
import FactSheetsPage from './pages/FactSheetsPage/FactSheetsPage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import ProjectDetailPage from './pages/ProjectsPage/ProjectDetailPage';
import VideosPage from './pages/VideosPage/VideosPage';
import VideoDetailPage from './pages/VideosPage/VideoDetailPage';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsArticlePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogArticlePage />} />
        <Route path="/farmer-stories" element={<FarmerStoriesPage />} />
        <Route path="/farmer-stories/:id" element={<FarmerStoryPage />} />
        <Route path="/fact-sheets" element={<FactSheetsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/tools" element={<ToolsSummaryPage />} />
        <Route path="/tools/:id" element={<ToolPage />} />
        <Route path="/tools/decision" element={<Navigate to="/tools" replace />} />
        <Route path="/tools/climate" element={<Navigate to="/tools" replace />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/videos/:id" element={<VideoDetailPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/external" element={<ResourcesPage />} />
        <Route path="/resources/:id" element={<ResourcePage />} />
        <Route path="/climate-impacts" element={<ClimateImpactsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;