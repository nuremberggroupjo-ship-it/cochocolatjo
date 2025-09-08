import { Metadata } from "next"
import { Suspense } from "react"

import { type WithRequiredParams } from "@/types"

import { getAttributeBySlugAdmin, getAttributesAdmin } from "@/data"

import { AttributePageWrapper } from "@/features/admin/features/attributes/components/attribute-page-wrapper"
import { AttributePageWrapperSkeleton } from "@/features/admin/features/attributes/components/attribute-page-wrapper-skeleton"

export default function AttributePage({ params }: WithRequiredParams) {
  return (
    <Suspense fallback={<AttributePageWrapperSkeleton />}>
      <AttributePageWrapper params={params} />
    </Suspense>
  )
}

export async function generateMetadata({
  params,
}: WithRequiredParams): Promise<Metadata> {
  const { slug } = await params

  if (slug === "new") {
    return {
      title: "New Attribute",
      description: "Create a new attribute for your application.",
    }
  }

  const attribute = await getAttributeBySlugAdmin(slug)

  return {
    title: attribute?.name,
    description: `Details for attribute: ${attribute?.name}`,
  }
}

export async function generateStaticParams() {
  const attributes = await getAttributesAdmin()

  const staticPaths = [{ slug: "new" }]

  const dynamicPaths = attributes?.map((attribute) => ({
    slug: attribute.slug,
  }))

  return [...staticPaths, ...dynamicPaths]
}
