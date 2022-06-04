import { useEffect, useState } from "react";
import { RawData } from "./BlockTypes";

export default function BaseShowBlock(props: { rawData: RawData[] }) {
  const { rawData = [] } = props;
  return (
    <div>
      {rawData.map((item, index) => {
        return (
          <div key={"BaseEditBlock_" + index}>
            {item.value !== null && item.value.toString()}
          </div>
        );
      })}
    </div>
  );
}
