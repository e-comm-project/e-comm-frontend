import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { BsGithub, BsLinkedin, BsPerson, BsTwitter } from "react-icons/bs";

function AboutUs() {
  return (
    <VStack spacing={8} p={5}>
      <Box border="1px solid #ddd" borderRadius="md" p={4} maxW="60vw">
        <Heading as="h2" size="xl" color="#c76158">
          Welcome to AboutShe
        </Heading>
        <Text fontSize="md" color="gray.600" mt={3}>
          Your dedicated online destination for women’s fashion and lifestyle
          products. Our journey began with a simple vision: to empower women by
          providing them with a wide range of high-quality, trendy, and
          affordable products that resonate with their unique styles and
          preferences.
        </Text>
      </Box>
      <Box border="1px solid #ddd" borderRadius="md" p={4} maxW="60vw">
        <Heading as="h2" size="xl" color="#c76158">
          Our Mission
        </Heading>
        <Text fontSize="md" color="gray.600" mt={3}>
          At AboutShe, we believe that every woman deserves to look and feel her
          best, without having to compromise on quality or price. Our mission is
          to curate a collection that not only aligns with the latest fashion
          trends but also caters to the diverse needs of our customers. From
          chic apparel to essential beauty products, and from elegant
          accessories to home decor, we strive to bring you items that enhance
          your life and express your individuality.
        </Text>
      </Box>
      <Box border="1px solid #ddd" borderRadius="md" p={4} maxW="60vw">
        <Heading as="h2" size="xl" color="#c76158">
          Our Journey
        </Heading>
        <Text fontSize="md" color="gray.600" mt={3}>
          Our journey began with a simple vision: to make high-quality fashion
          accessible to everyone. We believe that style is a way to express who
          you are without having to speak. That’s why we’ve curated a collection
          that not only follows the latest trends but also includes timeless
          pieces that will become staples in your wardrobe.
        </Text>
      </Box>
      <Box border="1px solid #ddd" borderRadius="md" p={4} maxW="60vw">
        <Heading as="h2" size="xl" color="#c76158">
          Our Collection
        </Heading>
        <Text fontSize="md" color="gray.600" mt={3}>
          From chic dresses to cozy knitwear, our selection is meticulously
          crafted to ensure that you find the perfect fit for your unique style.
          We partner with emerging designers and trusted brands to bring you an
          exclusive assortment of fashion-forward pieces.
        </Text>
      </Box>
      <Box border="1px solid #ddd" borderRadius="md" p={4} maxW="60vw">
        <Heading as="h2" size="xl" color="#c76158">
          Our Values
        </Heading>
        <Text fontSize="md" color="gray.600" mt={3}>
          <span style={{ fontWeight: "bold" }}>Quality</span>:: We are committed
          to offering products that are crafted with the highest standards of
          quality and durability.
        </Text>
        <Text fontSize="md" color="gray.600" mt={3}>
          <span style={{ fontWeight: "bold" }}>Style</span>:: We stay ahead of
          the curve by keeping up with the latest fashion trends and offering
          you the most stylish products.
        </Text>
        <Text fontSize="md" color="gray.600" mt={3}>
          <span style={{ fontWeight: "bold" }}>Affordability</span>: We believe
          that fashion should be accessible to everyone, which is why we offer
          competitive prices without compromising on quality.
        </Text>
        <Text fontSize="md" color="gray.600" mt={3}>
          <span style={{ fontWeight: "bold" }}>Customer Satisfaction</span>:
          Your satisfaction is our top priority, and we are dedicated to
          providing you with a seamless shopping experience.
        </Text>
        <Text fontSize="md" color="gray.600" mt={3}>
          <span style={{ fontWeight: "bold" }}>Community</span>: We value the
          relationships we build with our customers and strive to create a
          welcoming and inclusive community.
        </Text>
      </Box>
      <Box
        border="1px solid #ddd"
        borderRadius="md"
        p={4}
        maxW="60vw"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box width="45%">
          <Heading as="h2" size="xl" color="#c76158">
            Richard
          </Heading>
          <Box>
            <Text fontSize="md" color="gray.600">
              Richard is a multi-talented individual with a passion for language
              and a knack for problem-solving. He is dedicated to personal
              growth and is always seeking out new challenges to tackle. With a
              keen eye for detail and a curious mind, Richard approaches every
              task with enthusiasm and determination. Outside of his
              professional pursuits, he enjoys spending time outdoors, reading,
              and traveling to new places.
            </Text>
            <Box textAlign="center">
              <Link href="https://github.com/RichardHadzhiev" target="_blank">
                <IconButton
                  aria-label="github"
                  variant="ghost"
                  size="lg"
                  fontSize="3xl"
                  icon={<BsGithub />}
                  isRound
                />
              </Link>
            </Box>
          </Box>
        </Box>
        <Box width="45%">
          <Heading as="h2" size="xl" color="#c76158">
            Khaled
          </Heading>
          <Box>
            <Text fontSize="md" color="gray.600">
              Khaled is a dynamic and versatile individual who thrives in
              diverse environments. With a background in technology and a
              passion for innovation, he is constantly exploring new ways to
              push boundaries and drive progress. His strong analytical skills
              and creative mindset make him a valuable asset in any project he
              takes on. Apart from his professional endeavors, Khaled enjoys
              photography, playing music, and staying active through various
              sports and outdoor activities.
            </Text>
            <Box textAlign="center">
              <Link href="https://github.com/kafdhali" target="_blank">
                <IconButton
                  aria-label="github"
                  variant="ghost"
                  size="lg"
                  fontSize="3xl"
                  icon={<BsGithub />}
                  isRound
                />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </VStack>
  );
}

export default AboutUs;
