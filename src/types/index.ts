export interface ProductListItem {
  id: string
  brand: string
  name: string
  basePrice: number
  imageUrl: string
}

export interface ProductSpecs {
  screen: string
  resolution: string
  processor: string
  mainCamera: string
  selfieCamera: string
  battery: string
  os: string
  screenRefreshRate: string
}

export interface ColorOption {
  name: string
  hexCode: string
  imageUrl: string
}

export interface StorageOption {
  capacity: string
  price: number
}

export interface ProductDetail extends ProductListItem {
  description: string
  rating: number
  specs: ProductSpecs
  colorOptions: ColorOption[]
  storageOptions: StorageOption[]
  similarProducts: ProductListItem[]
}

export interface CartItem {
  id: string
  brand: string
  name: string
  imageUrl: string
  color: ColorOption
  storage: StorageOption
  price: number
}

export interface CartState {
  items: CartItem[]
}
