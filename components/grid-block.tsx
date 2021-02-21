/** @jsx jsx */
import {ReactElement} from 'react';
import * as CSS from 'csstype';
import {jsx, Box} from 'theme-ui';
import PropTypes from 'prop-types';

type GridBlockItem = {
  _id: string;
};

type GridBlockProps = {
  columnRawValue: number;
  columns: CSS.Property.Columns;
  gap: CSS.Property.Gap;
  items: GridBlockItem[];
  marginBottom: CSS.Property.MarginBottom;
  renderProp: (item: GridBlockItem, style: string) => ReactElement;
  style: string;
};

const GridBlock = ({
  items,
  columns,
  columnRawValue,
  renderProp,
  gap,
  marginBottom,
  style
}: GridBlockProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: columns,
        gridTemplateRows: 'auto',
        gap: gap ?? '5%',
        '@media (min-width: 450px) and (max-width: 890px)': {
          gridTemplateColumns: `repeat(${Math.round(columnRawValue / 2)}, 1fr)`
        }
      }}
    >
      {items.map((item) => {
        return (
          <Box
            key={item._id}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              marginBottom: marginBottom ?? '4em'
            }}
          >
            {renderProp(item, style)}
          </Box>
        );
      })}
    </Box>
  );
};

export default GridBlock;

GridBlock.propTypes = {
  columnRawValue: PropTypes.number.isRequired,
  columns: PropTypes.string.isRequired,
  gap: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  marginBottom: PropTypes.string.isRequired,
  renderProp: PropTypes.element.isRequired,
  style: PropTypes.string.isRequired
};
