import RichTextBlock from "./RichTextBlock";
import FullWidthImageBlock from "./FullWidthImageBlock";
import ImageAndTextBlock from "./ImageAndTextBlock";
import GalleryBlock from "./GalleryBlock";
import MetricCardsBlock from "./MetricCardsBlock";
import ComparisonBlock from "./ComparisonBlock";
import DataTableBlock from "./DataTableBlock";
import FindingBoxBlock from "./FindingBoxBlock";
import QuoteBlockBlock from "./QuoteBlockBlock";
import FAQBlockBlock from "./FAQBlockBlock";
import SEOAuditCTABlock from "./SEOAuditCTABlock";
import CodeBlockBlock from "./CodeBlockBlock";

export const portableTextComponents = {
  types: {
    richText: RichTextBlock,
    fullWidthImage: FullWidthImageBlock,
    imageAndText: ImageAndTextBlock,
    gallery: GalleryBlock,
    metricCards: MetricCardsBlock,
    comparison: ComparisonBlock,
    dataTable: DataTableBlock,
    findingBox: FindingBoxBlock,
    quoteBlock: QuoteBlockBlock,
    faqBlock: FAQBlockBlock,
    seoAuditCTA: SEOAuditCTABlock,
    codeBlock: CodeBlockBlock,
  },
};
