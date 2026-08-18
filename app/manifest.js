export default function manifest() {
  return {
    name: "LogicSoft Technologies",
    short_name: "LogicSoft",
    description: "Custom software, web, mobile, AI and cloud engineering services.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}