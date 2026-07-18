import { post } from "./schemas/post";
import { seoAuditCase } from "./schemas/seoAuditCase";
import { category } from "./schemas/category";
import { tag } from "./schemas/tag";
import { author } from "./schemas/author";
import { page } from "./schemas/page";
import { siteSettings } from "./schemas/siteSettings";

import { seo } from "./schemas/objects/seo";
import { faq } from "./schemas/objects/faq";
import { customImage } from "./schemas/objects/customImage";
import { finding } from "./schemas/objects/finding";
import { metric } from "./schemas/objects/metric";
import { socialLinks } from "./schemas/objects/socialLinks";

import { richText } from "./schemas/blocks/richText";
import { fullWidthImage } from "./schemas/blocks/fullWidthImage";
import { imageAndText } from "./schemas/blocks/imageAndText";
import { gallery } from "./schemas/blocks/gallery";
import { metricCards } from "./schemas/blocks/metricCards";
import { comparisonBlock } from "./schemas/blocks/comparisonBlock";
import { dataTable } from "./schemas/blocks/dataTable";
import { findingBox } from "./schemas/blocks/findingBox";
import { quoteBlock } from "./schemas/blocks/quoteBlock";
import { faqBlock } from "./schemas/blocks/faqBlock";
import { seoAuditCta } from "./schemas/blocks/seoAuditCta";
import { codeBlock } from "./schemas/blocks/codeBlock";

export const schemaTypes = [
  // Documents
  post,
  seoAuditCase,
  category,
  tag,
  author,
  page,
  siteSettings,

  // Objects
  seo,
  faq,
  customImage,
  finding,
  metric,
  socialLinks,

  // Blocks
  richText,
  fullWidthImage,
  imageAndText,
  gallery,
  metricCards,
  comparisonBlock,
  dataTable,
  findingBox,
  quoteBlock,
  faqBlock,
  seoAuditCta,
  codeBlock,
];
