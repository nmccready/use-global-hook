import React from 'react';
import { Flex, Box, Container, Text, BlockLink, Caps } from 'rebass';
import { Link } from 'react-router-dom';
import Logo from './_logo';

export default ({ children }) => (
  <React.Fragment>
    <Flex alignItems="center">
      <BlockLink href="https://github.com/nmccready">
        <Flex px={1} py={2} alignItems="center">
          <Logo width={100} height={100} />
          <Text style={{ position: 'fixed', left: 105 }} fontWeight="bold">
            nmccready
          </Text>
        </Flex>
      </BlockLink>
      <Box mx="auto" />
      <BlockLink px={3} is={Link} to="/">
        <Caps fontWeight="bold">use-global-hook</Caps>
      </BlockLink>
      <BlockLink px={3} href="https://github.com/nmccready/use-global-hook">
        <Caps fontWeight="bold">Github</Caps>
      </BlockLink>
    </Flex>
    {children}
    <Container>
      <Flex py={4} mt={5} flexWrap="wrap">
        <BlockLink my={2} mr={3} href="https://github.com/nmccready">
          <Caps fontWeight="bold">Github</Caps>
        </BlockLink>
        <Box mx="auto" />
        <Text my={2} fontSize={0}>
          © 2019 Nicholas McCready, Inc. All rights reserved
        </Text>
      </Flex>
    </Container>
  </React.Fragment>
);
