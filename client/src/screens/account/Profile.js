import { useEffect, useState } from "react";
import { Link as A} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { apiCall } from "../../utils/api";

import Button from "../../components/button/Button";

import SpacedItems from "../../components/container/SpacedItems";
import LinkListBox from "../../components/container/LinkListBox";
import LoadingGate from "../../components/effect/LoadingGate";

const Profile = ({ setViewParams }) => {
    const { logout } = useAuth();

    const [profile, setProfile] = useState({});
    const [profileLoadingState, setProfileLoadingState] = useState(true);

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "Account",
            backURL: "",
            showNavBar: true
        }));
    }, [setViewParams]);

    useEffect(() => {
        const fetchProfile = async () => {
            setProfileLoadingState(true);
            try {
                const resProfile = await apiCall("/users/profile");
                setProfile(resProfile.data);                
            } catch (error) {
                console.error("Profile fetching failed:", error);
            } finally {
                setProfileLoadingState(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
		try {
			await logout()
		} catch (error) {
			alert("Failed to logout!");
		}
	};

    return (
        <>
            <SpacedItems>
                <LoadingGate isLoading={profileLoadingState}>
                    <div className="profile-card">
                        <h1 className=" text-center">{profile.firstName}</h1>
                        <p className=""><strong>{"Email: "}</strong>{profile.email}</p>
                        <p className=""><strong>{"Device: "}</strong>{profile.devicePlatform}</p>
                        <p className=""><strong>{"Experience: "}</strong>{profile.experienceLvl}</p>
                    </div>
                </LoadingGate>
                <LinkListBox>
                    <A to={"edit"}>{"Edit Profile"}</A>
                    <A to={"change-email"}>{"Change Email"}</A>
                    <A to={"change-password"}>{"Change Password"}</A>
                    <A to={"deactivate"} style={{color: "red"}}>{"Deactivate Account"}</A>
                </LinkListBox>
                <Button
                    label="Logout"
                    action={handleLogout}
                />
            </SpacedItems>
        </>
    );
}
 
export default Profile;