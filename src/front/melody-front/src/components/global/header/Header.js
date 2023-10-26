"use client"
import React, {useContext} from 'react';
import styled from 'styled-components';
import Link from "next/link";
import {UserContext} from "../../../contexts/UserContext";

const HeaderContainer = styled.header`
  //position: fixed;
  width: 100%;
  background-color: #eeeded;
  display: flex;
  justify-content: center;
  z-index: 1000;
  transition: 0.35s;
  
  a {
    color: #000;
    &:hover {
      color: #abc;
    }
  }
  

  &.dark {
    background-color: rgb(23, 20, 20);
  }
`;

const HeaderInner = styled.div`
  width: 1300px;
  padding: 20px 0;
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 60px;
`;

const Logo = styled.div`
  height: 50px;
  width: 200px;

  a {
    display: inline-block;
    background: url('/images/Logo.png') no-repeat center center;
    background-size: cover;
    width: 200px;
    height: 50px;
    transition: 0.2s;
  }

  .dark a {
    display: inline-block;
    background: url('/images/Logodark.png') no-repeat center center;
    background-size: cover;
    width: 200px;
    height: 50px;
    transition: 0.2s;
  }
`;

const Nav = styled.nav`
  /* Add your styles for the <nav> element here */
  display: flex;
  justify-content: right;
  align-content: center;
  gap: 100px;
  height: 50px;
  line-height: 50px;
`;

const Lnb = styled.div`
  /* Add your styles for .lnb here */
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 20px;
  line-height: 50px;
`;

const SubLnb = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  input[type="text"] {
    border: none;
    width: 300px;
    height: 50px;
    background-color: transparent;
    border-bottom: 1px solid #bbb;
    padding: 0px 5px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-100%, -10%);

    &:focus {
      border-bottom: 1.5px solid #9d9b9b;
    }
  }

  button {
    border: none;
    background: url('/images/search.svg') no-repeat center center;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-100%, -10%);
    cursor: pointer;
  }
`;

const Gnb = styled.div`
  display: flex;
  gap: 30px;

  a {
    transition: 0.3s;
    padding: 0px 5px;
    position: relative;
    letter-spacing: 0.2dvh;

    &:before {
      content: '';
      height: 0;
      width: 0;
      display: block;
      position: absolute;
      top: 80%;
      left: 0;
      transition: 0.3s;
    }

    &:hover {
      font-weight: 500; 
      color: #abc;
    }
  }
  a:hover::before {
    display: block;
    border-bottom: 1px solid #bbb;
    width: 100%;
    transition: 0.3s;
  }
  
  //a:hover {
  //  font-weight: 500;
  //  color: #000;
  //}

  .dark a {
    color: #fff;

    &:hover {
      font-weight: 500;
      color: #fff;
    }
  }
`;

const Header = () => {
    const { userState, userDispatch } = useContext(UserContext);

    return (
        <HeaderContainer>
            <HeaderInner>
                <Banner>
                    <Logo>
                        <Link href="/"></Link>
                    </Logo>
                    <Lnb>
                        {userState.isAuthenticated ? (
                            <>
                                <p className="text-teal-600">Welcome, {userState.user.name}!</p>
                                <Link
                                    href="/"
                                    onMouseUp={() => {
                                        userDispatch({ type: 'LOGOUT' });
                                    }}
                                >
                                    Log Out
                                </Link>
                            </>) : (
                            <Link href="/login">LOGIN</Link>
                        )}
                        <Link href="/signUp">SIGN UP</Link>
                        <div className="darkmode"></div>
                    </Lnb>
                </Banner>
               <Nav>
                    <SubLnb>
                        <form action={`${process.env.PUBLIC_URL}/search`} method="get">
                            <input type="text" id="mainSearchQuery" name="mainSearchQuery" required />
                            <button type="submit"></button>
                        </form>
                    </SubLnb>
                    <Gnb>
                        <Link href="#season">Season</Link>
                        <Link href="#best">Best</Link>
                        <Link href="#new">New</Link>
                        <Link href="#genre">Genre</Link>
                        <Link href="#artist">Artist</Link>
                        <Link href="#musicvideo">Music Video</Link>
                        <Link href="/help/faq">F & Q</Link>
                    </Gnb>
                </Nav>
            </HeaderInner>
            <div className="mb-8"> </div>
        </HeaderContainer>
    );
};

export default Header;
