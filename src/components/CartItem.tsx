
import { CartItem as CartItemType } from "@/types/product";
import { formatDiscountedPrice, formatPrice, getDiscountLabel } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import useCartStore from "@/store/cart-store";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { title, brand, price, discountPercentage, thumbnail, quantity } = item;
  const { updateQuantity } = useCartStore();

  const incrementQuantity = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const decrementQuantity = () => {
    updateQuantity(item.id, quantity - 1);
  };

  return (
    <div className="p-4 border-b border-gray-100 animate-fade-in">
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-grow">
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-shop-muted text-sm">{brand}</p>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="font-medium">{formatDiscountedPrice(price, discountPercentage)}</span>
            <span className="text-sm line-through text-shop-muted">{formatPrice(price)}</span>
          </div>
          <span className="text-shop-green text-xs font-medium">{getDiscountLabel(discountPercentage)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md"
            onClick={decrementQuantity}
          >
            <MinusIcon className="h-3 w-3" />
          </Button>
          
          <span className="w-6 text-center">{quantity}</span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md"
            onClick={incrementQuantity}
          >
            <PlusIcon className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
