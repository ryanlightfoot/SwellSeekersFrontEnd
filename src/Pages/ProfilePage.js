import React, { useContext } from "react";
import Button from '@mui/material/Button';
import { UserContext } from '../App';

function ProfilePage() {

  const { setUser } = useContext(UserContext);

  //Perform logout of account
  const logout = () => 
  {
    setUser(null);
  }

  return (
    <div>
      <form>
      <h3>Edit your profile</h3>
      <Button onClick={logout}>Log out</Button>
      <Button>Change username</Button>
      </form>
    </div>
  );
}

export default ProfilePage;