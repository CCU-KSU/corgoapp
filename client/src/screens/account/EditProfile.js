import { useEffect, useState } from "react";
import { apiCall } from "../../utils/api";
import { useNavigate } from "react-router-dom";

import Input from "../../components/input/Input";
import InputDropdown from "../../components/input/InputDropdown";
import InputMulti from "../../components/input/InputMulti";
import Button from "../../components/button/Button";

import Form from "../../components/form/Form";

import Message from "../../components/text/Message";

import LoadingGate from "../../components/effect/LoadingGate";

const EditProfile = ({ setViewParams }) => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({});
    const [editingPrep, setEditingPrep] = useState(true);
    const [deviceOptions, setDeviceOptions] = useState([]);
    const [experienceOptions, setExperienceOptions] = useState([]);

    const [message, setMessage] = useState({
        type: "success",
        message: ""
    });

    const [firstName, setFirstName] = useState("");
    const [device, setDevice] = useState("");
    const [experience, setExperience] = useState("");

    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "Edit Profile",
            backURL: "/profile",
            showNavBar: false
        }));
    }, [setViewParams]);

    useEffect(() => {
        if (firstName || device || experience) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [firstName, device, experience]);

    useEffect(() => {
        const fetchUserAndMetadata = async () => {
            setEditingPrep(true);
            try {
                const resProfile = await apiCall("/users/profile");
                const resExperiences = await apiCall("/metadata/experiences");
                const resPlatforms = await apiCall("/metadata/platforms");
                setProfile(resProfile.data);
                setExperienceOptions(resExperiences.data);
                setDeviceOptions(resPlatforms.data);
            } catch (error) {
                console.error("User and Metadata fetching failed:", error);
            } finally {
                setEditingPrep(false);
            }
        };
        fetchUserAndMetadata();
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            setMessage({ type: "error", message: ""});
            setEditingPrep(true);

            const updatedProfileData = {};
            
            if (firstName.trim() !== "" && firstName.trim() !== profile.firstName) {
                updatedProfileData.firstName = firstName.trim();
            }

            if (device !== "" && device !== profile.devicePlatform) {
                updatedProfileData.devicePlatform = device;
            }

            if (experience !== "" && experience !== profile.experienceLvl) {
                updatedProfileData.experienceLvl = experience;
            }

            if (Object.keys(updatedProfileData).length === 0) {
                console.log("No changes detected. Update skipped.");
                navigate("/profile");
                return;
            }

            await apiCall("/users/profile-update", {
                method: "PATCH",
                body: updatedProfileData
            });
            
        } catch (error) {
            console.error("Profile update failed:", error);
            setMessage({ type: "error", message: "Failed to update profile. Please try again."});
        } finally {
            navigate("/profile");
        }
    };

    return (
        <>
            <LoadingGate isLoading={editingPrep}>
                <Form onSubmit={handleProfileUpdate}>
                    <Message type={message.type} message={message.message} isCentered />
                    <Message type={"notice"} message={"At least ONE field need to be filled!"} isCentered />
                    <Input
                        label={"New Name"}
                        autoComplete={"off"}
                        value={firstName}
                        id="fname"
                        type="text"
                        onChange={setFirstName}
                        placeholder={`(current) ${profile.firstName}`}
                    />
                    <InputDropdown
                        label={"New Platform"}
                        value={device}
                        id="platform"
                        onChange={setDevice}
                        options={deviceOptions}
                        placeholder={`(current) ${profile.devicePlatform}`}
                    />
                    <InputDropdown
                        label={"New Experience Level"}
                        value={experience}
                        id="experience"
                        onChange={setExperience}
                        options={experienceOptions}
                        placeholder={`(current) ${profile.experienceLvl}`}
                    />
                    <Button
                        type="submit"
                        label="Submit Changes"
                        disabled={!canSubmit}
                    />
                </Form>
            </LoadingGate>
        </>
    );
}
 
export default EditProfile;