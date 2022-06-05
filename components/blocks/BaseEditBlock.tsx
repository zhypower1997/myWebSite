import { useEffect, useState } from "react";
import { BlockProps } from "./BlockTypes";
import editStyles from "../../styles/edit.module.scss";

export default function BaseEditBlock(props: {
  BaseEditBlockData: BlockProps;
  handlerBlockChange: Function;
}) {
  const { BaseEditBlockData, handlerBlockChange } = props;
  return (
    <div className={editStyles.edit}>
      {BaseEditBlockData &&
        BaseEditBlockData.rawDatas.map((item, index) => {
          return (
            <div key={"BaseEditBlock_" + index}>
              姓名
              <input
                className={editStyles.edit_input}
                key={item.value.toString()}
                defaultValue={item.value.toString()}
                onBlur={(e) => {
                  handlerBlockChange(e, BaseEditBlockData.blockId, item.id);
                }}
              />
              <input className={editStyles.edit_radio} type="radio" />
              <input className={editStyles.edit_check} type="checkbox" />
            </div>
          );
        })}
    </div>
  );
}
