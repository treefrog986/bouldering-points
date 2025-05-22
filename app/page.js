import { loginUser, signUp } from "./api/api";
import Home from "./Home";


export default function page(){
  return <Home loginUser = {loginUser} signUp={signUp}/>
}