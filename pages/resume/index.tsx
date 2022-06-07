import { getQuery } from "../../lib/utils";
export default function Resume() {
  // 避免服务端渲染
  if (typeof window !== "undefined") {
    console.log(getQuery("userId"));
  }
  return <div>resume content</div>;
}
