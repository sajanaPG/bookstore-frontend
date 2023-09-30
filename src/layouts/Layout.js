import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

const Layout = () => {
    return (
        <div>
            <div>
                <NavigationBar/>
            </div>

            <Container className="py-4">
                <Outlet />
            </Container>

            <Footer/>
        </div>


    )
}

export default Layout;