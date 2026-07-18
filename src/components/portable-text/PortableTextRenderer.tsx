"use client";

import { PortableText } from "@portabletext/react";
import type { PortableTextBlock, TypedObject } from "@portabletext/types";
import { portableTextComponents } from "./blocks";

interface PortableTextRendererProps {
  value: PortableTextBlock[];
}

export default function PortableTextRenderer({
  value,
}: PortableTextRendererProps) {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <div className="portable-text-renderer">
      <PortableText
        value={value as (PortableTextBlock | TypedObject)[]}
        components={portableTextComponents}
      />
    </div>
  );
}
