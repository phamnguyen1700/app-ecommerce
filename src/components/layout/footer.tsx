import { Button } from "../ui/button";
import Icon from "../common/icon";
export default function Footer() {
  return (
    <footer className="bg-white border-t py-10">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-5 items-start gap-4">
          <div className="items-start">
            <h3 className="text-left font-bold mb-3">PRODUCTS</h3>
            <div className="flex flex-col items-start">
                <Button variant="link" className="text-xs" >Shoes</Button>
                <Button variant="link" className="text-xs" >Clothing</Button>
                <Button variant="link" className="text-xs" >Accessories</Button>
                <Button variant="link" className="text-xs" >Gift Cards</Button>
                <Button variant="link" className="text-xs" >New Arrivals</Button>
                <Button variant="link" className="text-xs" >Best Sellers</Button>
                <Button variant="link" className="text-xs" >Release Dates</Button>
                <Button variant="link" className="text-xs" >Sale</Button>
            </div>
          </div>

          <div className="items-start">
            <h3 className="text-left font-bold mb-3">SPORTS</h3>
            <div className="space-y-1">
              <Button variant="link" className="text-xs" >Soccer</Button>
              <Button variant="link" className="text-xs" >Running</Button>
              <Button variant="link" className="text-xs" >Basketball</Button>
              <Button variant="link" className="text-xs" >Football</Button>
              <Button variant="link" className="text-xs" >Outdoor</Button>
            </div>
          </div>

          <div className="items-start">
            <h3 className="text-left font-bold mb-3">SUPPORT</h3>
            <div className="space-y-1">
              <Button variant="link" className="text-xs" >Help</Button>
              <Button variant="link" className="text-xs" >Shipping</Button>
              <Button variant="link" className="text-xs" >Order Tracker</Button>
              <Button variant="link" className="text-xs" >Store Locator</Button>
            </div>
          </div>

          <div className="items-start">
            <h3 className="text-left font-bold mb-3">COMPANY</h3>
            <div className="space-y-1">
              <Button variant="link" className="text-xs" >About Us</Button>
              <Button variant="link" className="text-xs" >Careers</Button>
              <Button variant="link" className="text-xs" >Planet</Button>
            </div>
          </div>

          <div className="items-start">
            <h3 className="text-left font-bold mb-3">FOLLOW US</h3>
            <div className="flex flex-col items-start space-y-3">
                <Icon name="facebook" className="w-5 h-5" />
                <Icon name="instagram" className="w-5 h-5" />
                <Icon name="youtube" className="w-5 h-5" />
            </div>
          </div>
        </div>
        </div>
    </footer>
  );
}
