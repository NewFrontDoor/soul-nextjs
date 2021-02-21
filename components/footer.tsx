/** @jsx jsx */
import {
  IoIosPin,
  IoIosMail,
  IoLogoFacebook,
  IoLogoInstagram
} from 'react-icons/io';
import {FaRegPlayCircle} from 'react-icons/fa';
import {Box, jsx, Styled, Grid, useThemeUI} from 'theme-ui';
import {Link} from '@theme-ui/components';
import {Slimline} from '@newfrontdoor/footer';

const Footer = () => {
  const {theme} = useThemeUI();
  return (
    <>
      <Box as="footer" sx={{color: theme.colors.accent}}>
        <Grid
          sx={{
            bg: 'text',
            gridTemplateColumns: ['', 'repeat(3, 1fr)'],
            padding: '40px 7.5vw 0 7.5vw'
          }}
        >
          <Box sx={{textAlign: 'center'}}>
            <IoIosPin
              sx={{
                color: 'accent',
                stroke: 'none',
                strokeWidth: '20px',
                width: '2em',
                height: '2em',
                marginBottom: '20px'
              }}
            />
            <Styled.p>
              <Link href="#" variant="footer">
                Sundays @ 4.30pm
              </Link>{' '}
              - 5 Lefroy Street, North Hobart
            </Styled.p>
            <Styled.p>
              <Link href="#" variant="footer">
                Office
              </Link>{' '}
              - 67 Federal Street, North Hobart
            </Styled.p>
          </Box>
          <Box sx={{textAlign: 'center'}}>
            <IoIosMail
              sx={{
                color: 'accent',
                stroke: 'none',
                strokeWidth: '20px',
                width: '2em',
                height: '2em',
                marginBottom: '20px'
              }}
            />
            <Styled.p>
              <Link href="mailto:info@soulchurch.org.au" variant="footer">
                info@soulchurch.org.au
              </Link>
            </Styled.p>
            <Styled.p>
              <Link href="mailto:elders@soulchurch.org.au" variant="footer">
                elders@soulchurch.org.au
              </Link>
            </Styled.p>
          </Box>
          <Box sx={{textAlign: 'center'}}>
            <IoLogoInstagram
              sx={{
                color: 'background',
                stroke: 'none',
                strokeWidth: '20px',
                width: '2em',
                height: '2em',
                marginBottom: '20px'
              }}
            />
            <IoLogoFacebook
              sx={{
                color: 'background',
                stroke: 'none',
                strokeWidth: '20px',
                width: '2em',
                height: '2em',
                marginBottom: '20px',
                marginLeft: '10px'
              }}
            />
            <FaRegPlayCircle
              sx={{
                color: 'background',
                stroke: 'none',
                strokeWidth: '20px',
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
                variant="footer"
              >
                @soul_church
              </Link>
            </Styled.p>
            <Styled.p>
              <Link
                href="http://facebook.com/soulchurch"
                target="_blank"
                rel="noopener noreferrer"
                variant="footer"
              >
                facebook.com/SoulChurch
              </Link>
            </Styled.p>
            <Styled.p>
              <Link
                href="https://podcasts.apple.com/us/podcast/soul-church/id1389648314"
                target="_blank"
                rel="noopener noreferrer"
                variant="footer"
              >
                Subscribe to our podcast
              </Link>
            </Styled.p>
          </Box>
        </Grid>
      </Box>
      <Slimline />
    </>
  );
};

export default Footer;
