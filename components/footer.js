/** @jsx jsx */
import styled from '@emotion/styled';
import {
  IoIosPin,
  IoIosMail,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram
} from 'react-icons/io';
import {FaRegPlayCircle} from 'react-icons/fa';
import {jsx, Styled, useThemeUI} from 'theme-ui';
import {Link} from '@theme-ui/components';

const Grid = styled('div')`
  display: grid;
  height: 220px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: 'footer-left footer-centre footer-right';
  background-color: ${props => props.background};
  padding: 40px 7.5vw 0 7.5vw;
`;

const MetaGrid = styled('div')`
  display: grid;
  height: 65px;
  grid-template-columns: 1fr 1fr;
  background-color: #222222;
  padding: 0 10vw;
  align-items: center;
`;

export default function Footer() {
  const {theme} = useThemeUI();
  return (
    <section sx={{color: theme.colors.accent}}>
      <Grid background={theme.colors.text}>
        <div sx={{textAlign: 'center'}}>
          <IoIosPin
            style={{
              stroke: 'none',
              strokeWidth: '20px',
              fill: theme.colors.accent,
              width: '2em',
              height: '2em',
              marginBottom: '20px'
            }}
          />
          <Styled.p>
            <Link href="#" variant='footer'>Sundays @ 4.30pm</Link> - 5 Lefroy Street,
            North Hobart
            <br />
            <Link href="#" variant='footer'>Office</Link> - 67 Federal Street, North
            Hobart
          </Styled.p>
        </div>
        <div sx={{textAlign: 'center'}}>
          <IoIosMail
            style={{
              stroke: 'none',
              strokeWidth: '20px',
              fill: theme.colors.accent,
              width: '2em',
              height: '2em',
              marginBottom: '20px'
            }}
          />
          <Styled.p>
            <Link href="mailto:info@soulchurch.org.au" variant='footer'>
              info@soulchurch.org.au
            </Link>
            <br />
            <Link href="mailto:elders@soulchurch.org.au" variant='footer'>
              elders@soulchurch.org.au
            </Link>
          </Styled.p>
        </div>
        <div sx={{textAlign: 'center'}}>
          <IoLogoInstagram
            style={{
              stroke: 'none',
              strokeWidth: '20px',
              fill: theme.colors.background,
              width: '2em',
              height: '2em',
              marginBottom: '20px'
            }}
          />
          <IoLogoFacebook
            style={{
              stroke: 'none',
              strokeWidth: '20px',
              fill: theme.colors.background,
              width: '2em',
              height: '2em',
              marginBottom: '20px',
              marginLeft: '10px'
            }}
          />
          <FaRegPlayCircle
            style={{
              stroke: 'none',
              strokeWidth: '20px',
              fill: theme.colors.background,
              width: '2em',
              height: '2em',
              marginBottom: '20px',
              marginLeft: '11px'
            }}
          />
          <Styled.p>
            <Link
              href="https://www.instagram.com/soul_church/"
              target="_blank"
              rel="noopener noreferrer"
              variant='footer'
            >
              @soul_church
            </Link>
            <br />
            <Link
              href="http://facebook.com/soulchurch"
              target="_blank"
              rel="noopener noreferrer"
              variant='footer'
            >
              facebook.com/SoulChurch
            </Link>
            <br />
            <Link
              href="https://podcasts.apple.com/us/podcast/soul-church/id1389648314"
              target="_blank"
              rel="noopener noreferrer"
              variant='footer'
            >
              Subscribe to our podcast
            </Link>
            <br />
          </Styled.p>
        </div>
      </Grid>
      <MetaGrid>
        <div>
          <Styled.p>
            Website built and maintained by{' '}
            <Link href="http://newfrontdoor.org" variant='footer'>New Front Door</Link>
          </Styled.p>
        </div>
        <div sx={{textAlign: 'right'}}>
          <Link href="https://www.facebook.com/NewFrontDoorIT/" variant='footer'>
            <IoLogoFacebook />
          </Link>
          <Link href="https://twitter.com/NewFrontDoorIT" variant='footer'>
            <IoLogoTwitter />
          </Link>
          <Link href="mailto:contactus@newfrontdoor.org" variant='footer'>
            <IoIosMail />
          </Link>
        </div>
      </MetaGrid>
    </section>
  );
}
