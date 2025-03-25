
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "lucide-react";
import useCartStore from "@/store/cart-store";

interface LayoutProps {
  children: ReactNode;
  title: string;
  showCart?: boolean;
}

const Layout = ({ children, title, showCart = true }: LayoutProps) => {
  const cartItemsCount = useCartStore(state => state.getTotalItems());
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-4 bg-shop-pink">
        <div className="container max-w-5xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-semibold tracking-tight">
            {title}
          </Link>
          
          {showCart && (
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-shop-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </div>
              )}
            </Link>
          )}
        </div>
      </header>
      
      <main className="flex-grow container max-w-5xl mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="py-6 bg-shop-light mt-auto">
        <div className="container max-w-5xl mx-auto px-4 text-center text-shop-muted text-sm">
          <p>© 2023 ShoppeQuest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
