import React from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  VStack,
  Link,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

const ShippingPolicy = () => {
  return (
    <Box p={{base:"2",md:"8"}}>
      <Container maxW="container.xl">
        <Heading as="h1" fontSize="2xl" mb={4}>
          Barn Connect’ Shipping Policy
        </Heading>
        <Divider mb={4} />
        <VStack align="start" spacing={4}>
          <Text fontSize={`15px`} textAlign={`justify`}>
            <Text as="b"> Note: </Text>
            All orders will be processed and completed within 7 business days.{" "}
          </Text>
          <UnorderedList>
            <ListItem>

              <Text textAlign={`justify`}>
                Barn Connect does not ship on holidays and weekends;
              </Text>
            </ListItem>
            <ListItem mt={'4'}>
              <Text textAlign={`justify`}>
                Barn Connect uses e-mail notifications concerning shipping and order status;
              </Text>

            </ListItem>


          </UnorderedList>
          <Text>
            Delivery costs and delivery times are estimated based on customer’s choice of delivery. Barn Connect does not deliver internationally but only within the continental United States.
            All shipment tracking information is through the delivery carrier and tracking numbers will be emailed to customer once item has shipped.
            Barn Connect will not be held responsible for taxes and tariffs incurred by orders during or after they reach their destination. All taxes and duties are customers responsibility.
            Barn Connect is not liable for items lost or damaged during shipment. In the event your item is damaged, keep the item and shipping materials and contact the carrier or our support center to file any claim. Barn Connect will contact you by e-mail with options.

          </Text>
          <Text fontWeight={'500'}>
          RETURN POLICY- Melissa needs to determine.
          </Text>

        </VStack>
      </Container>
    </Box>
  );
};

export default ShippingPolicy;
