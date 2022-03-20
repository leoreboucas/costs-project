import { BrowserRouter as Routes, Route } from "react-router-dom";
import Home from '../components/pages/Home'
import Contact from '../components/pages/Contact'
import Company from '../components/pages/Company'
import NewProject from '../components/pages/NewProject'


function RoutesCost(){
    return(
        <>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/company" element={<Company />}></Route>
                <Route exact path="/contact" element={<Contact />}></Route>
                <Route exact path="/newproject" element={<NewProject />}></Route>
            </Routes>
        </>
    );
}

export default RoutesCost;