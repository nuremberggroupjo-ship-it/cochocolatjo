import { FC } from "react"

import type { WithRequiredParams } from "@/types"

import { getBannerBySlugAdmin } from "@/data"

import { BannerForm } from "@/features/admin/features/banners/components/banner-form"
import { type SaveBannerSchema } from "@/features/admin/features/banners/lib/banner.schema"

export const BannerPageWrapper: FC<WithRequiredParams> = async ({ params }) => {
  const { slug } = await params
  const banner = await getBannerBySlugAdmin(slug)

  const defaultValues: SaveBannerSchema = {
    name: banner?.name ?? "",
    slug: banner?.slug ?? "",
    image: banner?.image ?? "",
    priority: banner?.priority ?? 0,
    isActive: banner?.isActive ?? true,
    id: banner?.id,
  }
  const isEditing = !!banner

  return <BannerForm defaultValues={defaultValues} isEditing={isEditing} />
}
