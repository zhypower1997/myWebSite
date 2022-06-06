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
          // typeId
          // 0 文本框
          // 1 单选
          // 2 多选
          // 3 日期选择
          // 4 文件提交
          // 5 下拉框
          return (
            <div key={"BaseEditBlock_" + index}>
              {item.typeId == "0" && (
                <div>
                  {item.name}
                  <input
                    className={editStyles.edit_input}
                    key={item.value.toString()}
                    defaultValue={item.value.toString()}
                    onBlur={(e) => {
                      handlerBlockChange(e, BaseEditBlockData.blockId, item.id);
                    }}
                  />
                </div>
              )}
              {item.typeId == "1" && (
                <div>
                  {item.name}
                  <input
                    value={item.name}
                    onChange={(e) => {
                      handlerBlockChange(e, BaseEditBlockData.blockId, item.id);
                    }}
                    className={editStyles.edit_radio}
                    type="radio"
                  />
                </div>
              )}
              {item.typeId == "2" && (
                <div>
                  {item.name}
                  <input
                    name="sex"
                    value="ss"
                    className={editStyles.edit_check}
                    type="checkbox"
                    onChange={(e) => {
                      handlerBlockChange(e, BaseEditBlockData.blockId, item.id);
                    }}
                  />
                  <input
                    name="sex"
                    value="ee"
                    className={editStyles.edit_check}
                    type="checkbox"
                    onChange={(e) => {
                      handlerBlockChange(e, BaseEditBlockData.blockId, item.id);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
