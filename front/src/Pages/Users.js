
import WaveAnimationComponent from "../Component/Animation/WaveAnimation";
import UserList from "../Component/User/UserList";
import MyNavbar from "../Component/Navbar/MyNabar";

const Users = () => {
    return (
        <div className="container-global-custom" style={{ minHeight: "100vh" }}>
            <WaveAnimationComponent/>
            <MyNavbar />
            <UserList/>
        </div>
    );
}

export default Users;