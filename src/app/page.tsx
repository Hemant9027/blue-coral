import React from 'react';
import '@/styles/tailwind.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyExperience from '@/app/components/PropertyExperience';

export default function HomePage() {
  return (
    <>
      <Header />
      <PropertyExperience />
      <Footer />
    </>
  );
}
