import DefenseProfilesCard from "../Component/DefenseProfile/DefenseProfilesCard";
import MyNavbar from "../Component/Navbar/MyNabar";


const DefenseProfil = () => {
    return (
        <div className="container-global-custom" style={{ minHeight: "100vh" }}>
            <MyNavbar />
            <DefenseProfilesCard/>
        </div>
    );
}

export default DefenseProfil;