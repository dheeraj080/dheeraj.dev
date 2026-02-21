// src/index.ts
import remarkFrontMatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

// src/withFrontMatter.ts
import { z } from "zod";

// src/utils.ts
import { Parser } from "acorn";
import acornJsx from "acorn-jsx";
import fm from "front-matter";
import slug from "slug";
var ParserWithJSX = Parser.extend(acornJsx());
var parse = (content) => ParserWithJSX.parse(content, {
  ecmaVersion: 2020,
  sourceType: "module"
});
var getFrontMatter = (content) => fm(content).attributes;
var addImport = (tree, name, location) => {
  tree.children.unshift({
    type: "mdxjsEsm",
    data: {
      estree: parse(`import ${name} from '${location}'`)
    }
  });
};
var addContent = (tree, content) => {
  tree.children.push({
    type: "mdxjsEsm",
    data: {
      estree: parse(content)
    }
  });
};
var getTableOfContents = (tree) => {
  const contents = [];
  for (let nodeIndex = 0; nodeIndex < tree.children.length; nodeIndex++) {
    const node = tree.children[nodeIndex];
    if (node.type === "heading" && [2, 3].includes(node.depth)) {
      const depth = node.depth - 1;
      const title = node.children.filter((n) => n.type === "text").map((n) => n.value).join("");
      contents.push({
        title,
        slug: slug(title),
        depth
      });
    }
  }
  return contents;
};

// src/withFrontMatter.ts
var dateRegex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
var BaseFrontMatter = z.object({
  title: z.string().max(110),
  description: z.string().max(120),
  caption: z.string().default(""),
  layout: z.string().default("Post")
});
var PostFrontMatter = z.object({
  date: z.string().regex(dateRegex, "Date format MUST be YYYY-MM-DD"),
  lang: z.enum(["id", "en"]),
  tags: z.array(z.string()).min(2).max(5),
  category: z.string()
});
var ProjectFrontMatter = z.object({
  githubUrl: z.string().url().optional(),
  npmUrl: z.string().url().optional(),
  type: z.enum(["package"]).default("package")
});
var validate = (schema, data) => {
  try {
    return schema.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new Error(JSON.stringify(err.issues, null, 2));
    }
    return null;
  }
};
var withFrontMatter = () => (_tree, file) => {
  const data = getFrontMatter(file.value);
  if (Object.keys(data).length === 0)
    return;
  const base = validate(BaseFrontMatter, data);
  let frontMatter;
  switch (base.layout) {
    case "Post": {
      const post = validate(PostFrontMatter, data);
      frontMatter = { ...base, ...post };
      break;
    }
    case "Project": {
      const project = validate(ProjectFrontMatter, data);
      frontMatter = { ...base, ...project };
      break;
    }
    default: {
      frontMatter = base;
      break;
    }
  }
  file.data["front-matter"] = frontMatter;
};
var withFrontMatter_default = withFrontMatter;

// src/withLayout.ts
var withLayout = () => (tree, file) => {
  const data = file.data["front-matter"] || {};
  if (Object.keys(data).length === 0)
    return;
  const { layout, ...frontMatter } = file.data["front-matter"];
  const tableOfContents = getTableOfContents(tree);
  addImport(tree, layout, `@/contents-layouts/${layout}`);
  addContent(
    tree,
    `export default ({ children }) => (
      <${layout}
        frontMatter={${JSON.stringify(frontMatter)}}
        tableOfContents={${JSON.stringify(tableOfContents)}}
      >
        {children}
      </${layout}>
     )`
  );
};
var withLayout_default = withLayout;

// src/withStrict.ts
var withStrict = () => (tree) => {
  for (let nodeIndex = 0; nodeIndex < tree.children.length; nodeIndex++) {
    const node = tree.children[nodeIndex];
    if (node.type === "heading" && ![2, 3].includes(node.depth) || node.type === "mdxJsxFlowElement" && ["h1", "h4", "h5", "h6"].includes(node.name)) {
      throw new Error("Headings depths other than 2 or 3 are not allowed.");
    }
  }
};
var withStrict_default = withStrict;

