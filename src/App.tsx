import { SplineSceneBasic } from '@/components/demo';
import { SectionDiferenciais } from '@/components/SectionDiferenciais';
import { SectionBeneficios } from '@/components/SectionBeneficios';
import Footer from "./components/Footer";
import './App.css';

function App() {
  return (
    <div className="w-full min-h-screen bg-background">
      <div className="relative w-full h-screen">
        <SplineSceneBasic />
      </div>
      <SectionDiferenciais />
      <SectionBeneficios />
      <Footer />
    </div>
  );
}

export default App;