import { css, theme, tw } from "twind/css";

export default function ReadmeComponent(props: { readmeText: string }) {
  const { readmeText } = props;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: readmeText }}
      class={`prose prose-sm sm:prose lg:prose-lg mx-auto pt-20 pb-12
  ${
        tw(css({
          code: {
            "&::before": { content: "none" },
            "&::after": { content: "none" },
            background: theme("colors.gray.200"),
            padding: "3px 5px",
            borderRadius: "6px",
          },
          a: {
            color: theme("colors.blue.600"),
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          },
          ul: {
            listStyle: "disc",
            paddingInlineStart: "40px",
            li: {
              paddingLeft: "8px",
            },
          },
        }))
      }`}
    />
  );
}
