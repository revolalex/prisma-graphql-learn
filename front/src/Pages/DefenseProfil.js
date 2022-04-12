import WaveAnimationComponent from "../Component/Animation/WaveAnimation";
import DefenseProfilesCard from "../Component/DefenseProfile/DefenseProfilesCard";
import MyNavbar from "../Component/Navbar/MyNabar";


const DefenseProfil = () => {
    return (
        <div className="container-global-custom" style={{ minHeight: "100vh" }}>
            <WaveAnimationComponent/>
            <MyNavbar />
            <DefenseProfilesCard/>
        </div>
    );
}

export default DefenseProfil;