import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home'
import Agendamento from '../pages/Agendamento'
import Status from '../pages/Status'
export default function PagesRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/agendamento" element={<Agendamento />} />
            <Route path="/status" element={<Status />} />
        </Routes>
    )

}