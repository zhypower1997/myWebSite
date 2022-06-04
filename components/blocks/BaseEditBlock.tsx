import { useEffect, useState } from "react";
import { RawData } from "./BlockTypes";

export default function BaseEditBlock(props: RawData[]) {
  return (
    <div>
      {props.map((item) => {
        return <div>{item.value !== null && item.value.toString()}</div>;
      })}
    </div>
  );
}
