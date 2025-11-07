"use client";

import { Hero } from "@/components/home/hero";
import { FeatureGrid } from "@/components/home/feature-grid";
import { ProductPreview } from "@/components/home/product-preview";
import { Testimonials } from "@/components/home/testimonials";
import { PricingCTA } from "@/components/home/pricing-cta";
import { FooterCTA } from "@/components/home/footer-cta";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-[#050509] text-white overflow-x-hidden">
      <main className="flex flex-col gap-12 pb-12">
        <Hero />
      </main>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-8">
        <FeatureGrid />
        <ProductPreview />
        <Testimonials />
        <PricingCTA />
        <FooterCTA />
      </section>
    </div>
  );
}
