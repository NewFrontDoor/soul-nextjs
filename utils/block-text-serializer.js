/** @jsx jsx */
import BlockContent from '@sanity/block-content-to-react';
import {Heading} from '@theme-ui/components';
import {Styled, jsx} from 'theme-ui';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {
  Card,
  HorizontalCard,
  Overlay,
  TextCard
} from '@newfrontdoor/sanity-block-components';
import Form from '../components/form';
import GridBlock from '../components/grid-block';
// Import Card from '../components/card-grid-item';
// import Overlay from '../components/overlay-grid-item';
// import HorizontalCard from '../components/horizontal-card-grid-item';
// import TextCard from '../components/text-card-grid-item';
import urlFor from './sanity-img';

const LinkComponent = ({url, children}) => {
  return (
    <Link href={`/[${url.type}]`} as={`/${url.url}`}>
      <a>{children}</a>
    </Link>
  );
};

function GridBlockSerializer({node: {blocks, columns, style}}) {
  console.log(blocks);
  const segments = data => ({
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
        LinkComponent={LinkComponent}
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
        LinkComponent={LinkComponent}
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
        LinkComponent={LinkComponent}
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
        (columns === undefined) | null
          ? `repeat(auto-fit, minmax(200px, 1fr))`
          : `repeat(${columns}, 1fr)`
      }
      columnRawValue={(columns === undefined) | null ? 1 : columns}
      gap="20px"
      style={style}
      marginBottom="0"
      renderProp={(data, style) => segments(data)[style]}
    />
  );
}

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
      <Link passHref href={mark.href}>
        <Styled.a>{children}</Styled.a>
      </Link>
    );
  }

  return (
    <Link passHref href={mark.href}>
      <Styled.a>{children}</Styled.a>
    </Link>
  );
};

CustomLinkSerializer.propTypes = {
  children: PropTypes.element.isRequired,
  mark: PropTypes.object.isRequired
};

const InternalLinkSerializer = ({mark, children}) => {
  return (
    <Link passHref href={mark.slug}>
      <Styled.a>{children}</Styled.a>
    </Link>
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

function FormSerializer({node: {title, id, body, fields}}) {
  return (
    <Form
      key={id}
      title={title}
      id={id}
      description={<SanityBlock blocks={body} />}
      fields={fields}
    />
  );
}

FormSerializer.propTypes = {
  node: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    body: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired
  }).isRequired
};

function ListSerializer({type, children}) {
  return type === 'bullet' ? (
    <Styled.ul>{children}</Styled.ul>
  ) : (
    <Styled.ol>{children}</Styled.ol>
  );
}

ListSerializer.propTypes = {
  children: PropTypes.element.isRequired,
  type: PropTypes.string.isRequired
};

function ListItemSerializer({children}) {
  return <Styled.li>{children}</Styled.li>;
}

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

export default function SanityBlock({blocks}) {
  return <BlockContent blocks={blocks} serializers={serializers} />;
}

SanityBlock.propTypes = {
  blocks: PropTypes.object.isRequired
};
