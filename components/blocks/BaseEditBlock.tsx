import { useEffect, useState } from "react";
import { BlockProps } from "./BlockTypes";

export default function BaseEditBlock(props: {
  BaseEditBlockData: BlockProps;
  handlerBlockChange: Function;
}) {
  const { BaseEditBlockData, handlerBlockChange } = props;
  return (
    <div>
      {BaseEditBlockData &&
        BaseEditBlockData.rawDatas.map((item, index) => {
          return (
            <div key={"BaseEditBlock_" + index}>
              姓名
              <input
                key={item.value.toString()}
                defaultValue={item.value.toString()}
                // value={item.value.toString()}
                onBlur={(e) => {
                  handlerBlockChange(e, BaseEditBlockData.blockId, item.id);
                }}

                // onChange={(e) => {
                //   handlerBlockChange(e, BaseEditBlockData.blockId, item.id);
                // }}
              />
              {/* {item.value !== null && item.value.toString()} */}
            </div>
          );
        })}
    </div>
  );
}
