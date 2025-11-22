import { useEffect, useState } from "react";
import { apiCall } from "../../utils/api";
import { useNavigate } from "react-router-dom";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import Form from "../../components/form/Form";

import Message from "../../components/text/Message";

import LoadingGate from "../../components/effect/LoadingGate";

const EditProfile = ({ setHeaderParams }) => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({});
    const [editingPrep, setEditingPrep] = useState(true);

    const [message, setMessage] = useState({
        type: "success",
        message: ""
    });

    const [email, setEmail] = useState("");

    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        setHeaderParams(curr => ({
            ...curr,
            headerLabel: "Email Address",
            showAccount: false,
            backNav: "/profile"
        }));
    }, [setHeaderParams]);

    useEffect(() => {
        if (email) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [email]);

    useEffect(() => {
        const fetchUserAndMetadata = async () => {
            setEditingPrep(true);
            try {
                const resProfile = await apiCall("/users/profile");
                setProfile(resProfile);
            } catch (error) {
                console.error("User fetching failed:", error);
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

            if (email.trim() !== "" && email.trim() !== profile.email) {
                updatedProfileData.email = email.trim();
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
                    <Message type={"notice"} message={"To update the email address on file, enter a new one below then press submit."} isCentered />
                    <Input
                        label={"New Email Address"}
                        autoComplete={"off"}
                        value={email}
                        id="email"
                        type="email"
                        onChange={setEmail}
                        placeholder={`(current) ${profile.email}`}
                    />
                    <Button
                        type="submit"
                        label="Submit Change"
                        disabled={!canSubmit}
                    />
                </Form>
            </LoadingGate>
        </>
    );
}
 
export default EditProfile;