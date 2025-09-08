import { Suspense } from "react"

import { CategoryLayoutWrapper } from "@/features/categories/components/category-layout-wrapper"
import { CategoryLayoutWrapperSkeleton } from "@/features/categories/skeletons/category-layout-wrapper-skeleton"

interface CategoryLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default function CategoryLayout({
  children,
  params,
}: CategoryLayoutProps) {
  return (
    <Suspense fallback={<CategoryLayoutWrapperSkeleton />}>
      <CategoryLayoutWrapper params={params}>{children}</CategoryLayoutWrapper>
    </Suspense>
  )
}
