import { fetchProductsHome } from "@/actions/products";
import Container from "@/components/Container";
import HeroPartnerCarousel from "@/components/user-components/HeroPartnerCarousel";
import HeroProductsDisplay from "@/components/user-components/HeroProductsDisplay";
import HomeHero from "@/components/user-components/HomeHero";
import { products } from "@/lib/dummy";
import Image from "next/image";

export default async function Home() {
  const productsHome = await fetchProductsHome();

  if (!productsHome) return <div>Error fetching products</div>;

  return (
    <main>
      <Container>
        <HomeHero product={productsHome[0]} />
      </Container>
      <HeroPartnerCarousel />
      <Container>
        <HeroProductsDisplay title="Bestsellers" products={productsHome || []} />
      </Container>
    </main>
  );
}