// src/index.ts
var plugins = [
  remarkFrontMatter,
  remarkGfm,
  withFrontMatter_default,
  withStrict_default,
  withLayout_default
];
var src_default = plugins;
export {
  src_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy93aXRoRnJvbnRNYXR0ZXIudHMiLCAiLi4vc3JjL3V0aWxzLnRzIiwgIi4uL3NyYy93aXRoTGF5b3V0LnRzIiwgIi4uL3NyYy93aXRoU3RyaWN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgcmVtYXJrRnJvbnRNYXR0ZXIgZnJvbSAncmVtYXJrLWZyb250bWF0dGVyJztcclxuaW1wb3J0IHJlbWFya0dmbSBmcm9tICdyZW1hcmstZ2ZtJztcclxuXHJcbmltcG9ydCB3aXRoRnJvbnRNYXR0ZXIgZnJvbSAnLi93aXRoRnJvbnRNYXR0ZXInO1xyXG5pbXBvcnQgd2l0aExheW91dCBmcm9tICcuL3dpdGhMYXlvdXQnO1xyXG5pbXBvcnQgd2l0aFN0cmljdCBmcm9tICcuL3dpdGhTdHJpY3QnO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBQbHVnZ2FibGVMaXN0IH0gZnJvbSAndW5pZmllZCc7XHJcblxyXG5jb25zdCBwbHVnaW5zOiBQbHVnZ2FibGVMaXN0ID0gW1xyXG4gIHJlbWFya0Zyb250TWF0dGVyLFxyXG4gIHJlbWFya0dmbSxcclxuICB3aXRoRnJvbnRNYXR0ZXIsXHJcbiAgd2l0aFN0cmljdCxcclxuICB3aXRoTGF5b3V0LFxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGx1Z2lucztcclxuIiwgImltcG9ydCB7IHogfSBmcm9tICd6b2QnO1xyXG5cclxuaW1wb3J0IHsgZ2V0RnJvbnRNYXR0ZXIgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmNvbnN0IGRhdGVSZWdleCA9IC9eXFxkezR9LSgwWzEtOV18MVswMTJdKS0oMFsxLTldfFsxMl1bMC05XXwzWzAxXSkkLztcclxuXHJcbmNvbnN0IEJhc2VGcm9udE1hdHRlciA9IHoub2JqZWN0KHtcclxuICB0aXRsZTogei5zdHJpbmcoKS5tYXgoMTEwKSxcclxuICBkZXNjcmlwdGlvbjogei5zdHJpbmcoKS5tYXgoMTIwKSxcclxuICBjYXB0aW9uOiB6LnN0cmluZygpLmRlZmF1bHQoJycpLFxyXG4gIGxheW91dDogei5zdHJpbmcoKS5kZWZhdWx0KCdQb3N0JyksXHJcbn0pO1xyXG5cclxuY29uc3QgUG9zdEZyb250TWF0dGVyID0gei5vYmplY3Qoe1xyXG4gIGRhdGU6IHouc3RyaW5nKCkucmVnZXgoZGF0ZVJlZ2V4LCAnRGF0ZSBmb3JtYXQgTVVTVCBiZSBZWVlZLU1NLUREJyksXHJcbiAgbGFuZzogei5lbnVtKFsnaWQnLCAnZW4nXSksXHJcbiAgdGFnczogei5hcnJheSh6LnN0cmluZygpKS5taW4oMikubWF4KDUpLFxyXG4gIGNhdGVnb3J5OiB6LnN0cmluZygpLFxyXG59KTtcclxuXHJcbmNvbnN0IFByb2plY3RGcm9udE1hdHRlciA9IHoub2JqZWN0KHtcclxuICBnaXRodWJVcmw6IHouc3RyaW5nKCkudXJsKCkub3B0aW9uYWwoKSxcclxuICBucG1Vcmw6IHouc3RyaW5nKCkudXJsKCkub3B0aW9uYWwoKSxcclxuICB0eXBlOiB6LmVudW0oWydwYWNrYWdlJ10pLmRlZmF1bHQoJ3BhY2thZ2UnKSxcclxufSk7XHJcblxyXG5jb25zdCB2YWxpZGF0ZSA9IChzY2hlbWEsIGRhdGEpID0+IHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIHNjaGVtYS5wYXJzZShkYXRhKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGlmIChlcnIgaW5zdGFuY2VvZiB6LlpvZEVycm9yKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShlcnIuaXNzdWVzLCBudWxsLCAyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3Qgd2l0aEZyb250TWF0dGVyID0gKCkgPT4gKF90cmVlLCBmaWxlKSA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IGdldEZyb250TWF0dGVyKGZpbGUudmFsdWUpO1xyXG5cclxuICAvLyBza2lwIGZyb250IG1hdHRlciB2YWxpZGF0aW9uXHJcbiAgaWYgKE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICBjb25zdCBiYXNlID0gdmFsaWRhdGUoQmFzZUZyb250TWF0dGVyLCBkYXRhKTtcclxuXHJcbiAgbGV0IGZyb250TWF0dGVyO1xyXG5cclxuICBzd2l0Y2ggKGJhc2UubGF5b3V0KSB7XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZmljIHBvc3QgZnJvbnRNYXR0ZXJcclxuICAgICAqL1xyXG4gICAgY2FzZSAnUG9zdCc6IHtcclxuICAgICAgY29uc3QgcG9zdCA9IHZhbGlkYXRlKFBvc3RGcm9udE1hdHRlciwgZGF0YSk7XHJcbiAgICAgIGZyb250TWF0dGVyID0geyAuLi5iYXNlLCAuLi5wb3N0IH07XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZpYyBwcm9qZWN0IGZyb250TWF0dGVyXHJcbiAgICAgKi9cclxuICAgIGNhc2UgJ1Byb2plY3QnOiB7XHJcbiAgICAgIGNvbnN0IHByb2plY3QgPSB2YWxpZGF0ZShQcm9qZWN0RnJvbnRNYXR0ZXIsIGRhdGEpO1xyXG4gICAgICBmcm9udE1hdHRlciA9IHsgLi4uYmFzZSwgLi4ucHJvamVjdCB9O1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBmcm9udE1hdHRlclxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0OiB7XHJcbiAgICAgIGZyb250TWF0dGVyID0gYmFzZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICBmaWxlLmRhdGFbJ2Zyb250LW1hdHRlciddID0gZnJvbnRNYXR0ZXI7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoRnJvbnRNYXR0ZXI7XHJcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuXG5pbXBvcnQgeyBQYXJzZXIgfSBmcm9tICdhY29ybic7XG5pbXBvcnQgYWNvcm5Kc3ggZnJvbSAnYWNvcm4tanN4JztcbmltcG9ydCBmbSBmcm9tICdmcm9udC1tYXR0ZXInO1xuaW1wb3J0IHNsdWcgZnJvbSAnc2x1Zyc7XG5cbmNvbnN0IFBhcnNlcldpdGhKU1ggPSBQYXJzZXIuZXh0ZW5kKGFjb3JuSnN4KCkpO1xuXG5jb25zdCBwYXJzZSA9IChjb250ZW50KSA9PlxuICBQYXJzZXJXaXRoSlNYLnBhcnNlKGNvbnRlbnQsIHtcbiAgICBlY21hVmVyc2lvbjogMjAyMCxcbiAgICBzb3VyY2VUeXBlOiAnbW9kdWxlJyxcbiAgfSk7XG5cbmV4cG9ydCBjb25zdCBnZXRGcm9udE1hdHRlciA9IChjb250ZW50KSA9PiBmbShjb250ZW50KS5hdHRyaWJ1dGVzO1xuXG5leHBvcnQgY29uc3QgYWRkSW1wb3J0ID0gKHRyZWUsIG5hbWUsIGxvY2F0aW9uKSA9PiB7XG4gIHRyZWUuY2hpbGRyZW4udW5zaGlmdCh7XG4gICAgdHlwZTogJ21keGpzRXNtJyxcbiAgICBkYXRhOiB7XG4gICAgICBlc3RyZWU6IHBhcnNlKGBpbXBvcnQgJHtuYW1lfSBmcm9tICcke2xvY2F0aW9ufSdgKSxcbiAgICB9LFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRDb250ZW50ID0gKHRyZWUsIGNvbnRlbnQpID0+IHtcbiAgdHJlZS5jaGlsZHJlbi5wdXNoKHtcbiAgICB0eXBlOiAnbWR4anNFc20nLFxuICAgIGRhdGE6IHtcbiAgICAgIGVzdHJlZTogcGFyc2UoY29udGVudCksXG4gICAgfSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VGFibGVPZkNvbnRlbnRzID0gKHRyZWUpID0+IHtcbiAgY29uc3QgY29udGVudHMgPSBbXTtcblxuICBmb3IgKGxldCBub2RlSW5kZXggPSAwOyBub2RlSW5kZXggPCB0cmVlLmNoaWxkcmVuLmxlbmd0aDsgbm9kZUluZGV4KyspIHtcbiAgICBjb25zdCBub2RlID0gdHJlZS5jaGlsZHJlbltub2RlSW5kZXhdO1xuXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ2hlYWRpbmcnICYmIFsyLCAzXS5pbmNsdWRlcyhub2RlLmRlcHRoKSkge1xuICAgICAgY29uc3QgZGVwdGggPSBub2RlLmRlcHRoIC0gMTtcbiAgICAgIGNvbnN0IHRpdGxlID0gbm9kZS5jaGlsZHJlblxuICAgICAgICAuZmlsdGVyKChuKSA9PiBuLnR5cGUgPT09ICd0ZXh0JylcbiAgICAgICAgLm1hcCgobikgPT4gbi52YWx1ZSlcbiAgICAgICAgLmpvaW4oJycpO1xuXG4gICAgICBjb250ZW50cy5wdXNoKHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIHNsdWc6IHNsdWcodGl0bGUpLFxuICAgICAgICBkZXB0aCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb250ZW50cztcbn07XG4iLCAiaW1wb3J0IHsgYWRkQ29udGVudCwgYWRkSW1wb3J0LCBnZXRUYWJsZU9mQ29udGVudHMgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmNvbnN0IHdpdGhMYXlvdXQgPSAoKSA9PiAodHJlZSwgZmlsZSkgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSBmaWxlLmRhdGFbJ2Zyb250LW1hdHRlciddIHx8IHt9O1xyXG5cclxuICAvLyBza2lwIGFkZGluZyBsYXlvdXRcclxuICBpZiAoT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gIGNvbnN0IHsgbGF5b3V0LCAuLi5mcm9udE1hdHRlciB9ID0gZmlsZS5kYXRhWydmcm9udC1tYXR0ZXInXTtcclxuICBjb25zdCB0YWJsZU9mQ29udGVudHMgPSBnZXRUYWJsZU9mQ29udGVudHModHJlZSk7XHJcblxyXG4gIC8vIGltcG9ydCBmcm9udC1tYXR0ZXIgc3BlY2lmaWVkIGxheW91dFxyXG4gIGFkZEltcG9ydCh0cmVlLCBsYXlvdXQsIGBAL2NvbnRlbnRzLWxheW91dHMvJHtsYXlvdXR9YCk7XHJcblxyXG4gIC8vIGV4cG9ydCBsYXlvdXRcclxuICBhZGRDb250ZW50KFxyXG4gICAgdHJlZSxcclxuICAgIGBleHBvcnQgZGVmYXVsdCAoeyBjaGlsZHJlbiB9KSA9PiAoXHJcbiAgICAgIDwke2xheW91dH1cclxuICAgICAgICBmcm9udE1hdHRlcj17JHtKU09OLnN0cmluZ2lmeShmcm9udE1hdHRlcil9fVxyXG4gICAgICAgIHRhYmxlT2ZDb250ZW50cz17JHtKU09OLnN0cmluZ2lmeSh0YWJsZU9mQ29udGVudHMpfX1cclxuICAgICAgPlxyXG4gICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPC8ke2xheW91dH0+XHJcbiAgICAgKWBcclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aExheW91dDtcclxuIiwgIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXHJcblxyXG5jb25zdCB3aXRoU3RyaWN0ID0gKCkgPT4gKHRyZWUpID0+IHtcclxuICBmb3IgKGxldCBub2RlSW5kZXggPSAwOyBub2RlSW5kZXggPCB0cmVlLmNoaWxkcmVuLmxlbmd0aDsgbm9kZUluZGV4KyspIHtcclxuICAgIGNvbnN0IG5vZGUgPSB0cmVlLmNoaWxkcmVuW25vZGVJbmRleF07XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAobm9kZS50eXBlID09PSAnaGVhZGluZycgJiYgIVsyLCAzXS5pbmNsdWRlcyhub2RlLmRlcHRoKSkgfHxcclxuICAgICAgKG5vZGUudHlwZSA9PT0gJ21keEpzeEZsb3dFbGVtZW50JyAmJlxyXG4gICAgICAgIFsnaDEnLCAnaDQnLCAnaDUnLCAnaDYnXS5pbmNsdWRlcyhub2RlLm5hbWUpKVxyXG4gICAgKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSGVhZGluZ3MgZGVwdGhzIG90aGVyIHRoYW4gMiBvciAzIGFyZSBub3QgYWxsb3dlZC4nKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoU3RyaWN0O1xyXG4iXSwK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