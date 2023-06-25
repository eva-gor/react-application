import { NavLink, Outlet } from "react-router-dom";
import statuses from "../../config/statuses.json";
import { useSelectorAuthorizationStatus } from "../../redux/store";
import { StatusAuthorizedType } from "../../model/StatusAuthorizedType";
import { ReactNode } from "react";


const Navigator: React.FC = () => {
    const status: StatusAuthorizedType = useSelectorAuthorizationStatus();
    const pages: string[][] = statuses[status];
    const navLinks:ReactNode[] = pages.map(page => {
        return <li className="navigator-item">
            <NavLink to={page[0]}>{page[1]}</NavLink>
        </li>
    });

    return <div >
        <nav>
            <ul className="navigator-list">
               {navLinks}
            </ul>
        </nav>
        <Outlet></Outlet>
    </div>
}

export default Navigator;