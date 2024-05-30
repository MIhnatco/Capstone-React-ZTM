import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { selectIsCartOpen } from "../../store/cart/cart.selector.js";

import { signOutUser } from "../../utils/firebase/firebase.utils";

// Use the useSelector hook to get the current state from the Redux store
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector.js";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles.jsx";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>

          {/*display link according to user*/}
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}

          <CartIcon />
        </NavLinksContainer>

        {isCartOpen && <CartDropdown />}
      </NavigationContainer>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
