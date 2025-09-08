import { Metadata } from "next";
import { Suspense } from "react";

import { ProductsSort } from "@/types";

import { toArray } from "@/lib/utils";

import { ProductsGridSkeleton } from "@/components/shared/skeletons/products-grid-skeleton";

import { ProductsGridResult } from "@/features/shop-now/components/products-grid-result";

interface ShopNowPageProps {
  searchParams: {
    q?: string;
    page?: string;
    category?: string | string[];
    attribute?: string | string[];
    sort?: string;
    sale?: string | string[];
    unit?: string | string[];

  };
}

export default async function ShopNowPage({ searchParams }: ShopNowPageProps) {
  // ❌ أزل await هنا.
  const { q, attribute, category, page, sort, sale,unit } = searchParams;
  const currentPage = Number(page) || 1;
  const categories = toArray(category);
  const attributes = toArray(attribute);
  const sales = toArray(sale); // ✅ هذا السطر صحيح وسيعمل الآن
  const units = toArray(unit);   // ✅ new
  

  return (
    <div className="space-y-10 group-has-[[data-pending]]:animate-pulse">
      <Suspense
        fallback={<ProductsGridSkeleton length={8} withTitle />}
        key={`${q}-${categories?.join(",")}-${attributes?.join(
          ","
        )}-${currentPage}-${sort}-${sales.join(",")}`}
      >
        <ProductsGridResult
          currentPage={currentPage}
          attributes={attributes}
          categories={categories}
          sort={sort as ProductsSort}
          q={q}
          sale={sales} // ✅ تمرير المتغير بعد تحويله لمصفوفة
          unit={units}   // ✅ fix: use units
  
        />
      </Suspense>
    </div>
  );
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string };
}): Promise<Metadata> {
  const { q } = searchParams;

  if (q) {
    const { generateDynamicMetadata, createMetadata } = await import(
      "@/constants"
    );
    return createMetadata(generateDynamicMetadata.searchResults(q));
  }

  const { PAGE_METADATA, createMetadata } = await import("@/constants");
  return createMetadata(PAGE_METADATA.shopNow);
}
