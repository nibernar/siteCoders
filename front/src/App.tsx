import React from 'react';
import { LocaleProvider } from './contexts/LocaleContext';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Process } from './components/sections/Process';
import { Benefits } from './components/sections/Benefits';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import './styles/animations.css';

function App() {
  return (
    <LocaleProvider>
      <div className="font-sans bg-background min-h-screen text-text-light">
        <Header />
        <main>
          <Hero />
          <Process />
          <Benefits />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}

export default App;