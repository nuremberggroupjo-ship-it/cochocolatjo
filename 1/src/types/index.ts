import { ChangeEventHandler, FC, SVGProps } from "react"

import { deleteCategoryAction } from "@/features/admin/features/categories/actions/delete-category.action"

export type ShopMainNavItem = {
  id: string
  label: string
  href: string
  comingSoon?: boolean
}

export type SocialLink = {
  id: string
  icon: FC<SVGProps<SVGSVGElement>>
  name: string
  href: string
}

export type ChangeEventInputType =
  | ChangeEventHandler<HTMLInputElement>
  | undefined

export type WithRequiredSearchParams = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export type WithRequiredParams = {
  params: Promise<{ slug: string }>
}
export type WithRequiredIdParams = {
  params: Promise<{ id: string }>
}
export type WithRequiredOrderNumberParams = {
  params: Promise<{ orderNumber: string }>
}

// Actions
export interface ActionReturn<T = undefined> {
  // Indicates whether the action was successful
  success: boolean

  // Optional data returned by the action (generic type)
  result?: T

  // Optional error message if the action failed
  message?: string

  // May also include other fields like:
  // error?: string;
  // status?: number;
}

// GET
export type GetEntitiesOptions<WhereInput, OrderByInput> = {
  limit?: number
  offset?: number
  where?: WhereInput
  orderBy?: OrderByInput[]
}

export type GetEntitiesResult<T> = {
  data: T[]
  total?: number
}

// DELETE
export type DeleteSafeAction = typeof deleteCategoryAction

export type FavoriteInfo = {
  isFavorite: boolean
}

export type CartInfo = {
  inCart: boolean
  quantity: number
  itemsPrice?: number
  totalPrice?: number
  shippingPrice?: number
}

export type ProductsSort =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "alpha-asc"
  | "alpha-desc"

export type MailDataState = {
  email: string
  message: string
}
