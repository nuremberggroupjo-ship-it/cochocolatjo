// app/(shop)/(content)/categories/[slug]/page.tsx

import Categories from "./categories";  // استورد المكون الرئيسي
import type { ShopNowPageProps } from "../../../../../types/types"; // لو حنستخدم واجهات Types منفصلة (اختياري)

export default function Page({ params, searchParams }: ShopNowPageProps) {
  return <Categories slug={params.slug} searchParams={searchParams} />;
}
