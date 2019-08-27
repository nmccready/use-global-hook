import React from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';
import { Container, Box, Flex, Heading, Text, Button, Pre } from 'rebass';

// const Video = styled.video([], {
//   display: 'block',
//   maxWidth: '100%',
//   height: 'auto',
//   borderRadius: '16px',
// });

const features = ['app store', 'react', 'easy', 'state management', 'actions'];

/*
<Box mb={3}>
  <Video autoPlay loop muted playsInline poster="hello-x0.gif" src="hello-x0.mp4" />
</Box>;
 */
const Main = () => (
  <React.Fragment>
    <Container py={5}>
      <Heading
        style={{ marginBottom: 0 }}
        is="h1"
        mb={4}
        lineHeight={1.125}
        fontWeight="bold"
        fontSize={[4, 5, 6]}
      >
        use-global-hook:
        {/* <Logo style={{ float: 'right' }} size={128} /> */}
        {/* <br />
        validate and transform data, routes, react forms at ease */}
      </Heading>
      <Pre>yarn add @znemz/use-global-hook</Pre>
      <Flex py={4}>
        <Button
          is="a"
          px={4}
          py={3}
          bg="black"
          href="https://github.com/nmccready/use-global-hook"
        >
          Github
        </Button>
        <Box mx={1} />
        <Button is={Link} px={4} py={3} bg="black" to="/docs">
          Documentation
        </Button>
      </Flex>
    </Container>
    <Container py={5}>
      <Flex flexWrap="wrap" mx={-3}>
        {features.map((feat) => (
          <Box key={feat} width={[1, 1, 1 / 2]} p={3}>
            <Text fontWeight="bold">{feat}</Text>
          </Box>
        ))}
      </Flex>
    </Container>
  </React.Fragment>
);

Main.defaultProps = {
  name: 'Landing',
  layout: 'landing',
};

export default Main;
