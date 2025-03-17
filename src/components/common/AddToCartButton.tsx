interface AddToCartButtonProps {
    productId: string;
    quantity: number;
  }
  
  export default function AddToCartButton({ productId, quantity }: AddToCartButtonProps) {
    const handleAddToCart = () => {
      console.log(`Added ${quantity} of product ${productId} to cart.`);
    };
  
    return (
      <button
        onClick={handleAddToCart}
        className="mt-6 w-full bg-black text-white py-3 text-lg font-semibold uppercase hover:bg-gray-800 transition"
      >
        Add to Cart
      </button>
    );
  }
  