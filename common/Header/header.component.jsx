
import { Style } from "./header.styles";
import { Transition } from "react-transition-group";
//import ThemeButton from "../../components/Theme/theme.component";

function Header({dark}){
    return (
        <Style.Container className="main-header">
            <div className="header-author">
                {/* <img src={fetchedProfilePic} alt="creator" /> */}
                <div className="author-details">
                <div className="name-wave">
                    {/* <h3>{fetchedUsername}</h3> */}
                    <span>👋</span>
                </div>
                {/* <span>{today}</span> */}
                </div>
            </div>
            <div className="notifications-area">
                {/* <ThemeButton /> */}
                <button
                className="notif-button"
                // onClick={() => setShowLogOut(!showLogOut)}
                >
                {/* <span>{fetchedUsername}</span> */}
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M9.70711 0.292893C10.0676 0.653377 10.0953 1.22061 9.7903 1.6129L9.70711 1.70711L5.70711 5.70711C5.34662 6.06759 4.77939 6.09532 4.3871 5.7903L4.29289 5.70711L0.292893 1.70711C-0.0976305 1.31658 -0.0976305 0.683418 0.292893 0.292893C0.653378 -0.0675907 1.22061 -0.0953203 1.6129 0.209705L1.70711 0.292893L5 3.585L8.29289 0.292893C8.65338 -0.0675907 9.22061 -0.0953203 9.6129 0.209705L9.70711 0.292893Z"
                    fill={dark ? "white" : "#0A1629"}
                    />
                </svg>
                </button>
                {/* <Transition
                key="header-options-transition"
                timeout={250}
                in={showLogOut}
                onEnter={enter}
                onExit={exit}
                mountOnEnter={true}
                unmountOnExit={true}
                >
                {(state) => (
                    <div className="header-options" onClick={logOut}>
                    <span>Log Out</span>
                    </div>
                )}
                </Transition> */}
            </div>
        </Style.Container>
    )
}
export default Header