import Image from "next/image"
import { notFound } from "next/navigation"
import { FC } from "react"

import { getCategoryBySlugPublic } from "@/data"

interface CategoryLayoutWrapperProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export const CategoryLayoutWrapper: FC<CategoryLayoutWrapperProps> = async ({
  children,
  params,
}) => {
  const { slug } = await params
  const category = await getCategoryBySlugPublic(slug)

  if (!category) {
    return notFound()
  }

  return (
    <>
      <section className="mt-4">
        <div className="space-y-4">
          {/* cover image */}
          {category.coverImage && (
            <Image
              src={category.coverImage}
              alt={category.name}
              width={1250}
              height={400}
              className="aspect-[16/5.5] w-full rounded"
            />
          )}
          {/* category name */}
          <h1 className="font-bold tracking-wider sm:text-base md:text-xl lg:text-2xl">
            {category.name}
          </h1>
          {/* category description */}
          {category.description && (
            <p className="text-muted-foreground text-sm md:text-base">
              {category.description}
            </p>
          )}
        </div>

        {children}
      </section>
    </>
  )
}
