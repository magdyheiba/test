import { pojos, PojosMetadataMap } from '@automapper/pojos'
import { createMapper } from '@automapper/core'

export const mobiusRTDetailsResponseMapper = createMapper({
  strategyInitializer: pojos()
})
export interface Root {
  businessEntityId: number
  businessEntityGuid: string
  businessName: string
  orderingEnabled: boolean
  new: boolean
  isFavorite: boolean
  countryId: number
  street: string
  aptUnitSuite: string
  city: string
  state: string
  zipcode: string
  timezoneOffset: number
  latitude: number
  longitude: number
  phone: string
  deliveryEnabled: boolean
  pickupEnabled: boolean
  menuItemInstructionsEnabled: boolean
  orderInstructionsEnabled: boolean
  paymentOptions: string[]
  rating: Rating
  pickupSettings: PickupSettings
  deliverySettings: DeliverySettings
  defaultStoreHours: DefaultStoreHours
  specialStoreHours: any[]
  nextStoreOpenings: NextStoreOpening[]
  nextDeliveryOpenings: NextDeliveryOpening[]
  menuCategories: MenuCategory[]
  modifierBuilderTemplates: ModifierBuilderTemplate[]
  coupons: Coupon[]
}

export interface Rating {
  ratingValue: number
  ratingCount: number
}

export interface PickupSettings {
  pickupEstimate: number
  pickupOrderMinimumAmount: number
  pickupScheduledOrdersEnabled: boolean
}

export interface DeliverySettings {
  deliveryEstimate: number
  deliveryOrderMinimumAmount: number
  deliveryZones: DeliveryZone[]
  deliveryScheduledOrdersEnabled: boolean
}

export interface DeliveryZone {
  deliveryDistance: number
  deliveryFee: number
}

export interface DefaultStoreHours {
  sunday: Sunday[]
  monday: Monday[]
  tuesday: Tuesday[]
  wednesday: Wednesday[]
  thursday: Thursday[]
  friday: Friday[]
  saturday: Saturday[]
}

export interface Sunday {
  from: From
  to: To
}

export interface From {
  hour: number
  minute: number
}

export interface To {
  hour: number
  minute: number
}

export interface Monday {
  from: From2
  to: To2
}

export interface From2 {
  hour: number
  minute: number
}

export interface To2 {
  hour: number
  minute: number
}

export interface Tuesday {
  from: From3
  to: To3
}

export interface From3 {
  hour: number
  minute: number
}

export interface To3 {
  hour: number
  minute: number
}

export interface Wednesday {
  from: From4
  to: To4
}

export interface From4 {
  hour: number
  minute: number
}

export interface To4 {
  hour: number
  minute: number
}

export interface Thursday {
  from: From5
  to: To5
}

export interface From5 {
  hour: number
  minute: number
}

export interface To5 {
  hour: number
  minute: number
}

export interface Friday {
  from: From6
  to: To6
}

export interface From6 {
  hour: number
  minute: number
}

export interface To6 {
  hour: number
  minute: number
}

export interface Saturday {
  from: From7
  to: To7
}

export interface From7 {
  hour: number
  minute: number
}

export interface To7 {
  hour: number
  minute: number
}

export interface NextStoreOpening {
  from: string
  to: string
}

export interface NextDeliveryOpening {
  from: string
  to: string
}

export interface MenuCategory {
  menuCatId: number
  menuCatName: string
  menuCatDesc: string
  menuGroups: MenuGroup[]
}

export interface MenuGroup {
  menuGroupId: number
  menuGroupName: string
  menuGroupDesc: string
  serviceTime: any
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
  menuItems: MenuItem[]
}

export interface MenuItem {
  menuItemId: number
  menuItemName: string
  menuItemDesc: string
  menuItemImageUrl?: string
  spicy: boolean
  discountable: boolean
  menuItemSizes: MenuItemSize[]
}

export interface MenuItemSize {
  menuItemSizeId: number
  menuItemSizeDesc: string
  defaultUnitPrice: number
  modifierBuilderTemplateId: number
}

export interface ModifierBuilderTemplate {
  modifierBuilderTemplateId: number
  modifierBuilderTypes: ModifierBuilderType[]
}

export interface ModifierBuilderType {
  modifierBuilderTypeId: number
  modifierBuilderTypeName: string
  minSelection: number
  maxSelection: number
  modifierBuilderDetails: ModifierBuilderDetail[]
}

export interface ModifierBuilderDetail {
  modifierBuilderDetailId: number
  modifierName: string
  unitPrice: number
}

export interface Coupon {
  discountId: number
  couponName: string
  couponType: string
  toAmount: number
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
  fromDateTime: string
  toDateTime: string
  singleUse: boolean
  delivery: boolean
  pickup: boolean
}
PojosMetadataMap.create<Root>('mobiusRTDetailsResponseMapper', {
  businessEntityId: Number,
  businessEntityGuid: String,
  businessName: String,
  orderingEnabled: Boolean,
  new: Boolean,
  isFavorite: Boolean,
  countryId: Number,
  street: String,
  aptUnitSuite: String,
  city: String,
  state: String,
  zipcode: String,
  timezoneOffset: Number,
  latitude: Number,
  longitude: Number,
  phone: String,
  deliveryEnabled: Boolean,
  pickupEnabled: Boolean,
  menuItemInstructionsEnabled: Boolean,
  orderInstructionsEnabled: Boolean,
  paymentOptions: Array,
  rating: Object,
  pickupSettings: Object,
  deliverySettings: Object,
  defaultStoreHours: Object,
  specialStoreHours: Array,
  nextStoreOpenings: Array,
  nextDeliveryOpenings: Array,
  menuCategories: Array,
  modifierBuilderTemplates: Array,
  coupons: Array
})
