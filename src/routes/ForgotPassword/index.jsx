import { useCallback, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import * as Helpers from "../../helpers";

function ForgotPassword({
    forgotPassword,
}) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const role = searchParams.get("role") || "lecturer";
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);

    const handleSubmit = useCallback(() => {
        const trimmedEmail = email.trim().toLowerCase();
        
        if (!trimmedEmail) {
           Helpers.notification.error("Please enter your email address.");
            return;
        }
        
        setSending(true);

        forgotPassword(
            { email: trimmedEmail },
            (error) => {
                setSending(false);
                Helpers.notification.error(
                    error?.error ||
                    error?.message ||
                    "Unable to process your password reset request."
                );
            },
            
            async (response) => {
                try {

                    await Helpers.sessionStorage.setSessionData(
                        "passwordReset",
                        {
                            email: trimmedEmail,
                        }
                    );

                    setSending(false);

                    Helpers.notification.success(
                        response?.message ||
                        "A password reset code has been sent to your email."
                    );

                    navigate(`/verify-password?role=${role}`, {replace: true})
                } catch (error) {

                    setSending(false);

                    Helpers.notification.error(
                        error?.message ||
                        "Unable to prepare the verification session."
                    );
                }
            }
        );
    }, [forgotPassword, navigate, email, role]);

    return (
        <div className='signup-container reset-password-container'>
            <div className='signup-card'>
                <h2>Forgot Password?</h2>
                <h4>
                    Enter the email address associated with your
                    account and we'll send you a verification
                    code.
                </h4>

                <input
                    className='signup-input'
                    placeholder="Enter your email"
                    type="email"
                    autoCapitalize="none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />


                <Button
                    onClick={handleSubmit}
                    title="Send Code"
                    disabled={sending}
                    loading={sending}
                />

                <Link to={`/signin?role=${role}`} className="back-to-signin-link">
                    Back to Sign In
                </Link>
            </div>
        </div>
    );
}

export default ForgotPassword;