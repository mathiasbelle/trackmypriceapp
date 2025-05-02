import axios, { AxiosError } from "axios";

export async function handleCaptchaSubmission(
    token: string | null,
    setIsVerified: React.Dispatch<React.SetStateAction<boolean>>
) {
    try {
        if (token) {
            await axios.post("/api", {
                token,
            });
            setIsVerified(true);
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log("An error occurred when validating captcha.");
        }
        setIsVerified(false);
    }
}
