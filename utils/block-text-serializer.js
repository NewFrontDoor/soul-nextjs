/** @jsx jsx */
import BlockContent from '@sanity/block-content-to-react';
import {Heading} from '@theme-ui/components';
import {Styled, jsx} from 'theme-ui';
import Link from 'next/link';
import Form from '../components/form';
import GridBlock from '../components/grid-block';
import Card from '../components/card-grid-item';
import Overlay from '../components/overlay-grid-item';
import HorizontalCard from '../components/horizontal-card-grid-item';
import TextCard from '../components/text-card-grid-item';
import urlFor from './sanity-img';

function GridBlockSerializer({node: {blocks, columns, style}}) {
  const segments = data => ({
    card: (
      <Card
        {...data}
        description={<SanityBlock blocks={data.description} />}
        image={urlFor(data.image)
          .width(200)
          .height(200)
          .auto('format')
          .url()}
      />
    ),
    overlay: (
      <Overlay
        {...data}
        description={<SanityBlock blocks={data.description} />}
        image={urlFor(data.image)
          .width(350)
          .height(350)
          .auto('format')
          .url()}
      />
    ),
    horizontal: (
      <HorizontalCard
        {...data}
        description={<SanityBlock blocks={data.description} />}
        image={urlFor(data.image)
          .width(530)
          .height(135)
          .auto('format')
          .url()}
      />
    ),
    text: (
      <TextCard
        {...data}
        description={<SanityBlock blocks={data.description} />}
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

const InternalLinkSerializer = ({mark, children}) => {
  return (
    <Link passHref href={mark.slug}>
      <Styled.a>{children}</Styled.a>
    </Link>
  );
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

function ListSerializer({type, children}) {
  return type === 'bullet' ? (
    <Styled.ul>{children}</Styled.ul>
  ) : (
    <Styled.ol>{children}</Styled.ol>
  );
}

function ListItemSerializer({children}) {
  return <Styled.li>{children}</Styled.li>;
}

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
