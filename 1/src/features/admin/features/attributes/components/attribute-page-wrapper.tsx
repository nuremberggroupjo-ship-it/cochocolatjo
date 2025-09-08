import { FC } from "react"

import type { WithRequiredParams } from "@/types"

import { getAttributeBySlugAdmin } from "@/data"

import { AttributeForm } from "@/features/admin/features/attributes/components/attribute-form"
import { type SaveAttributeSchema } from "@/features/admin/features/attributes/lib/attribute.schema"

export const AttributePageWrapper: FC<WithRequiredParams> = async ({
  params,
}) => {
  const { slug } = await params
  const attribute = await getAttributeBySlugAdmin(slug)

  const defaultValues: SaveAttributeSchema = {
    name: attribute?.name ?? "",
    slug: attribute?.slug ?? "",
    image: attribute?.image ?? "",
    description: attribute?.description ?? "",
    id: attribute?.id,
  }
  const isEditing = !!attribute

  return <AttributeForm defaultValues={defaultValues} isEditing={isEditing} />
}
