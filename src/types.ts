export type Language = 'en' | 'ar';

export type DietaryTag = 'bestseller' | 'chef-choice' | 'spicy' | 'vegetarian' | 'halal' | 'seafood' | 'breakfast';

export interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  price: number; // in AED
  description: string;
  descriptionAr: string;
  image: string;
  tags: DietaryTag[];
  rating: number;
  reviewsCount: number;
  prepTime: string;
  calories?: number;
  isAvailable: boolean;
  portionSize?: string;
  portionSizeAr?: string;
  options?: {
    name: string;
    nameAr: string;
    choices: { label: string; labelAr: string; extraPrice?: number }[];
  }[];
}

export interface Category {
  id: string;
  label: string;
  labelAr: string;
  iconName: string;
  description: string;
  descriptionAr: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedOptions?: Record<string, string>;
  specialInstructions?: string;
}

export type SeatingPreference = 'family' | 'majlis' | 'outdoor' | 'vip';

export interface Reservation {
  id: string;
  code: string;
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seating: SeatingPreference;
  occasion: string;
  specialRequests?: string;
  createdAt: string;
  status: 'confirmed' | 'pending';
}

export interface RestaurantReview {
  id: string;
  author: string;
  authorAr: string;
  rating: number;
  date: string;
  dateAr: string;
  comment: string;
  commentAr: string;
  dishRecommended: string;
  dishRecommendedAr: string;
  source: string;
}
