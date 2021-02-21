/** @jsx jsx */
import {Button, Box, jsx, useThemeUI} from 'theme-ui';
import PropTypes from 'prop-types';

type CompButtonProps = {
  icon: string;
  text: string;
  color: string;
};

const CompButton = ({icon, text, color}: CompButtonProps) => {
  const {theme} = useThemeUI();

  return (
    <Button
      type="button"
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        height: '2.75em',
        padding: '0 1.5em',
        bg: 'primary',
        borderRadius: '3em',
        overflow: 'hidden',
        color: 'accent',
        fontFamily: 'body'
      }}
    >
      <Box
        as="span"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
          justifyContent: 'center',
          marginLeft: '-2rem',
          marginRight: '1rem',
          color: 'accent',
          borderRadius: '50%',
          height: '2.75em',
          width: '2.75em',
          border: `0.5em solid ${theme.colors[color] as string}`,
          bg: 'primary',
          svg: {height: '1em', width: '1em', verticalAlign: 'middle'}
        }}
      >
        {icon}
      </Box>
      <span>{text}</span>
    </Button>
  );
};

export default CompButton;

CompButton.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.any,
  text: PropTypes.string.isRequired
};
