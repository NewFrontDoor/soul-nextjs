/** @jsx jsx */
import BlockContent from '@sanity/block-content-to-react';
import {Heading} from '@theme-ui/components';
import {Styled, Link, jsx} from 'theme-ui';
import {default as NextLink} from 'next/link';
import PropTypes from 'prop-types';
import {
  Card,
  HorizontalCard,
  Overlay,
  TextCard
} from '@newfrontdoor/sanity-block-components';
import {Form} from '@newfrontdoor/form';
import GridBlock from '../components/grid-block';
import urlFor from './sanity-img';

const passedLink = ({url, children, sx}) => {
  return url.type ? (
    <NextLink href={`/${url.url}`} passHref>
      <Link sx={{display: 'contents'}}>{children}</Link>
    </NextLink>
  ) : (
    <Link sx={{display: 'contents'}} href={url.url}>
      {children}
    </Link>
  );
};

const GridBlockSerializer = ({node: {blocks, columns, style}}) => {
  const segments = (data) => ({
    card: (
      <Card
        {...data}
        description={
          data.description ? <SanityBlock blocks={data.description} /> : <div />
        }
        image={urlFor(data.mainImage)
          .width(200)
          .height(200)
          .auto('format')
          .url()}
        LinkComponent={passedLink}
      />
    ),
    overlay: (
      <Overlay
        {...data}
        description={
          data.description ? <SanityBlock blocks={data.description} /> : <div />
        }
        image={urlFor(data.mainImage)
          .width(350)
          .height(350)
          .auto('format')
          .url()}
        LinkComponent={passedLink}
      />
    ),
    horizontal: (
      <HorizontalCard
        {...data}
        description={
          data.description ? <SanityBlock blocks={data.description} /> : <div />
        }
        image={urlFor(data.mainImage)
          .width(530)
          .height(135)
          .auto('format')
          .url()}
        LinkComponent={passedLink}
      />
    ),
    text: (
      <TextCard
        {...data}
        description={
          data.description ? <SanityBlock blocks={data.description} /> : <div />
        }
      />
    )
  });

  return (
    <GridBlock
      items={blocks}
      columns={
        (typeof columns === 'undefined')
          ? `repeat(auto-fit, minmax(200px, 1fr))`
          : `repeat(${columns}, 1fr)`
      }
      columnRawValue={(typeof columns === 'undefined') ? 1 : columns}
      gap="20px"
      style={style}
      marginBottom="0"
      renderProp={(data, style) => segments(data)[style]}
    />
  );
};

GridBlockSerializer.propTypes = {
  node: PropTypes.shape({
    style: PropTypes.string.isRequired,
    blocks: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired
  }).isRequired
};

const CustomLinkSerializer = ({mark, children}) => {
  if (mark.href.includes('#')) {
    return (
      <NextLink passHref href={mark.href}>
        <Styled.a>{children}</Styled.a>
      </NextLink>
    );
  }

  return (
    <NextLink passHref href={mark.href}>
      <Styled.a>{children}</Styled.a>
    </NextLink>
  );
};

CustomLinkSerializer.propTypes = {
  children: PropTypes.element.isRequired,
  mark: PropTypes.object.isRequired
};

const InternalLinkSerializer = ({mark, children}) => {
  return (
    <NextLink passHref href={mark.slug}>
      <Styled.a>{children}</Styled.a>
    </NextLink>
  );
};

InternalLinkSerializer.propTypes = {
  children: PropTypes.element.isRequired,
  mark: PropTypes.object.isRequired
};

const CustomStyleSerializer = ({node, children}) => {
  const style = node.style || 'normal';

  if (/^h\d/.test(style))
    return (
      <Heading as={style} sx={{variant: `styles.${style}`}}>
        {children}
      </Heading>
    );

  switch (style) {
    case 'presentation':
      return <Styled.pre>{children}</Styled.pre>;
    case 'blockquote':
      return <Styled.blockquote>{children}</Styled.blockquote>;
    case 'code':
      return <Styled.code>{children}</Styled.code>;
    default:
      return <Styled.p>{children}</Styled.p>;
  }
};

CustomStyleSerializer.propTypes = {
  children: PropTypes.element.isRequired,
  node: PropTypes.shape({
    style: PropTypes.string
  }).isRequired
};

const FormSerializer = ({node: {title, id, body, fields}}) => {
  return (
    <Form
      key={id}
      title={title}
      id={id}
      description={<SanityBlock blocks={body} />}
      fields={fields}
      submitForm={(wat) => console.log(wat)}
    />
  );
};

FormSerializer.propTypes = {
  node: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    body: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired
  }).isRequired
};

const ListSerializer = ({type, children}) => {
  return type === 'bullet' ? (
    <Styled.ul>{children}</Styled.ul>
  ) : (
    <Styled.ol>{children}</Styled.ol>
  );
};

ListSerializer.propTypes = {
  children: PropTypes.element.isRequired,
  type: PropTypes.string.isRequired
};

const ListItemSerializer = ({children}) => {
  return <Styled.li>{children}</Styled.li>;
};

ListItemSerializer.propTypes = {
  children: PropTypes.element.isRequired
};

const serializers = {
  types: {
    block: CustomStyleSerializer,
    form: FormSerializer,
    gridblock: GridBlockSerializer
  },
  marks: {
    link: CustomLinkSerializer,
    internalLink: InternalLinkSerializer,
    anchor: (children, mark) => <span id={mark.id}>{children}</span>
  },
  list: ListSerializer,
  listItem: ListItemSerializer
};

const SanityBlock = ({blocks}) => {
  return <BlockContent blocks={blocks} serializers={serializers} />;
};

export default SanityBlock;

SanityBlock.propTypes = {
  blocks: PropTypes.object.isRequired
};
