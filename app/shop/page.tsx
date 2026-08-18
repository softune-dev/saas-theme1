import type { Metadata } from "next";
import { getSiteHost, getPageSeo, buildMetadata } from "@/lib/get-site";
import { getSiteCategories, getSiteProducts } from "@/lib/public-catalog";
import { ShopPageClient } from "./ShopPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const host = await getSiteHost();
  const seo = await getPageSeo("shop", host);

  return buildMetadata(seo);
}

export default async function ShopPage() {
  const host = await getSiteHost();
  const [categories, products] = await Promise.all([
    getSiteCategories(host),
    getSiteProducts(host),
  ]);

  return <ShopPageClient categories={categories} products={products} />;
}
