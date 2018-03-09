import React from 'react';
import Drawer from 'material-ui/Drawer';
import { spacing, typography } from 'material-ui/styles';
import { white, blue600 } from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';

import Assessment from 'material-ui/svg-icons/action/assessment';
import Web from 'material-ui/svg-icons/av/web';
// import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
// import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
// import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';

const LeftDrawer = (props) => {
    let { navDrawerOpen } = props;

    const styles = {
        logo: {
            cursor: 'pointer',
            fontSize: 22,
            color: typography.textFullWhite,
            lineHeight: `${spacing.desktopKeylineIncrement}px`,
            fontWeight: typography.fontWeightLight,
            backgroundColor: blue600,
            paddingLeft: 40,
            height: 56,
        },
        menuItem: {
            color: white,
            fontSize: 14
        },
        avatar: {
            div: {
                padding: '15px 0 20px 15px',
                height: 45
            },
            icon: {
                float: 'left',
                display: 'block',
                marginRight: 15,
                boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
            },
            span: {
                paddingTop: 12,
                display: 'block',
                color: 'white',
                fontWeight: 300,
                textShadow: '1px 1px #444'
            }
        }
    };

    const menus = [
        { text: 'Practices', icon: <Assessment/>, link: '/practices' },
        { text: 'Bows', icon: <Web/>, link: '/bows' },
        { text: 'Arrows', icon: <Web/>, link: '/arrows' },
        // { text: 'Login Page', icon: <PermIdentity/>, link: '/login' }
      ];
    return (

        <Drawer
            docked={true}
            open={navDrawerOpen}>
            <div style={styles.logo}>
                Material Admin
          </div>
            <div style={styles.avatar.div}>
                <Avatar src="http://www.material-ui.com/images/uxceo-128.jpg"
                    size={30}
                    style={styles.avatar.icon} />
                <span style={styles.avatar.span}>{props.username}</span>
            </div>
            <div>
            {menus.map((menu, index) =>
              <MenuItem
                key={index}
                style={styles.menuItem}
                primaryText={menu.text}
                leftIcon={menu.icon}
                containerElement={<Link to={menu.link}/>}
              />
            )}
            </div>
        </Drawer>
    );
};

export default LeftDrawer;