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

  const { generateDynamicMetadata, createMetadata } = await import(
    "@/constants"
  )
  return createMetadata(
    generateDynamicMetadata.product({
      name: product.name,
      description: product.description || undefined,
      slug: product.slug,
      images: product.productImages?.map((img) => img.imageUrl),
    }),
  )
}
