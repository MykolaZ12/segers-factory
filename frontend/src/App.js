import './App.css';
import './resources/css/shortcode/header.css'
import './resources/css/themify-icons.css'
import './resources/css/custom.css'
import './resources/style.css'
import './resources/css/owl.theme.default.min.css'
import './resources/css/owl.carousel.min.css'
import './resources/css/core.css'
import './resources/css/shortcode/shortcodes.css'
import './resources/css/responsive.css'

import {Header} from "./components/Header/Header";
import {BrowserRouter, Route} from "react-router-dom";
import {Register} from "./components/Auth/Register/Register";
import {Login} from "./components/Auth/Login/Login";
import {Shop} from "./components/Shop/Shop";
import {Footer} from "./components/Footer/Footer";
import {ShoppingCart} from "./components/Shop/ShoppingCart/ShoppingCart";
import {Order} from "./components/Order/Order";
import {ProductDetail} from "./components/Shop/ProductDetail/ProductDetail";
import {AddCategory} from "./components/Dashboard/AddCategory";
import {AddProduct} from "./components/Dashboard/Product/AddProduct";
import {Main} from "./components/Main/Main";
import {Vacancy} from "./components/Vacancy/Vacancy";
import {ContactUs} from "./components/Contact Us/ContactUs";
import {AboutUs} from "./components/AboutUs/AboutUs";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {CartProvider} from "react-use-cart";
import {UpdateProduct} from "./components/Dashboard/Product/UpdateProduct";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
             <CartProvider>
                <Header/>
                <div className="body__overlay"></div>
                <Route exact path='/' render={() => <Main/>}/>
                <Route path='/register' render={() => <Register/>}/>
                <Route path='/login' render={() => <Login/>}/>
                <Route path='/shop' render={() => <Shop/>}/>
                <Route path='/cart' render={() => <ShoppingCart/>}/>
                <Route path='/order' render={() => <Order/>}/>
                <Route path='/vacancy' render={() => <Vacancy/>}/>
                <Route path='/about-us' render={() => <AboutUs/>}/>
                <Route path='/contact-us' render={() => <ContactUs/>}/>
                <Route path='/product/:productId' render={(props) => <ProductDetail {...props}/>}/>
                <Route path='/dashboard/category/' render={() => <AddCategory/>}/>
                <Route path='/dashboard/product-create/' render={() => <AddProduct />}/>
                <Route path='/dashboard/product-update/:productId' render={(props) => <UpdateProduct {...props}/>}/>
                <Footer/>
            </CartProvider>
        </BrowserRouter>
    )
}

export default App;
