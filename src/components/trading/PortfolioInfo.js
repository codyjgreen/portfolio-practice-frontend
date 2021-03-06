import React, { Fragment, useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const PortfolioInfo = (props) => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    let filteredPortfolios = props.portfolios.filter((portfolio) =>
      portfolio.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setOptions(filteredPortfolios);
  };

  const setName = (name) => {
    setSearch(name);
    setDisplay(false);
  };

  const handlePortfolioClick = (portfolioObject) => {
    props.selectPortfolio(portfolioObject);
    setName(portfolioObject.name);
  };

  return (
    <Fragment>
      <div ref={wrapperRef}>
        Portfolio Name{" "}
        <TextField
          type="text"
          id="auto"
          placeholder="Select Portfolio"
          onClick={() => setDisplay(!display)}
          onChange={handleChange}
          value={search}
        />
        {display && (
          <div className="autoContainer">
            {options.map((portfolioObject, i) => {
              return (
                <div
                  onClick={() => handlePortfolioClick(portfolioObject)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span>{portfolioObject.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        {props.singlePortfolio.locked_in_value ? (
          <div>
            {/* will need to update to locked_in value */}
            <div>
              Portfolio Value: $
              {props.singlePortfolio.locked_in_value.toFixed(2)}
            </div>
            {/* Will need to update to available cash */}
            <div>
              Buying Power: ${props.singlePortfolio.available_cash.toFixed(2)}
            </div>
            {/* Will need to update to available cash */}
            <div>
              Available Cash: ${props.singlePortfolio.available_cash.toFixed(2)}
            </div>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default PortfolioInfo;
