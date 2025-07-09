import { memo } from 'react';
import { SplineSceneBasic } from '@/components/demo';
import { SectionDiferenciais } from '@/components/SectionDiferenciais';
import { SectionBeneficios } from '@/components/SectionBeneficios';
import Footer from "./components/Footer";
import './App.css';

const App = memo(() => {
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
});

App.displayName = 'App';

export default App;