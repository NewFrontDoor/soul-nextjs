/** @jsx jsx */
import {jsx, useThemeUI} from 'theme-ui';
import PropTypes from 'prop-types';

const CompButton = ({icon, text, color}) => {
  const {theme} = useThemeUI();

  return (
    <div tabIndex="0" style={{width: 'fit-content'}}>
      <button
        type="button"
        tabIndex="-1"
        sx={{
          color: 'accent',
          borderRadius: '50%',
          zIndex: '1',
          position: 'relative',
          verticalAlign: 'middle',
          height: '3.75em',
          width: '3.75em',
          border: `0.5em solid ${theme.colors[color]}`,
          bg: 'primary',
          svg: {height: '1em', width: '1em', verticalAlign: 'middle'}
        }}
      >
        {icon}
      </button>
      <button
        type="button"
        tabIndex="-1"
        sx={{
          zIndex: '0',
          position: 'relative',
          verticalAlign: 'middle',
          textAlign: 'right',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          border: 'none',
          height: '2.75em',
          padding: '0 1.5em 0 2.5em',
          bg: 'primary',
          marginLeft: `-1.5em`,
          borderTopRightRadius: `3em`,
          borderBottomRightRadius: `3em`,
          color: 'accent',
          fontFamily: 'body'
        }}
      >
        {text}
      </button>
    </div>
  );
};

export default CompButton;

CompButton.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.any,
  text: PropTypes.string.isRequired
};
