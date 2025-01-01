import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./firebase";
import { postReq } from "../../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../Store/user.reducer";
import toast from "react-hot-toast";
const OAth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const response = await postReq("/auth/google", {
        userName: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      const { token } = response.data;

      localStorage.setItem("token", token);
      if (token) {
        dispatch(signInSuccess(token));
        navigate("/dashboard");
      }
      toast.success("singUpWithGoogle successfuly");
    } catch (error) {
      console.error("Error during sign-in: ", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignup}
        type="button"
        className="w-full bg-red-700 text-white p-3 rounded-lg uppercase hover:bg-opacity-95 disabled:opacity-80"
      >
        continue with google
      </button>
    </div>
  );
};

export default OAth;
