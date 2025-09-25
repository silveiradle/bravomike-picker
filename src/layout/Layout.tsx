import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import bg from "../assets/wall.png"

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen relative">
            <div className="w-full h-full absolute z-10">
                <div className="w-full flex flex-row justify-between  p-2 backdrop-blur-2xl shadow-xl fixed top-0">
                    <div className="flex flex-row items-center gap-2">
                        <img src={logo} className="h-10" />
                        <p className="text-xl text-yellow-400 font-bold">BRAVO.MIKE</p>
                    </div>

                    <nav className="flex flex-row gap-3 text-white ">
                        <button onClick={() => navigate('/')}><p className="uppercase font-bold"> Início</p> </button>
                    </nav>

                    <p>-</p>
                </div>

                <div className="w-full min-h-screen overflow-y-scroll flex flex-col items-center justify-center">
                    {children}
                </div>

            </div>
            <img src={bg} className="object-cover w-full h-full fixed z-0" />
        </div >
    );
};

export default Layout;