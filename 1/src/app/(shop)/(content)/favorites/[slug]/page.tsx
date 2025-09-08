import { type Metadata } from "next"
import { Suspense } from "react"

import { getProductBySlugPublic, getProductsPublic } from "@/data"

import { SingleProductPageWrapper } from "@/features/single-product/components"
import { SingleProductPageSkeleton } from "@/features/single-product/skeletons"

interface SingleProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function SingleProductPage({
  params,
}: SingleProductPageProps) {
  return (
    <Suspense fallback={<SingleProductPageSkeleton />}>
      <SingleProductPageWrapper params={params} />
    </Suspense>
  )
}

export async function generateStaticParams() {
  const products = await getProductsPublic()

  return (
    products?.map((product) => ({
      slug: product.slug,
    })) ?? []
  )
}

export async function generateMetadata({
  params,
}: SingleProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlugPublic(slug)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  // This appears to be for favorite categories, so use the appropriate metadata
  const { generateDynamicMetadata, createMetadata } = await import(
    "@/constants"
  )
  return createMetadata(
    generateDynamicMetadata.favoritesCategory({
      name: product.name, // This might need adjustment based on the actual structure
      slug: product.slug,
    }),
  )
}
