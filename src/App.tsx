import { useState } from 'react';
import type { Property } from './data/properties';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PropertyGallery } from './components/PropertyGallery';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PropertyModal } from './components/PropertyModal';

export default function App() {
  const [modalProperty, setModalProperty] = useState<Property | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireProperty = (property: Property) => {
    setSelectedPropertyId(property.id);
    setModalProperty(null);
    setTimeout(() => {
      scrollToContact();
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111111]">
      <Navbar onBookCall={scrollToContact} />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection onBookCall={scrollToContact} />

        {/* Section 2: Property Gallery */}
        <PropertyGallery
          onSelectProperty={(property) => setModalProperty(property)}
          onInquireProperty={handleInquireProperty}
        />

        {/* Section 3: About Us & Advisory */}
        <AboutSection onBookCall={scrollToContact} />

        {/* Section 4: Private Inquiry & Preferences Form */}
        <ContactSection
          selectedPropertyId={selectedPropertyId}
          onClearSelectedProperty={() => setSelectedPropertyId('')}
        />
      </main>

      {/* Section 5: Footer with Navigation */}
      <Footer />

      <PropertyModal
        property={modalProperty}
        onClose={() => setModalProperty(null)}
        onInquire={handleInquireProperty}
      />
    </div>
  );
}
