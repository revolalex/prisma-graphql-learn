
import WaveAnimationComponent from "../Component/Animation/WaveAnimation";
import UserList from "../Component/User/UserList";
import MyNavbar from "../Component/Navbar/MyNabar";

const Users = () => {
    return (
        <div className="container-login-custom ">
            <WaveAnimationComponent/>
            <MyNavbar />
            <UserList/>
        </div>
    );
}

export default Users;