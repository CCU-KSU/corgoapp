import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiCall } from "../utils/api";

import Button from "../components/button/Button";

import SpacedItems from "../components/container/SpacedItems";
import ButtonBunch from "../components/button/ButtonBunch";
import LoadingGate from "../components/effect/LoadingGate";

import Modal from "react-modal";

import EditProfile from "./account/EditProfile";
import ChangeEmail from "./account/ChangeEmail";
import ChangePassword from "./auth/ChangePassword";
import Deactivate from "./account/Deactivate";

Modal.setAppElement('#root');

const Account = ({ setViewParams }) => {
    const { logout } = useAuth();

    const [profile, setProfile] = useState({});
    const [profileLoadingState, setProfileLoadingState] = useState(true);
    const [error, setError] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState({
        changeEmail: false,
        changePassword: false,
        editProfile: false,
        deactivateAccount: false
    });

    const [remountKey, setRemountKey] = useState(0);

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
                setError(true);
            } finally {
                setProfileLoadingState(false);
            }
        };

        fetchProfile();
    }, [remountKey]);

    const handleLogout = async () => {
		try {
			await logout()
		} catch (error) {
			alert("Failed to logout!");
		}
	};

    const toggleModal = (modalName) => {
        const wasOpen = modalIsOpen[modalName];
        
        setModalIsOpen(curr => ({
            ...curr,
            [modalName]: !curr[modalName]
        }));
        
        // Remount when closing modal
        if (wasOpen) {
            setRemountKey(prev => prev + 1);
        }
    }

    return (
        <>
            <SpacedItems>
                <LoadingGate isLoading={profileLoadingState} isError={error}>
                    <div className="profile-card">
                        <h1 className=" text-center">{profile.firstName}</h1>
                        <p className=""><strong>{"Email: "}</strong>{profile.email}</p>
                        <p className=""><strong>{"Device: "}</strong>{profile.devicePlatform || "Not Set"}</p>
                        <p className=""><strong>{"Experience: "}</strong>{profile.experienceLvl || "Not Set"}</p>
                    </div>
                </LoadingGate>
                <ButtonBunch>
                    <Button label="Edit Profile" action={() => toggleModal("editProfile")} />
                    <Button label="Change Email" action={() => toggleModal("changeEmail")} />
                    <Button label="Change Password" action={() => toggleModal("changePassword")} />
                    <Button label="Deactivate Account" action={() => toggleModal("deactivateAccount")} isDanger />
                </ButtonBunch>
                <Button
                    label="Logout"
                    action={handleLogout}
                />
            </SpacedItems>
            <Modal
                isOpen={modalIsOpen.changeEmail}
                onRequestClose={() => toggleModal("changeEmail")}
                contentLabel="Change Email Modal"
            >
                <ChangeEmail
                    closeModal={() => toggleModal("changeEmail")}
                />
            </Modal>
            <Modal
                isOpen={modalIsOpen.changePassword}
                onRequestClose={() => toggleModal("changePassword")}
                contentLabel="Change Password Modal"
            >
                <ChangePassword
                    closeModal={() => toggleModal("changePassword")}
                />
            </Modal>
            <Modal
                isOpen={modalIsOpen.editProfile}
                onRequestClose={() => toggleModal("editProfile")}
                contentLabel="Edit Profile Modal"
            >
                <EditProfile
                    closeModal={() => toggleModal("editProfile")}
                />
            </Modal>
            <Modal
                isOpen={modalIsOpen.deactivateAccount}
                onRequestClose={() => toggleModal("deactivateAccount")}
                contentLabel="Deactivate Account Modal"
            >
                <Deactivate
                    closeModal={() => toggleModal("deactivateAccount")}
                />
            </Modal>
        </>
    );
}
 
export default Account;