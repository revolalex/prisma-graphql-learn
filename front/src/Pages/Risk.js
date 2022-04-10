import MyNavbar from "../Component/Navbar/MyNabar";
import './Risk.css'
import RiskCard from "../Component/RIsk/RiskCard";

const NoteView = () => {
    return (
        <div className="container-global-custom" style={{ minHeight: "100vh" }}>
            <MyNavbar />
            <RiskCard />
        </div>
    );

}

export default NoteView;