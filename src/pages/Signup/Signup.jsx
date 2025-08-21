// Components
import SignupModal from "../../Components/SignupModal/SignupModal";
import SignUpVerifyEmail from "../../Components/SignUpVerifyEmail/SignUpVerifyEmail";

// Store
import { useSignupStore } from "../../store/useSignupStore";

const Signup = () => {
  const { signupPhase } = useSignupStore();

  return (
    <div>
      { signupPhase === 'signup' && <SignupModal/> }
      { signupPhase === 'verify-email' && <SignUpVerifyEmail/> }
    </div>
  )
}

export default Signup