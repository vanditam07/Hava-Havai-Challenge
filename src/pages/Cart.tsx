
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import CartItem from "@/components/CartItem";
import useCartStore from "@/store/cart-store";
import { formatPrice } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ShoppingBagIcon } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  const handleCheckout = () => {
    toast.success("Order placed successfully!");
    clearCart();
    setTimeout(() => navigate("/"), 1500);
  };
  
  return (
    <Layout title="Cart" showCart={false}>
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 pl-0"
          onClick={() => navigate("/")}
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Catalogue
        </Button>
        
        {items.length === 0 ? (
          <div className="text-center py-12 border border-gray-100 rounded-lg bg-white">
            <div className="mb-4 flex justify-center">
              <ShoppingBagIcon className="h-12 w-12 text-shop-muted" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-shop-muted mb-6">Add items to your cart to see them here</p>
            <Button onClick={() => navigate("/")} className="bg-shop-accent hover:bg-shop-accent/90">
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-shop-pink py-3 px-4">
              <h2 className="text-xl font-medium text-center">Cart</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="p-4 bg-shop-light">
              <div className="flex justify-between items-center mb-6">
                <span className="font-medium">Amount Price</span>
                <span className="text-xl font-semibold">{formatPrice(getTotalPrice())}</span>
              </div>
              
              <Button 
                className="w-full bg-shop-accent hover:bg-shop-accent/90 text-white"
                onClick={handleCheckout}
              >
                Check Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
