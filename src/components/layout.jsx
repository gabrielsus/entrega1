import Header from './header';
import Nav from './nav';
import Footer from './footer';
import './layout.css';
const Layout = () => {
    return (
        <div className = "app-Layout">
            <Header />
            <Nav />
            <Footer>
                <p>e-shop@eshop.com</p>
            </Footer>
        </div>
    );
}
export default Layout;