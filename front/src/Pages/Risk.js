import MyNavbar from "../Component/Navbar/MyNabar";
import './Risk.css'
import RiskCard from "../Component/RIsk/RiskCard";
import WaveAnimationComponent from "../Component/Animation/WaveAnimation";

const RiskList = () => {
    return (
        <div className="container-global-custom" style={{ minHeight: "100vh" }}>
            <WaveAnimationComponent/>
            <MyNavbar />
            <RiskCard />
        </div>
    );

}

export default RiskList;