/** @jsx jsx */
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {Styled, jsx} from 'theme-ui';
import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
  Slider,
  Button
} from '@theme-ui/components';

const Grid = styled('section')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const RadioGroup = styled('fieldset')`
  input {
    width: initial;
  }
  label {
    display: inline;
    margin-left: 10px;
    padding-bottom: 0px;
  }
  legend {
    grid-column: 1 / 3;
  }
`;

function getFormField(field) {
  switch (field.input) {
    case 'textarea':
      return (
        <div sx={{gridColumn: '1 / 3'}}>
          <Label htmlFor={field.id}>{field.label}</Label>
          <Textarea id={field.id} name={field.label} rows="8" />
        </div>
      );
    case 'slider':
      return (
        <div sx={{gridColumn: '1 / 3'}}>
          <Label htmlFor={field.id}>{field.label}</Label>
          <Slider id={field.id} name={field.label} rows="8" />
        </div>
      );
    case 'select':
      return (
        <div>
          <Label htmlFor={field.id}>{field.label}</Label>
          <Select id={field.id} name={field.label}>
            {field.values.map(value => (
              <option value={value}>{value}</option>
            ))}
          </Select>
        </div>
      );
    case 'radio':
      return (
        <RadioGroup>
          <legend>{field.label}</legend>
          {field.values.map(value => (
            <Label key={field.id}>
              <Radio id={value} name={field.id} value={value} />
              {value}
            </Label>
          ))}
        </RadioGroup>
      );
    case 'checkbox':
      return (
        <div>
          <Checkbox id={field.id} name={field.label} />
          <Label sx={{display: 'inline'}} htmlFor={field.id}>
            {field.label}
          </Label>
        </div>
      );
    default:
      return (
        <div>
          <Label htmlFor={field.id} required={field.required}>
            {field.label}
            {field.required ? <strong>*</strong> : ''}
          </Label>
          <Input type={field.input} id={field.id} name={field.label} />
        </div>
      );
  }
}

export default function Form({title, id, description, fields}) {
  return (
    <form id={id}>
      <fieldset sx={{border: 'none'}}>
        {title && <Styled.h2>{title}</Styled.h2>}
        {description && description}
        <Grid>
          {fields.map(field => {
            return getFormField(field);
          })}
          <Button sx={{gridColumn: '1 / 3'}} type="submit">
            Submit
          </Button>
        </Grid>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  description: PropTypes.element,
  fields: PropTypes.array.isRequired
};

Form.defaultProps = {
  title: '',
  id: '',
  description: ''
};
