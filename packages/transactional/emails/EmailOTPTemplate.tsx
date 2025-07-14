import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";

interface OtpEmailProps {
  validationCode?: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const EmailOTPTemplate = ({ validationCode }: OtpEmailProps) => {
  return (
    <Html>
      <Head />

      <Body style={main}>
        <Preview>Código de verificación | StackMed</Preview>
        <Container style={container}>
          <Img
            src={`${baseUrl}/static/app-logo.png`}
            width="42"
            height="42"
            alt="Linear"
            style={logo}
          />
          <Heading style={heading}>Tu código de verificación para StackMed</Heading>

          <Text style={paragraph}>
            Este código será válido por 5 minutos. Si no solicitaste este código, ignora
            este correo electrónico.
          </Text>

          <code style={code}>{validationCode}</code>

          <Text style={{ marginTop: "20px" }}>
            Si hay algún problema con el código, puedes reportarlo{" "}
            <Link href={`${baseUrl}/support`}>aquí</Link>.
          </Text>

          <Hr style={hr} />

          <Text style={{ color: "gray" }}>
            <Link href="https://linear.app">StackkMed</Link> una marca de{" "}
            <Link href="https://stackkstudios.com">StackkStudios</Link>.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailOTPTemplate;

EmailOTPTemplate.PreviewProps = {
  validationCode: "tt226-5398x",
} as OtpEmailProps;

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const code = {
  fontFamily: "monospace",
  fontWeight: "700",
  padding: "1px 4px",
  backgroundColor: "#dfe1e4",
  letterSpacing: "-0.3px",
  fontSize: "21px",
  borderRadius: "4px",
  color: "#3c4149",
};
