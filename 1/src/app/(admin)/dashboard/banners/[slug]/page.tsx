import { type Metadata } from "next"
import { Suspense } from "react"

import { WithRequiredParams } from "@/types"

import { getBannerBySlugAdmin, getBannersAdmin } from "@/data"

import { BannerPageWrapper } from "@/features/admin/features/banners/components/banner-page-wrapper"
import { BannerPageWrapperSkeleton } from "@/features/admin/features/banners/components/banner-page-wrapper-skeleton"

export default function BannerPage({ params }: WithRequiredParams) {
  return (
    <Suspense fallback={<BannerPageWrapperSkeleton />}>
      <BannerPageWrapper params={params} />
    </Suspense>
  )
}

export async function generateMetadata({
  params,
}: WithRequiredParams): Promise<Metadata> {
  const { slug } = await params

  if (slug === "new") {
    return {
      title: "New Banner",
      description: "Create a new banner for your application.",
    }
  }

  const banner = await getBannerBySlugAdmin(slug)

  return {
    title: banner?.name,
    description: `Details for banner: ${banner?.name}`,
  }
}

export async function generateStaticParams() {
  const banners = await getBannersAdmin()

  const staticPaths = [{ slug: "new" }]

  const dynamicPaths = banners?.map((banner) => ({
    slug: banner.slug,
  }))

  return [...staticPaths, ...dynamicPaths]
}
