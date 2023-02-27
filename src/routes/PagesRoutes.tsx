import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home'
import Teste from '../pages/Teste'
export default function PagesRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/teste" element={<Teste />} />
        </Routes>
    )

}