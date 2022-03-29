import {
  makeStyles,
  ListItem,
  Typography,
  List,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { IMenuItem } from "../../interfaces/IMenuItem";
import { ArrowBackRounded } from "@material-ui/icons";

const styles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    paddingLeft: "1rem",
  },
  icon: {},
});

interface IProps {
  item: IMenuItem;
  selectedKey: string;
  toggleOpen: () => void;
  onSelectedKeyChanged: (key: string) => void;
}

const SideMenuListItem: React.FC<IProps> = (props) => {
  const { item, selectedKey, onSelectedKeyChanged, toggleOpen } = props;
  const classes = styles();

  const toggleExpanded = React.useCallback(() => {
    onSelectedKeyChanged(item.title);
  }, [item, onSelectedKeyChanged]);

  const rootListItem = React.useMemo(() => {
    return (
      <ListItem
        key={item.title}
        button
        divider
        selected={selectedKey === item.title}
        className={classes.root}
        onClick={toggleExpanded}
      >
        <Tooltip title={item.subTitle}>
          <Typography variant="h5">{item.title}</Typography>
        </Tooltip>
        {item.title === "Abc-Club" && (
          <IconButton onClick={toggleOpen}>
            <ArrowBackRounded />
          </IconButton>
        )}
      </ListItem>
    );
  }, [item, classes, selectedKey, toggleExpanded, toggleOpen]);

  const menuItemElement = React.useMemo(() => {
    return (
      <>
        {rootListItem}
        {selectedKey === item.title && item.subMenu && item.subMenu.length > 0 && (
          <List>
            {item.subMenu.map((subItem) => {
              return (
                <ListItem
                  key={subItem.title}
                  divider
                  button
                  onClick={toggleOpen}
                >
                  <Typography variant="h6">
                    <Link className={classes.link} to={subItem.route}>
                      {subItem.title}
                    </Link>
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        )}
      </>
    );
  }, [classes, selectedKey, item, rootListItem, toggleOpen]);

  return <React.Fragment>{menuItemElement}</React.Fragment>;
};

export default SideMenuListItem;
