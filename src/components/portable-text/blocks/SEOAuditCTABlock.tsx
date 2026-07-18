import SEOAuditCTA from "@/components/cta/SEOAuditCTA";

interface SEOAuditCTABlockProps {
  value: {
    heading?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
    style?: "light" | "primary" | "bordered";
    [key: string]: unknown;
  };
}

export default function SEOAuditCTABlock({ value }: SEOAuditCTABlockProps) {
  if (!value) return null;

  const {
    heading,
    description,
    buttonText,
    buttonUrl,
    style,
  } = value;

  return (
    <div className="my-10">
      <SEOAuditCTA
        heading={heading}
        description={description}
        buttonText={buttonText}
        buttonUrl={buttonUrl}
        style={style}
      />
    </div>
  );
}
