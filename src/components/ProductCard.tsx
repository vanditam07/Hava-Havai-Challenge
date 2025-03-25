
import { Product } from "@/types/product";
import { formatDiscountedPrice, formatPrice, getDiscountLabel } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import useCartStore from "@/store/cart-store";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { title, brand, price, discountPercentage, thumbnail } = product;
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${title} added to cart`);
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col animate-fade-in" 
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-lg mb-1 line-clamp-1">{title}</h3>
        <p className="text-shop-muted text-sm mb-2">{brand}</p>
        
        <div className="mt-auto">
          <div className="flex flex-col mt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">{formatDiscountedPrice(price, discountPercentage)}</span>
              <span className="text-sm line-through text-shop-muted">{formatPrice(price)}</span>
            </div>
            <span className="text-shop-green text-xs font-medium">{getDiscountLabel(discountPercentage)}</span>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            className="w-full mt-4 bg-white border border-shop-accent text-shop-accent hover:bg-shop-accent hover:text-white transition-colors"
            size="sm"
          >
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
