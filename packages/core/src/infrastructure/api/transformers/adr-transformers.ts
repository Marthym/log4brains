import { Adr } from "@src/adr/domain";
import { AdrDto } from "../types";
import { deepFreeze } from "./utils";

export function adrToDto(adr: Adr): AdrDto {
  return deepFreeze<AdrDto>({
    folder: adr.folder.root ? null : adr.folder.name || null,
    number: adr.number ? adr.number.value : null,
    slug: adr.slug.value,
    title: adr.title || null,
    body: {
      markdown: adr.body.getRawMarkdown()
    }
  });
}