// app/(shop)/(content)/categories/[slug]/page.tsx

import Categories from "./categories";  // استورد المكون الرئيسي
import type { ShopNowPageProps } from "../../../../../types/types"; // لو حنستخدم واجهات Types منفصلة (اختياري)

export default async function Page({ params, searchParams }: ShopNowPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  return <Categories slug={resolvedParams.slug} searchParams={resolvedSearchParams} />;
}
