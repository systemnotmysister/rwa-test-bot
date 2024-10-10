"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const Claim_1 = __importDefault(require("./components/Claim"));
const UpgradeTime_1 = __importDefault(require("./components/UpgradeTime"));
const UpgradeSpeed_1 = __importDefault(require("./components/UpgradeSpeed"));
const Missions_1 = __importDefault(require("./components/Missions"));
const react_1 = __importDefault(require("react"));
function App() {
    // const location = useLocation();
    // const [bgClass, setBgClass] = useState('default-bg');
    // useEffect(() => {
    //   // Устанавливаем класс фона в зависимости от текущего маршрута
    //   const isMissionsPage = location.pathname === '/missions';
    //   setBgClass(isMissionsPage ? 'missions-bg' : 'default-bg');
    // }, [location]);
    return (react_1.default.createElement("div", { className: `container` },
        react_1.default.createElement("div", { className: "top-buttons" },
            react_1.default.createElement("div", { className: "button icon-graduation" },
                react_1.default.createElement("img", { className: 'header-im', src: "./kepka.png", alt: "" })),
            react_1.default.createElement("div", { className: "button icon-wallet" },
                react_1.default.createElement("img", { className: 'header-im', src: "./wallet.png", alt: "" }))),
        react_1.default.createElement("div", { className: "main-content" }),
        react_1.default.createElement("div", { className: "bottom-buttons" },
            react_1.default.createElement("div", { className: "button" },
                react_1.default.createElement(react_router_dom_1.Link, { to: '/claim' },
                    react_1.default.createElement("img", { className: 'image', src: "./cup.png", alt: "claim" }))),
            react_1.default.createElement("div", { className: "button" },
                react_1.default.createElement("img", { className: 'image', src: "./dengi.png", alt: "upgrade-time" })),
            react_1.default.createElement("div", { className: "button" },
                react_1.default.createElement(react_router_dom_1.Link, { to: '/missions' },
                    react_1.default.createElement("img", { className: 'image', src: "./note.png", alt: "missions" }))),
            react_1.default.createElement("div", { className: "button" },
                react_1.default.createElement(react_router_dom_1.Link, { to: '/upgrade-time' },
                    react_1.default.createElement("img", { className: 'image', src: "./palitra.png", alt: "upgrade" }))),
            react_1.default.createElement("div", { className: "button" },
                react_1.default.createElement(react_router_dom_1.Link, { to: '/upgrade-speed' },
                    react_1.default.createElement("img", { className: 'image', src: "./up.png", alt: "upgrade-speed" }))),
            react_1.default.createElement("div", { className: "button" },
                react_1.default.createElement("img", { className: 'image', src: "./ref.png", alt: "referrals" }))),
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/claim", element: react_1.default.createElement(Claim_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/upgrade-time", element: react_1.default.createElement(UpgradeTime_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/upgrade-speed", element: react_1.default.createElement(UpgradeSpeed_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/missions", element: react_1.default.createElement(Missions_1.default, null) }))));
}
exports.default = App;
