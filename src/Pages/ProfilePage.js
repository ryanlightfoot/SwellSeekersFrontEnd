import React, { useContext } from "react";
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom";

function ProfilePage() {

  const { setUser, setUserID } = useContext(UserContext);
  const navigate = useNavigate();

  //Perform logout of account
  const logout = () => 
  {
    setUserID(null);
    setUser(null);
    navigate("/");
    window.location.reload();
  }

  
  //Head to change username page
  const ChangeUser = () => 
  {
    navigate("/ChangeUser");
    window.location.reload();
  }

  return (
    <div class="profile">
      <h3>Edit your profile</h3>
      <button class="button-5" onClick={logout}>Log out</button>
      <br/>
      <button class="button-5" onClick={ChangeUser}>Change username</button>
      <br/>
      <button class="button-5" onClick={ChangeUser}>Change password</button>
      <br/>
      <button class="button-5" onClick={ChangeUser}>Delete account</button>
    </div>
  );
}

export default ProfilePage;