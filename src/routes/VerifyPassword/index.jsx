import { useCallback, useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import * as Helpers from "../../helpers";

function VerifyPassword({
    verifyResetCode,
}) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const role = searchParams.get("role") || "lecturer";
    const [resetData, setResetData] = useState(null);
    const [code, setCode] = useState("");
    const [verifying, setVerifying] = useState(false);

    useEffect(() => {
        const loadVerifyData = async () => {
            const data = await Helpers.sessionStorage.getSessionData(
                "passwordReset"
            );

            setResetData(data);
        };

        loadVerifyData();
    }, []);

    const email = resetData?.email || "";

    const handleVerify = useCallback(() => {
        const trimmedCode = code.trim();

        if (!trimmedCode) {
            Helpers.notification.error("Please enter the verification code.");
            return;
        }

        if (!/^\d{6}$/.test(trimmedCode)) {
            Helpers.notification.error("Please enter a valid 6-digit verification code.");
            return;
        }

        if (!email) {
            Helpers.notification.error("Please enter your email address.");
            return;
        }

        setVerifying(true);

        verifyResetCode(
            {
                email,
                code: trimmedCode,
            },

            // Error
            (error) => {
                setVerifying(false);
                Helpers.notification.error(
                    error?.error ||
                    error?.message ||
                    "The verification code is invalid or has expired."
                );
            },

            // Success
            async (response) => {
                try {
                    const resetToken = response?.resetToken;

                    if (!resetToken) {
                        throw new Error(
                            "Reset token was not returned by the server."
                        );
                    }

                    await Helpers.sessionStorage.setSessionData(
                        "passwordReset",
                        {
                            email,
                            resetToken,
                        }
                    );

                    setVerifying(false);

                    Helpers.notification.success(
                        response?.message ||
                        "Your verification code has been verified."
                    );

                    navigate(`/reset-password?role=${role}`, {replace: true})

                } catch (error) {
                    setVerifying(false);

                    Helpers.notification.error(
                        error?.message ||
                        "Unable to prepare the password reset session."
                    );
                }
            }
        );
    }, [verifyResetCode, navigate, code, email, role]);

    return (
        <div className='signup-container reset-password-container'>
            <div className='signup-card'>
                <h2>Verify Password Reset Code</h2>
                <h4>
                    Enter the 6-digit verification code sent to
                    your email address.
                </h4>

                <h4>{email}</h4>

                <input
                    className='signup-input'
                    placeholder="Enter the 6-digit code"
                    type="email"
                    autoCapitalize="none"
                    value={code}
                    onChange={(e) =>
                        setCode(
                            e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 6)
                        )
                    }
                    inputMode="numeric"
                    maxLength={6}
                    style={{ textAlign: "center" }}
                />


                <Button
                    onClick={handleVerify}
                    title="Verify Code"
                    disabled={verifying}
                    loading={verifying}
                />

                <Link to={`/forgot-password?role=${role}`} className="back-to-signin-link">
                    Back
                </Link>
            </div>
        </div>
    );
}

export default VerifyPassword;