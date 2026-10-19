import { useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";
import * as Helpers from "../../helpers";

function ForgotPassword({
    forgotPassword,
}) {
    const navigate = useNavigate();
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
                    console.log("1. Forgot password response:", response);

                    await Helpers.sessionStorage.setSessionData(
                        "passwordReset",
                        {
                            email: trimmedEmail,
                        }
                    );

                    console.log("2. Session saved");

                    setSending(false);

                    Helpers.notification.success(
                        response?.message ||
                        "A password reset code has been sent to your email."
                    );

                    console.log("3. Navigating to PasswordVerification");

                    navigate.replace("PasswordVerification");

                    console.log("4. Navigation completed");
                } catch (error) {
                    console.error("ForgotPassword error:", error);

                    setSending(false);

                    Helpers.notification.error(
                        error?.message ||
                        "Unable to prepare the verification session."
                    );
                }
            }
        );
    }, [forgotPassword, navigate, email]);

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password?</h2>
            <p>
                Enter the email address associated with your
                account and we'll send you a verification
                code.
            </p>

            <label>Email</label>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Button
                onClick={handleSubmit}
                title="Send Code"
                disabled={sending}
                loading={sending}
            />

            <Link to="/signin" className="forgot-password-link">
                Back to Sign In
            </Link>
        </div>
    );
}

export default ForgotPassword;