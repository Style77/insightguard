import styled, {keyframes} from "styled-components";
import {
    AiOutlineDashboard,
    AiOutlineUser,
    CiLogout,
    IoKeySharp,
    IoSettingsSharp
} from "react-icons/all";
import {HTMLAttributes, useRef, useState} from "react";
import {GiHouseKeys} from "react-icons/gi";
import useOnClickOutside from "../hooks/useOnClickOutside";
import {useAuth, useRequireAuth} from "../hooks/useAuth";
import {useRouter} from "next/router";


interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    active?: boolean;
}


const Avatar = styled.div<AvatarProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 1px solid rgb(255, 255, 255, 0.3);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: background-color, opacity 250ms;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${({active}) =>
          active &&
          `
    background-color: rgba(255, 255, 255, 0.1);

    & > .profile-icon {
      color: rgb(240, 240, 240, 0.9);
    }
  `}
  & > .profile-icon {
    color: rgb(240, 240, 240, 0.7);
    font-size: 24px;
    transition: background-color 250ms;
  }
`;

interface ProfileProps extends HTMLAttributes<HTMLDivElement> {
    active?: boolean;
}

const Dropdown = styled.div<ProfileProps>`
  position: absolute;
  margin-top: 10px;
  top: 100%;
  right: 0;
  z-index: 2;
  display: ${({active}) => (active ? "flex" : "none")};
  transition: opacity 0.3s ease-in-out;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 175px;
  background-color: rgb(28, 28, 28);
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgb(0, 0, 0, 0.5);
  margin-inline: 10px;
  padding: 10px 0;
  color: rgb(240, 240, 240, 0.5);

  opacity: ${({active}) => (active ? 1 : 0)};

  & > .dropdown-item {
    display: flex;
    height: 50px;
    width: 100%;
    font-family: "Rubik", sans-serif;
    cursor: pointer;
    transition: background-color 250ms;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: rgb(240, 240, 240, 1);
    }
  }
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  cursor: pointer;
  transition: background-color 250ms;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgb(240, 240, 240, 1);
  }

  & > .dropdown-icon {
    margin-right: 5px;
    font-size: 20px;
  }
`;

const DropdownIcon = styled.div`
  display: flex;
  margin-left: 15px;
  margin-right: 10px;
  font-size: 22px;
`;

const DropdownUsername = styled.div`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  height: 20px;
  padding-bottom: 10px;
  font-family: "Rubik", sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1px;
  color: rgb(240, 240, 240, 0.7);
  border-bottom: 1px solid rgb(255, 255, 255, 0.3);
  width: 100%;
  transition: background-color 250ms;
`;

export const pulse = keyframes`
  0% {
    background-color: rgba(255, 255, 255, 0.05);
  }

  50% {
    background-color: rgba(255, 255, 255, 0.1);
  }

  100% {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const SkeletonAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 1px solid rgb(255, 255, 255, 0.3);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  transition: background-color, opacity 250ms;

  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoginButton = styled.a`
  width: 6em;
  height: 30px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgb(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color, opacity, color 250ms;
  color: rgb(240, 240, 240, 0.7);

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgb(240, 240, 240, 1);
  }
`;

const Profile = ({landing, openKeysModal, openProfileModal, openSettingsModal}) => {
    const auth = useAuth();
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<boolean>(false);

    useOnClickOutside(dropdownRef, () => setActive(false));

    const handleDropdown = () => {
        setActive(!active)
    }

    return (
        <>
            {auth.user ? (
                <Avatar onClick={handleDropdown} active={active}>
                    <Dropdown active={active} ref={dropdownRef}>
                        <DropdownUsername className="dropdown-username">
                            {auth.user.username}
                        </DropdownUsername>
                        {router.route == "/dashboard" ?
                            (<>
                                <DropdownItem className="dropdown-item"
                                              onClick={openKeysModal}>
                                    <DropdownIcon><IoKeySharp/></DropdownIcon>
                                    Keys
                                </DropdownItem>
                                <DropdownItem className="dropdown-item"
                                              onClick={openProfileModal}>
                                    <DropdownIcon><AiOutlineUser/></DropdownIcon>
                                    Profile
                                </DropdownItem>
                                <DropdownItem className="dropdown-item"
                                              onClick={openSettingsModal}>
                                    <DropdownIcon><IoSettingsSharp/></DropdownIcon>
                                    Settings
                                </DropdownItem>
                            </>) : (
                                <>
                                    <DropdownItem className="dropdown-item"
                                                  onClick={() => router.push("/dashboard")}>
                                        <DropdownIcon><AiOutlineDashboard/></DropdownIcon>
                                        Dashboard
                                    </DropdownItem>
                                </>
                            )
                        }
                        <DropdownItem className="dropdown-item"
                                      onClick={() => auth.logout()}>
                            <DropdownIcon><CiLogout/></DropdownIcon>
                            Logout
                        </DropdownItem>
                    </Dropdown>
                    <AiOutlineUser className="profile-icon"/>
                </Avatar>
            ) : (landing ? (
                <LoginButton href="/login">
                    Sign In
                </LoginButton>
            ) : (
                <SkeletonAvatar/>
            ))}
        </>
    )
}

export default Profile;
